import { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import { Add } from '@mui/icons-material'

interface Props {
  onAdd: (title: string, author: string, year?: number) => Promise<boolean>
}

export function BookForm({ onAdd }: Props) {
  const [title, setTitle]     = useState('')
  const [author, setAuthor]   = useState('')
  const [year, setYear]       = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    setLoading(true)
    const ok = await onAdd(title.trim(), author.trim(), year ? parseInt(year) : undefined)
    if (ok) { setTitle(''); setAuthor(''); setYear('') }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
      <TextField label="Title *"  value={title}  onChange={e => setTitle(e.target.value)}  size="small" sx={{ flex: '2 1 160px' }} />
      <TextField label="Author *" value={author} onChange={e => setAuthor(e.target.value)} size="small" sx={{ flex: '2 1 140px' }} />
      <TextField
        label="Year" value={year} onChange={e => setYear(e.target.value)}
        size="small" type="number" sx={{ flex: '0 1 90px' }}
        inputProps={{ min: 1000, max: 2100 }}
      />
      <Button
        type="submit" variant="contained" disabled={loading || !title.trim() || !author.trim()}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Add />}
        sx={{ textTransform: 'none', height: 40, px: 3 }}
      >
        {loading ? 'Adding…' : 'Add book'}
      </Button>
    </form>
  )
}