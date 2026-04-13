import { useState } from 'react';
import { authApi } from '../api/auth';
import toast from 'react-hot-toast'
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const saveSession = (token: string, email: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError('');
      setLoading(true);
      const res = await authApi.login(email, password);
      saveSession(res.data.access_token, res.data.email);
      toast.success('Welcome back!')
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Login failed');
      toast.error(err.response?.data?.message ?? 'Login failed')
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      setError('');
      setLoading(true);
      const res = await authApi.register(email, password);
      saveSession(res.data.access_token, res.data.email);
      toast.success('Account created!')
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Registration failed');
      toast.error(err.response?.data?.message ?? 'Registration failed')
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return { login, register, logout, loading, error };
}