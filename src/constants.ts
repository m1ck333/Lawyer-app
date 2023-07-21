import { EventTypes } from "./types";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const DAYS_OF_WEEK_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

export const EVENT_TYPE_COLORS: { [key in EventTypes]: string } = {
  [EventTypes.Hearing]: "blue",
  [EventTypes.Meeting]: "red",
  [EventTypes.Report]: "orange",
  [EventTypes.Other]: "green",
};
