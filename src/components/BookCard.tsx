import { IconButton, Tooltip, Chip } from '@mui/material'
import { Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'
import type { Book } from '../types/book.types'

interface Props {
  book:     Book
  onToggle: (book: Book) => void
  onDelete: (id: string, title: string) => void
}

export function BookCard({ book, onToggle, onDelete }: Props) {
  return (
    <div className={`flex items-center gap-3 py-4 border-b border-blue-50 group transition-colors hover:bg-blue-50/40 px-2 -mx-2 rounded-xl ${book.read ? 'opacity-70' : ''}`}>
      <Tooltip title={book.read ? 'Mark as unread' : 'Mark as read'}>
        <IconButton size="small" onClick={() => onToggle(book)} className="text-primary-500 flex-shrink-0">
          {book.read
            ? <CheckCircle sx={{ color: '#2563eb' }} />
            : <RadioButtonUnchecked sx={{ color: '#93c5fd' }} />}
        </IconButton>
      </Tooltip>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${book.read ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {book.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {book.author}{book.year ? ` · ${book.year}` : ''}
        </p>
      </div>

      <Chip
        label={book.read ? 'Read' : 'To read'}
        size="small"
        sx={{
          fontSize: 11,
          height: 22,
          background: book.read ? '#dbeafe' : '#f1f5f9',
          color:      book.read ? '#1d4ed8' : '#64748b',
          border: 'none',
        }}
      />

      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() => onDelete(book._id, book.title)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
        >
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  )
}