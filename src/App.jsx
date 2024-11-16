import { Toaster } from '@/components/ui/sonner'
import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/custom/Header.jsx'
function App() {
  const [count, setCount] = useState(0)
  const { isSignedIn, user ,isLoaded} = useUser()

  
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
