import { useState } from "react";
import { Event, FormInput } from "../types";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Meeting",
    date: new Date("2023-07-10T10:00:00"),
    time: "08:20",
    description: "Discuss project updates",
  },
  {
    id: 2,
    title: "Lunch",
    date: new Date("2023-07-11T12:00:00"),
    time: "03:20",
    description: "Meet with colleagues for lunch",
  },
  {
    id: 3,
    title: "Lunch2",
    time: "01:20",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch2",
  },
  {
    id: 4,
    title: "Lunch3",
    time: "11:20",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch3",
  },
  {
    id: 5,
    title: "Lunch4",
    time: "14:20",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch4",
  },
  {
    id: 6,
    title: "Lunch5",
    time: "13:22",
    date: new Date("2023-07-11T12:00:00"),
    description: "Meet with colleagues for lunch5",
  },
  // Add more dummy events as needed
];

const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");

  const monthIndex = useAppSelector((state) => state.calendar.monthIndex);
  const year = useAppSelector((state) => state.calendar.year);

  const handleCreateEvent = async (
    e: React.FormEvent,
    type: "create" | "update"
  ) => {
    e.preventDefault();

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
      setSelectedDate(null);
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
      onChange: (e) => setDate(new Date(e.target.value)),
      value: date.toISOString().split("T")[0],
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    const nextDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    setDate(nextDay); // Update the date input value

    setIsCreateEventModalOpen(true);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setTime("");
  };

  const handleEventClick = (date: Date, event: Event, e: React.MouseEvent) => {
    // Stop the propagation of the click event to prevent handleDateClick from being triggered
    e.stopPropagation();

    setSelectedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);

    setIsViewEventModalOpen(true);

    console.log("Clicked Event:", event, date);
  };

  const handleEventModalClose = () => {
    setSelectedDate(null);
    setSelectedEvent(null);
    setIsCreateEventModalOpen(false);
    setIsViewEventModalOpen(false);

    clearInputs();
  };

  return {
    isCreateEventModalOpen,
    isViewEventModalOpen,
    selectedDate,
    selectedEvent,
    handleDateClick,
    handleEventClick,
    handleEventModalClose,
    formInputs,
    handleCreateEvent,
    handleDeleteEvent,
    isLoading,
    events: EVENTS,
    currentMonth,
    setCurrentMonth,
    monthIndex,
    year,
  };
};

export default useCalendar;
