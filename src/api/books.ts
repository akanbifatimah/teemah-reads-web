import client from "./client";
import type { Book } from "../types/book.types";

export interface CreateBookPayload {
  title: string;
  author: string;
  year?: number;
}

export const booksApi = {
  getAll: () => client.get<Book[]>("/books"),

  getOne: (id: string) => client.get<Book>(`/books/${id}`),

  create: (data: CreateBookPayload) => client.post<Book>("/books", data),

  toggleRead: (id: string, read: boolean) =>
    client.put<Book>(`/books/${id}`, { read }),

  delete: (id: string) => client.delete(`/books/${id}`),
};
