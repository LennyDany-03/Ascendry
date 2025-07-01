import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Helper functions for database operations
export const projectsAPI = {
  // Get all published projects
  async getPublished() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Get project by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get all projects
  async getAll() {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Admin: Create project
  async create(project) {
    const { data, error } = await supabase.from("projects").insert([project]).select().single()

    if (error) throw error
    return data
  },

  // Admin: Update project
  async update(id, updates) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Admin: Delete project
  async delete(id) {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
  },
}

export const productsAPI = {
  // Get all published products
  async getPublished() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Get product by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get all products
  async getAll() {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Admin: Create product
  async create(product) {
    const { data, error } = await supabase.from("products").insert([product]).select().single()

    if (error) throw error
    return data
  },

  // Admin: Update product
  async update(id, updates) {
    const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Admin: Delete product
  async delete(id) {
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) throw error
  },
}

// Storage helpers
export const storageAPI = {
  // Upload file to bucket
  async uploadFile(bucket, path, file) {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) throw error
    return data
  },

  // Get public URL for file
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)

    return data.publicUrl
  },

  // Delete file
  async deleteFile(bucket, path) {
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) throw error
  },
}

// Auth helpers
export const authAPI = {
  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current session
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Check if user is admin
  async isAdmin() {
    const session = await this.getSession()
    if (!session) return false

    const { data, error } = await supabase
      .from("admin_access")
      .select("*")
      .or(`user_id.eq.${session.user.id},email.eq.${session.user.email}`)
      .eq("is_active", true)
      .single()

    if (error) return false
    return !!data
  },
}

export default supabase
