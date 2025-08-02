import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value
      },
      set(name, value, options) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name, options) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: "",
          ...options,
        })
      },
    },
  })

  // Don't run middleware on static files, API routes, or auth callback
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".") ||
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname === "/admin/auth/callback"
  ) {
    return response
  }

  // Only protect admin routes (except login and callback)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // If no user is logged in, redirect to login
      if (!user) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Check if user has admin access
      const { data: adminAccess } = await supabase
        .from("admin_access")
        .select("*")
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .eq("is_active", true)
        .maybeSingle()

      // If user is not an admin, redirect to home
      if (!adminAccess) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      console.error("Middleware error:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
