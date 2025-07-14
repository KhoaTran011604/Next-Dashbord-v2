import { ChangeEventHandler } from "react";

export type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export type SortOrder = 1 | -1;

export type Filter = {
  keySearch: string;
  sort: Record<string, SortOrder>;
  page: number;
  pageSize: number;
  sessionCode: string;
  sortField?: string;
  sortOrder?: string;
};

export type UserTokenPayload = {
  accessToken: string;
  userId: string;
  exp?: number;
  iat?: number;
};

export type InputFieldProps = {
  name: string;
  type?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type HD_InputProps = {
  title?: string;
  isItemForm?: boolean;
  name: string;
  type?: string;
  placeholder?: string;
  iconPosition?: string;
  fileStyleVariant?: string;
  height?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  initValue?: string;
  onChange: (value: string) => void;
};

export type LoginProps = {
  email: string;
  password: string;
};
