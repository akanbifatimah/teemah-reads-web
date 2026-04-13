import client from './client';
import type { AuthResponse } from '../types/book.types';

export const authApi = {
  register: (email: string, password: string) =>
    client.post<AuthResponse>('/auth/register', { email, password }),

  login: (email: string, password: string) =>
    client.post<AuthResponse>('/auth/login', { email, password }),
};