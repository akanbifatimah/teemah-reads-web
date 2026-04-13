import { useState, useEffect, useCallback } from 'react';
import { booksApi } from '../api/books';
import type { Book } from '../types/book.types';
import toast from 'react-hot-toast'
export function useBooks(isAuthenticated: boolean) {
  const [books, setBooks]     = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const fetchBooks = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError('');
      const res = await booksApi.getAll();
      setBooks(res.data as Book[]);
    } catch {
      setError('Could not load books. Is the API running?');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (title: string, author: string, year?: number) => {
  try {
    setError('')
    await booksApi.create({ title, author, year })
    await fetchBooks()
    toast.success(`"${title}" added!`)
    return true
  } catch (err: any) {
    const msg = err.response?.data?.message
    const text = Array.isArray(msg) ? msg.join(', ') : (msg ?? 'Failed to add book')
    setError(text)
    toast.error(text)
    return false
  }
}

const toggleRead = async (book: Book) => {
  setBooks(prev =>
    prev.map(b => b._id === book._id ? { ...b, read: !b.read } : b)
  )
  try {
    await booksApi.toggleRead(book._id, !book.read)
    toast.success(book.read ? `"${book.title}" marked unread` : `"${book.title}" marked as read!`)
  } catch {
    setBooks(prev =>
      prev.map(b => b._id === book._id ? { ...b, read: book.read } : b)
    )
    toast.error('Failed to update book')
  }
}

const deleteBook = async (id: string, title: string) => {
  setBooks(prev => prev.filter(b => b._id !== id))
  try {
    await booksApi.delete(id)
    toast.success(`"${title}" deleted`)
  } catch {
    await fetchBooks()
    toast.error('Failed to delete book')
  }
}

  return { books, loading, error, addBook, toggleRead, deleteBook };
}