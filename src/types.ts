export enum Roles {
  admin = "admin",
  lawyer = "lawyer",
  trainee = "trainee",
  operator = "operator",
  other = "other",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Roles;
  jwt: string;
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
