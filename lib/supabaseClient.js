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

// Hire Me API functions
export const hireMeAPI = {
  // Upload files to hire-attachments bucket
  async uploadFiles(files, requestId) {
    const uploadedPaths = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExt = file.name.split(".").pop()
      const fileName = `${requestId}/${Date.now()}-${i}.${fileExt}`

      const { data, error } = await supabase.storage.from("hire-attachments").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("File upload error:", error)
        throw error
      }

      uploadedPaths.push(data.path)
    }

    return uploadedPaths
  },

  // Get signed URL for file download
  async getFileUrl(path) {
    const { data, error } = await supabase.storage.from("hire-attachments").createSignedUrl(path, 3600) // 1 hour expiry

    if (error) throw error
    return data.signedUrl
  },

  // Submit hire form (public)
  async submit(formData, files = []) {
    // First create the record to get an ID
    const { data: record, error: insertError } = await supabase
      .from("hire_me")
      .insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          company: formData.company,
          project_type: formData.project_type,
          budget: formData.budget,
          timeline: formData.timeline,
          project_description: formData.project_description,
          contact_method: formData.contact_method,
          available_time: formData.available_time,
          available_date: formData.available_date,
          hear_about: formData.hear_about,
          status: formData.status,
          priority: formData.priority,
          attachment_paths: [],
        },
      ])
      .select()
      .single()

    if (insertError) throw insertError

    // Upload files if any
    let attachmentPaths = []
    if (files.length > 0) {
      try {
        attachmentPaths = await this.uploadFiles(files, record.id)

        // Update record with file paths
        const { data: updatedRecord, error: updateError } = await supabase
          .from("hire_me")
          .update({ attachment_paths: attachmentPaths })
          .eq("id", record.id)
          .select()
          .single()

        if (updateError) throw updateError
        return updatedRecord
      } catch (uploadError) {
        // If file upload fails, we still keep the record but log the error
        console.error("File upload failed:", uploadError)
        return record
      }
    }

    return record
  },

  // Admin: Get all hire requests
  async getAll() {
    const { data, error } = await supabase.from("hire_me").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Admin: Get hire request by ID
  async getById(id) {
    const { data, error } = await supabase.from("hire_me").select("*").eq("id", id).single()

    if (error) throw error
    return data
  },

  // Admin: Update hire request
  async update(id, updates) {
    const { data, error } = await supabase.from("hire_me").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Admin: Delete hire request and associated files
  async delete(id) {
    // First get the record to find attached files
    const { data: record, error: fetchError } = await supabase
      .from("hire_me")
      .select("attachment_paths")
      .eq("id", id)
      .single()

    if (fetchError) throw fetchError

    // Delete associated files from storage
    if (record.attachment_paths && record.attachment_paths.length > 0) {
      const { error: storageError } = await supabase.storage.from("hire-attachments").remove(record.attachment_paths)

      if (storageError) {
        console.error("Error deleting files:", storageError)
      }
    }

    // Delete the record
    const { error } = await supabase.from("hire_me").delete().eq("id", id)
    if (error) throw error
  },

  // Admin: Delete specific file
  async deleteFile(requestId, filePath) {
    // Remove file from storage
    const { error: storageError } = await supabase.storage.from("hire-attachments").remove([filePath])

    if (storageError) throw storageError

    // Update record to remove file path
    const { data: record, error: fetchError } = await supabase
      .from("hire_me")
      .select("attachment_paths")
      .eq("id", requestId)
      .single()

    if (fetchError) throw fetchError

    const updatedPaths = record.attachment_paths.filter((path) => path !== filePath)

    const { error: updateError } = await supabase
      .from("hire_me")
      .update({ attachment_paths: updatedPaths })
      .eq("id", requestId)

    if (updateError) throw updateError
  },

  // Admin: Get statistics
  async getStats() {
    const { data, error } = await supabase.from("hire_me").select("status, priority, created_at")

    if (error) throw error

    const stats = {
      total: data.length,
      new: data.filter((item) => item.status === "new").length,
      in_review: data.filter((item) => item.status === "in_review").length,
      contacted: data.filter((item) => item.status === "contacted").length,
      in_progress: data.filter((item) => item.status === "in_progress").length,
      completed: data.filter((item) => item.status === "completed").length,
      rejected: data.filter((item) => item.status === "rejected").length,
      high_priority: data.filter((item) => item.priority === "high").length,
      urgent: data.filter((item) => item.priority === "urgent").length,
      this_month: data.filter((item) => {
        const itemDate = new Date(item.created_at)
        const now = new Date()
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
      }).length,
    }

    return stats
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
