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

export interface Event {
  id: number;
  title: string;
  date: Date;
  description: string;
}

export type DropDownButton = {
  to?: string;
  label: string;
  onClick?: () => void;
};

export type FormInput = {
  label: string;
  error: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: () => void,
};
