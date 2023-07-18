import { useState } from "react";
import { Event, FormInput } from "../types";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Meeting",
    date: new Date("2023-07-10T10:00:00"),
    description: "Discuss project updates",
  },
  {
    id: 2,
    title: "Lunch",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch",
  },
  {
    id: 3,
    title: "Lunch2",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch2",
  },
  // Add more dummy events as needed
];

const useCalendar = () => {
  const monthIndex = useAppSelector((state) => state.calendar.monthIndex);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]); // Track selected events

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleCreateEvent = async (data: Event) => {
    const { title, date, description } = data;

    setIsLoading(true);

    setErrors({}); // Clear errors before validating the form inputs

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

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Simulating event creation with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast("Successfully created event.", {
      type: "success",
    });

    console.log(data);

    setIsLoading(false);
  };

  const handleUpdateEvent = (eventId: number, data: Event) => {
    // Logic to update an existing event
    const updatedEvents = selectedEvents.map((event) =>
      event.id === eventId ? { ...event, ...data } : event
    );
    setSelectedEvents(updatedEvents);

    setIsEventModalOpen(false);
    setSelectedDate(null);

    // Dispatch any actions or API requests related to event update

    // Example toast notification
    toast("Event updated successfully!", { type: "success" });
  };

  const handleDeleteEvent = (eventId: number) => {
    // Logic to delete an event
    const updatedEvents = selectedEvents.filter(
      (event) => event.id !== eventId
    );
    setSelectedEvents(updatedEvents);

    setIsEventModalOpen(false);
    setSelectedDate(null);

    // Dispatch any actions or API requests related to event deletion

    // Example toast notification
    toast("Event deleted successfully!", { type: "success" });
  };

  const formInputs: FormInput[] = [
    {
      label: "Title",
      placeholder: "Title",
      type: "text",
      onChange: (e) => setTitle(e.target.value),
      value: title,
      error: errors["title"],
    },
    {
      label: "Description",
      placeholder: "Description",
      type: "text",
      onChange: (e) => setDescription(e.target.value),
      value: description,
      error: errors["description"],
    },
    {
      label: "Date",
      placeholder: "Date",
      type: "date",
      onChange: (e) => setDate(new Date(e.target.value)),
      value: date.toISOString().split("T")[0],
      error: errors["date"],
    },
  ];

  const handleDateClick = (date: Date, events: Event[]) => {
    const selectedEvents = events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
    setSelectedEvents(selectedEvents);

    setSelectedDate(date);

    const nextDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    setDate(nextDay); // Update the date input value

    setIsEventModalOpen(true);
  };

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
    setSelectedDate(null);
    setSelectedEvents([]);
  };

  const handleCreateOrUpdateEvent = () => {
    const eventData: Event = {
      id: selectedDate?.getTime() ?? Date.now(),
      title,
      date: selectedDate!,
      description,
    };

    if (selectedDate) {
      handleUpdateEvent(selectedDate.getTime(), eventData);
    } else {
      handleCreateEvent(eventData);
    }
  };

  return {
    isEventModalOpen,
    selectedDate,
    selectedEvents,
    handleDateClick,
    handleEventModalClose,
    formInputs,
    handleCreateOrUpdateEvent,
    handleDeleteEvent,
    isLoading,
    events: EVENTS,
    currentMonth,
    setCurrentMonth,
    monthIndex,
  };
};

export default useCalendar;
