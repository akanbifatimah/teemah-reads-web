export interface Book {
  _id: string;
  title: string;
  author: string;
  year?: number;
  read: boolean;
  userId: string;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  email: string;
}