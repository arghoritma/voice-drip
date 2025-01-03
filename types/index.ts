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

export interface Team {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  joined_at: string;
}

export interface Project {
  id: string;
  team_id: string;
  name: string;
  description?: string;
  deadline?: string;
  created_at: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface Comment {
  id: string;
  task_id: string;
  user_id: string;
  content?: string;
  created_at: string;
}

export interface File {
  id: string;
  task_id: string;
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

export interface Division {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface UserDivision {
  id: number;
  user_id: string;
  division_id: number;
  assigned_at: string;
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
