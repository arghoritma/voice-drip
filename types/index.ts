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
