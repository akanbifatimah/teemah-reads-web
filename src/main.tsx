import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'inherit' },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: '#1d4ed8', color: '#fff' } },
          error:   { style: { background: '#dc2626', color: '#fff' } },
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
)