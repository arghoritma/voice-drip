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

export interface CommentWithUser {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_name: string; // Nama user
  user_avatar: string; // Avatar user
}

export interface RequestWithDetails {
  user: {
    name: string;
    avatar: string;
  };
  id: string;
  title: string;
  description: string;
  type: "feature" | "bug" | "improvement";
  status: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  comments: CommentWithUser[]; // Komentar dengan informasi user
  vote_count: number;
  tags: string[];
}

export interface PostCardProps {
  item: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    created_at: string;
    type: string;
    title: string;
    description: string;
    status: string;
    tags: string[];
    likes: number;
    comments: number;
    isVoted: boolean;
  };
}
