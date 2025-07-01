"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState("Processing authentication...")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setStatus("Authentication failed. Redirecting...")
          setTimeout(() => router.push("/admin/login"), 2000)
          return
        }

        if (!data.session) {
          setStatus("No session found. Redirecting...")
          setTimeout(() => router.push("/admin/login"), 2000)
          return
        }

        const user = data.session.user
        setStatus("Verifying admin access...")

        // Check if user has admin access
        const { data: adminData, error: adminError } = await supabase
          .from("admin_access")
          .select("*")
          .eq("email", user.email)
          .eq("is_active", true)
          .single()

        if (adminError || !adminData) {
          console.error("Admin access denied:", adminError)
          setStatus("Access denied. You don't have admin privileges.")

          // Sign out the user
          await supabase.auth.signOut()

          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        // Update last login
        await supabase.from("admin_access").update({ last_login: new Date().toISOString() }).eq("email", user.email)

        setStatus("Access granted! Redirecting to dashboard...")
        setTimeout(() => router.push("/admin/dashboard"), 1500)
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        setStatus("An unexpected error occurred. Redirecting...")
        setTimeout(() => router.push("/admin/login"), 2000)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Authenticating...</h1>
        <p className="text-gray-400">{status}</p>
      </div>
    </div>
  )
}
