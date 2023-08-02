import axios from "axios";
import { Event } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(`${apiUrl}/api/event`);
    return response.data;
  } catch (error) {
    console.log("Error fetching events:", error);
    throw new Error("Failed to fetch events.");
  }
};

export const createEvent = async (
  eventData: Partial<Event>
): Promise<Event> => {
  try {
    const response = await axios.post<Event>(`${apiUrl}/api/event`, eventData);
    return response.data;
  } catch (error) {
    console.log("Error creating event:", error);
    throw new Error("Failed to create event.");
  }
};

export const updateEvent = async (
  eventData: Partial<Event>
): Promise<Event> => {
  try {
    const response = await axios.put<Event>(`${apiUrl}/api/event`, eventData);
    return response.data;
  } catch (error) {
    console.log("Error updating event:", error);
    throw new Error("Failed to update event.");
  }
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  try {
    await axios.delete<Event>(`${apiUrl}/api/event/${eventId}`);
  } catch (error) {
    console.log("Error deleting event:", error);
    throw new Error("Failed to delete event.");
  }
};
