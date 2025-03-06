export interface User {
  id: string;
  email: string;
  name: string;
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

export interface Request {
  id: string;
  title: string;
  description: string;
  type: "feature" | "bug" | "improvement";
  status: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
