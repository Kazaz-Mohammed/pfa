"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SCNManagement from "@/components/ScnManagement"

// This is a wrapper component that ensures the user is authenticated
export default function ProtectedDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // Try to fetch the current user
        const response = await fetch('/api/auth/me') // You'll need to create this endpoint
        const data = await response.json()
        
        if (data.user) {
          setIsAuthenticated(true)
        } else {
          // User is not authenticated, redirect to login
          router.push('/')
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return isAuthenticated ? <SCNManagement /> : null
}