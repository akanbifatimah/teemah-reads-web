import axios from 'axios';
import client from './client';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface Book {
  _id: string;
  title: string;
  author: string;
  year?: number;
  read: boolean;
  createdAt: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  year?: number;
}

export const booksApi = {
  getAll: ()                            => api.get<Book[]>('/books'),
  getOne: (id: string)                  => api.get<Book>(`/books/${id}`),
  create: (data: CreateBookPayload)     => api.post<Book>('/books', data),
  update: (id: string, data: Partial<Book>) => api.put<Book>(`/books/${id}`, data),
  toggleRead: (id: string, read: boolean) =>
    client.put<Book>(`/books/${id}`, { read }),
  delete: (id: string)                  => api.delete(`/books/${id}`),
};