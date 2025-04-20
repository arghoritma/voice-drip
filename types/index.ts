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
  created_at: string;
  updated_at: string;
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
  platform_id: string;
  platform_name: string;
  platform_logo: string;
  images: string[];
  comments: CommentWithUser[];
  vote_count: number;
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
    platform_name: string;
    platform_logo: string;
    images: string[];
  };
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export interface RequestType {
  type: "feature" | "bug" | "improvement";
}

export interface RequestStatus {
  status: "submitted" | "in_progress" | "completed" | "rejected";
}

export interface RequestResponse {
  success: boolean;
  data?: Request | RequestWithDetails;
  errors?: {
    _form?: string[];
  };
}

export interface RequestListResponse {
  success: boolean;
  data?: {
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
  }[];
  errors?: {
    _form?: string[];
  };
}

export interface CreateRequestData {
  title: string;
  description: string;
  type: RequestType;
  platform_id?: string;
}

export interface PlatformProps {
  id: string;
  name: string;
  logo: string;
  total_requests: number;
  total_votes: number;
  total_users: number;
}

export interface TrendingRequestProps {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  created_at: string;
  platform_name: string;
  vote_count: number;
  comment_count: number;
}

export interface RequestDetailsProps {
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
  platform_name: string;
  platform_logo: string;
  images: string[];
}

export interface ProfileProps {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface PayloadGoogleSign {
  email: string;
  name: string;
  uid: string;
  Avatar: string;
}
