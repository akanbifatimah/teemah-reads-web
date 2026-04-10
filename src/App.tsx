import { useEffect, useState } from 'react';
import { booksApi } from './api/books';
import type { Book, CreateBookPayload } from './api/books';

function App() {
  const [books, setBooks]     = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // Form state
  const [title, setTitle]   = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear]     = useState('');

  // Fetch all books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const res = await booksApi.getAll();
      setBooks(res.data);
    } catch {
      setError('Could not load books. Is the API running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !author) return;

    const payload: CreateBookPayload = { title, author };
    if (year) payload.year = parseInt(year);

    await booksApi.create(payload);
    setTitle(''); setAuthor(''); setYear('');
    fetchBooks();  // refresh the list
  }

  async function handleToggleRead(book: Book) {
    await booksApi.update(book._id, { read: !book.read });
    fetchBooks();
  }

  async function handleDelete(id: string) {
    await booksApi.delete(id);
    fetchBooks();
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <h1>My Book List</h1>

      {/* Add book form */}
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        <input
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          placeholder="Author *"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          placeholder="Year (optional)"
          value={year}
          type="number"
          onChange={e => setYear(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Add book
        </button>
      </form>

      {/* Book list */}
      {loading && <p>Loading...</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {books.map(book => (
        <div key={book._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
          <div>
            <strong style={{ textDecoration: book.read ? 'line-through' : 'none' }}>
              {book.title}
            </strong>
            <span style={{ color: '#666', marginLeft: 8 }}>{book.author} {book.year && `(${book.year})`}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => handleToggleRead(book)} style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 4, border: '1px solid #ccc' }}>
              {book.read ? 'Unread' : 'Mark read'}
            </button>
            <button onClick={() => handleDelete(book._id)} style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 4, border: '1px solid #f99', color: '#c00' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;