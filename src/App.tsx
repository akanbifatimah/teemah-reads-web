import { useState } from 'react';
import { useBooks } from './hooks/UseBooks';
import { useAuth } from './hooks/UseAuth';
import { AuthForm } from './components/Authform';
import { BookList } from './components/Booklist';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')   // persist session across refreshes
  );
  const email = localStorage.getItem('email') ?? '';

  const { login, register, logout, loading: authLoading, error: authError } = useAuth();
  const { books, loading, error, addBook, toggleRead, deleteBook } = useBooks(isAuthenticated);

  const handleLogin = async (email: string, password: string) => {
    const ok = await login(email, password);
    if (ok) setIsAuthenticated(true);
    return ok;
  };

  const handleRegister = async (email: string, password: string) => {
    const ok = await register(email, password);
    if (ok) setIsAuthenticated(true);
    return ok;
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        loading={authLoading}
        error={authError}
      />
    );
  }

  return (
    <BookList
      books={books}
      loading={loading}
      error={error}
      onAdd={addBook}
      onToggle={toggleRead}
      onDelete={(id, title) => deleteBook(id, title)}
      onLogout={handleLogout}
      email={email}
    />
  );
}