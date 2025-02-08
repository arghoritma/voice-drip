export interface User {
  id: string;
  email: string;
  username: string;
  phone_number?: string;
  password: string;
  role?: string;
  created_at: string;
  updated_at?: string;
}


export interface File {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  status?: string;
  is_recurring?: boolean;
  repeat?: string;
  original_date?: string;
  created_at: string;
  completed_at?: string;
  user_id: string;
  main_todo_id?: string;
  recurrence_id?: string;
}

export interface TodoRecurrence {
  id: string;
  main_todo_id: string;
  pattern: string;
  next_date: string;
  original_date: string;
  is_active?: boolean;
  user_id: string;
  created_at: string;
  last_completed_date?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}


export type RepeatPattern =
  | "never"
  | "daily"
  | "workdays"
  | "weekends"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "yearly";
