import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, EventTypes } from "../../types";

interface EventsState {
  events: Event[];
  filteredEvents: Event[];
  selectedEventTypes: EventTypes[];
}

const allEventTypes: EventTypes[] = Object.values(EventTypes);

const initialState: EventsState = {
  events: [],
  filteredEvents: [],
  selectedEventTypes: allEventTypes,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      console.log("1");
      
      state.events = action.payload;
      console.log("2");
      state.filteredEvents = action.payload;
      console.log("3");
    },
    toggleSelectedEventType: (state, action: PayloadAction<EventTypes>) => {
      const eventType = action.payload;
      const isSelected = state.selectedEventTypes.includes(eventType);

      if (isSelected) {
        state.selectedEventTypes = state.selectedEventTypes.filter(
          (type) => type !== eventType
        );
      } else {
        state.selectedEventTypes.push(eventType);
      }

      // Filter the events based on the selected event types
      state.filteredEvents = state.events.filter((event) =>
        state.selectedEventTypes.includes(event.type)
      );
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.filteredEvents.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<number>) => {
      const eventIdToRemove = action.payload;
      state.events = state.events.filter((event) => event.id !== eventIdToRemove);
      state.filteredEvents = state.filteredEvents.filter(
        (event) => event.id !== eventIdToRemove
      );
    },
  },
});

export const {
  setEvents,
  toggleSelectedEventType,
  addEvent,
  removeEvent,
} = eventSlice.actions;
export default eventSlice.reducer;
