"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../../lib/supabaseClient"

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState("Processing authentication...")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus("Verifying session...")

        // Get the session from the URL hash
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setStatus("Authentication failed")
          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        if (!session || !session.user) {
          setStatus("No valid session found")
          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        setStatus("Checking admin access...")

        // Check if user has admin access using the user's email
        const userEmail = session.user.email

        if (!userEmail) {
          setStatus("No email found in session")
          await supabase.auth.signOut()
          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        console.log("Checking access for email:", userEmail)

        // Query admin_access table
        const { data: adminData, error: adminError } = await supabase
          .from("admin_access")
          .select("*")
          .eq("email", userEmail)
          .eq("is_active", true)
          .maybeSingle() // Use maybeSingle instead of single to avoid errors when no record found

        console.log("Admin query result:", { adminData, adminError })

        if (adminError) {
          console.error("Admin access query error:", adminError)
          setStatus(`Database error: ${adminError.message}`)
          await supabase.auth.signOut()
          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        if (!adminData) {
          console.log("No admin access found for email:", userEmail)
          setStatus("Access denied - Email not authorized")
          await supabase.auth.signOut()
          setTimeout(() => router.push("/admin/login"), 3000)
          return
        }

        setStatus("Access granted! Updating login time...")

        // Update the admin record with user_id and last login
        const { error: updateError } = await supabase
          .from("admin_access")
          .update({
            user_id: session.user.id,
            last_login: new Date().toISOString(),
            full_name: session.user.user_metadata?.full_name || adminData.full_name,
            avatar_url: session.user.user_metadata?.avatar_url || adminData.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", adminData.id)

        if (updateError) {
          console.error("Update error:", updateError)
          // Don't fail the login for update errors, just log them
        }

        setStatus("Login successful! Redirecting...")

        // Show success and redirect
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1500)
      } catch (error) {
        console.error("Unexpected callback error:", error)
        setStatus("An unexpected error occurred")
        setTimeout(() => router.push("/admin/login"), 3000)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>

      <div className="text-center relative z-10">
        {/* Loading Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div
            className="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>

        {/* Status Messages */}
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Authenticating
        </h1>
        <p className="text-gray-400 text-lg mb-2">{status}</p>
        <p className="text-gray-500 text-sm">Please wait while we verify your access...</p>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
