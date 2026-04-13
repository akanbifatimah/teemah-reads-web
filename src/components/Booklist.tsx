import { Paper, Typography, Avatar, Button, Tooltip } from '@mui/material'
import { Logout, MenuBook, AutoStories, CheckCircle } from '@mui/icons-material'
import type { Book } from '../types/book.types'
import { BookCard } from './BookCard'
import { BookForm } from './BookForm'

interface Props {
  books:    Book[]
  loading:  boolean
  error:    string
  onAdd:    (title: string, author: string, year?: number) => Promise<boolean>
  onToggle: (book: Book) => void
  onDelete: (id: string, title: string) => void
  onLogout: () => void
  email:    string
}

export function BookList({ books, loading, error, onAdd, onToggle, onDelete, onLogout, email }: Props) {
  const readCount = books.filter(b => b.read).length
  const initials  = email.slice(0, 2).toUpperCase()

  const stats = [
    { icon: <MenuBook sx={{ fontSize: 20, color: '#2563eb' }} />,   label: 'Total',   n: books.length,             bg: '#eff6ff', color: '#1d4ed8' },
    { icon: <AutoStories sx={{ fontSize: 20, color: '#7c3aed' }} />, label: 'To read', n: books.length - readCount, bg: '#f5f3ff', color: '#6d28d9' },
    { icon: <CheckCircle sx={{ fontSize: 20, color: '#059669' }} />, label: 'Read',    n: readCount,                bg: '#ecfdf5', color: '#065f46' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 text-white rounded-xl p-2">
              <MenuBook />
            </div>
            <div>
              <Typography variant="h6" className="font-semibold text-primary-900 leading-tight">
                BookShelf
              </Typography>
              <Typography variant="caption" className="text-blue-400">
                {email}
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip title={email}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#2563eb', fontSize: 14 }}>
                {initials}
              </Avatar>
            </Tooltip>
            <Button
              onClick={onLogout}
              startIcon={<Logout fontSize="small" />}
              size="small"
              sx={{ textTransform: 'none', color: '#64748b' }}
            >
              Sign out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map(({ icon, label, n, bg, color }) => (
            <Paper key={label} elevation={0} className="rounded-2xl border border-blue-100 p-4" sx={{ background: bg }}>
              <div className="flex items-center gap-2 mb-1">{icon}</div>
              <Typography variant="h4" sx={{ fontWeight: 700, color, lineHeight: 1 }}>{n}</Typography>
              <Typography variant="caption" sx={{ color, opacity: 0.7 }}>{label}</Typography>
            </Paper>
          ))}
        </div>

        {/* Add book form */}
        <Paper elevation={0} className="rounded-2xl border border-blue-100 p-5 mb-5">
          <Typography variant="subtitle2" className="text-blue-400 mb-4 font-medium">
            Add a new book
          </Typography>
          <BookForm onAdd={onAdd} />
        </Paper>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Book list */}
        <Paper elevation={0} className="rounded-2xl border border-blue-100 px-4 py-2">
          {loading && (
            <Typography className="text-center py-10 text-blue-300">Loading your books…</Typography>
          )}
          {!loading && books.length === 0 && (
            <div className="text-center py-12">
              <MenuBook sx={{ fontSize: 48, color: '#bfdbfe', mb: 2 }} />
              <Typography color="text.secondary" variant="body2">No books yet. Add your first one above.</Typography>
            </div>
          )}
          {books.map(book => (
            <BookCard key={book._id} book={book} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </Paper>

      </div>
    </div>
  )
}