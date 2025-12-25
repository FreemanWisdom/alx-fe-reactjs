
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 1️⃣ Import React Query tools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2️⃣ Create a Query Client instance
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3️⃣ Provide React Query to the entire app */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
