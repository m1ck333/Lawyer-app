// User
export enum Roles {
  admin = "admin",
  lawyer = "lawyer",
  trainee = "trainee",
  operator = "operator",
  other = "other",
}

export interface User {
  id?: number;
  name?: string;
  surname?: string;
  username?: string;
  email: string;
  role: Roles;
  jwt?: string;
  lastLogin?: string | null;
  isActive: boolean;
  selectedRole?: Roles;
}
// End user

// Event
export enum EventTypes {
  Hearing = "hearing",
  Meeting = "meeting",
  Report = "report",
  Other = "other",
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: EventTypes;
}
// End event

// UI
export type DropDownButton = {
  to?: string;
  label: string;
  onClick?: () => void;
};

export type FormInput = {
  label: string;
  placeholder: string;
  value: string;
  error: string;
  type: string;
  htmlType: "input" | "textarea";
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};
// End UI
