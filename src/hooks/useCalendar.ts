import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setEvents } from "../redux/slices/eventSlice";
import { Event, EventTypes, FormInput } from "../types";
import { transformDateTimeToObject } from "../utils";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  updateEvent,
} from "../api/eventApi";

const useCalendar = () => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("00:00");
  const [eventType, setEventType] = useState<EventTypes[number]>(
    EventTypes.Other
  );

  const dispatch = useAppDispatch();
  const monthIndex = useAppSelector((state) => state.calendar.monthIndex);
  const year = useAppSelector((state) => state.calendar.year);

  const eventTypesArray: EventTypes[] = Object.values(EventTypes);

  useEffect(() => {
    setIsLoadingEvents(true);
    fetchEventsFromAPI();
  }, []);

  const fetchEventsFromAPI = async () => {
    try {
      const events = await fetchEvents();
      dispatch(setEvents(events));
    } catch (error) {
      toast("Unsuccessfully fetched events.", {
        type: "error",
      });
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};

    if (!title) {
      errors["title"] = "Enter a title";
    }

    if (!date) {
      errors["date"] = "Enter a date";
    }

    if (!description) {
      errors["description"] = "Enter a description";
    }

    if (!time) {
      errors["time"] = "Enter a time";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateEvent = async (
    e: React.FormEvent,
    type: "create" | "update"
  ) => {
    e.preventDefault();

    if (!selectedEvent && type === "update") {
      throw new Error("No event selected for creating/updating.");
    }

    setIsLoading(true);

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      if (type === "create") {
        await createEvent({
          title,
          description,
          dateTime: `${date}T${time}`,
          type: eventType as EventTypes,
        });
      } else if (type === "update" && selectedEvent) {
        await updateEvent({
          id: selectedEvent.id,
          title,
          description,
          dateTime: `${date}T${time}`,
          type: eventType as EventTypes,
        });
      } else {
        throw new Error("Invalid operation or eventId missing for update.");
      }

      if (type === "create") {
        setIsCreateEventModalOpen(false);

        toast("Successfully created event.", {
          type: "success",
        });
      } else if (type === "update") {
        setIsViewEventModalOpen(false);

        toast("Successfully updated event.", {
          type: "success",
        });
      }

      clearInputs();
    } catch (error) {
      toast("Failed to create/update event.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
      fetchEventsFromAPI();
    }
  };

  const handleDeleteEvent = async () => {
    setIsLoading(true);

    try {
      if (!selectedEvent) {
        throw new Error("No event selected for deletion.");
      }

      await deleteEvent(selectedEvent.id);

      toast("Event deleted successfully!", { type: "success" });

      clearInputs();
      setIsViewEventModalOpen(false);
    } catch (error) {
      toast("Failed to delete event.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
      fetchEventsFromAPI();
    }
  };

  const formInputs: FormInput[] = [
    {
      label: "Title",
      placeholder: "Title",
      type: "text",
      htmlType: "input",
      onChange: (e) => setTitle(e.target.value),
      value: title,
      error: errors["title"],
    },
    {
      label: "Description",
      placeholder: "Description",
      type: "text",
      htmlType: "textarea",
      onChange: (e) => setDescription(e.target.value),
      value: description,
      error: errors["description"],
    },
    {
      label: "Date",
      placeholder: "Date",
      type: "date",
      htmlType: "input",
      onChange: (e) => setDate(e.target.value),
      value: date,
      error: errors["date"],
    },
    {
      label: "Time",
      placeholder: "Time",
      type: "time",
      htmlType: "input",
      onChange: (e) => setTime(e.target.value),
      value: time,
      error: errors["time"],
    },
  ];

  const handleDateClick = (date: string) => {
    setDate(date);

    setIsCreateEventModalOpen(true);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split('T')[0]);
    setTime("00:00");
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedEvent(event);
    setEventType(event.type);
    setTitle(event.title);
    setDescription(event.description);
    setDate(transformDateTimeToObject(event.dateTime).dashDate);
    setTime(transformDateTimeToObject(event.dateTime).time);

    setIsViewEventModalOpen(true);
  };

  const handleEventModalClose = () => {
    setSelectedEvent(null);
    setErrors({});
    setEventType(EventTypes.Other);
    setIsCreateEventModalOpen(false);
    setIsViewEventModalOpen(false);

    clearInputs();
  };

  return {
    handleDateClick,
    handleEventClick,
    isCreateEventModalOpen,
    isViewEventModalOpen,
    eventType,
    setEventType,
    handleEventModalClose,
    formInputs,
    handleCreateEvent,
    handleDeleteEvent,
    isLoading,
    isLoadingEvents,
    monthIndex,
    year,
    eventTypesArray,
  };
};

export default useCalendar;
