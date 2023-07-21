import { useState, useEffect } from "react";
import { Event, EventTypes, FormInput } from "../types";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setEvents } from "../redux/slices/eventSlice";

const DUMMY_EVENTS: Event[] = [
  {
    id: 1,
    title: "Dummy Event 1",
    date: "2023-07-15",
    time: "08:20",
    description: "This is a dummy event",
    type: EventTypes.Other,
  },
  {
    id: 2,
    title: "Dummy Event 2",
    date: "2023-07-16",
    time: "03:20",
    description: "This is another dummy event",
    type: EventTypes.Hearing,
  },
];

const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [eventType, setEventType] = useState<EventTypes[number]>(
    EventTypes.Other
  );

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const monthIndex = useAppSelector((state) => state.calendar.monthIndex);
  const year = useAppSelector((state) => state.calendar.year);

  const eventTypesArray: EventTypes[] = Object.values(EventTypes);

  useEffect(() => {
    setIsLoadingEvents(true);

    const fetchEventsFromAPI = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(setEvents(DUMMY_EVENTS));
      setIsLoadingEvents(false)
    };

    fetchEventsFromAPI();
  }, []);

  const handleCreateEvent = async (
    e: React.FormEvent,
    type: "create" | "update"
  ) => {
    e.preventDefault();

    setIsLoading(true);

    setErrors({});

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

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      setErrors(errors);
      return;
    }

    if (type === "create") {
      // Simulating event creation with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Successfully created event.", {
        type: "success",
      });

      clearInputs();
    } else if (type === "update") {
      // Simulating event creation with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Successfully updated event.", {
        type: "success",
      });
    }

    console.log({ title, description, date, time });

    setIsLoading(false);
  };

  const handleDeleteEvent = () => {
    setIsLoading(true);

    setTimeout(() => {
      setSelectedDate("");
      toast("Event deleted successfully!", { type: "success" });
      clearInputs();
      setIsViewEventModalOpen(false);
      setIsLoading(false);
    }, 2000);
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
    setSelectedDate(date);

    setDate(date);

    setIsCreateEventModalOpen(true);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedEvent(event);
    setEventType(event.type);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);

    setIsViewEventModalOpen(true);
  };

  const handleEventModalClose = () => {
    setSelectedDate("");
    setSelectedEvent(null);
    setErrors({});
    setEventType(EventTypes.Other);
    setIsCreateEventModalOpen(false);
    setIsViewEventModalOpen(false);

    clearInputs();
  };

  return {
    isCreateEventModalOpen,
    isViewEventModalOpen,
    selectedDate,
    selectedEvent,
    eventType,
    setEventType,
    handleDateClick,
    handleEventClick,
    handleEventModalClose,
    formInputs,
    handleCreateEvent,
    handleDeleteEvent,
    isLoading,
    isLoadingEvents,
    events,
    currentMonth,
    setCurrentMonth,
    monthIndex,
    year,
    eventTypesArray,
  };
};

export default useCalendar;
