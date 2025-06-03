import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript types for our database
export type UserSubmission = {
  id: string
  name: string
  message: string
  attendance: 'attending' | 'unable' | null
  guest_count: number | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      user_submissions: {
        Row: UserSubmission
        Insert: Omit<UserSubmission, 'id' | 'created_at'>
        Update: Partial<Omit<UserSubmission, 'id' | 'created_at'>>
      }
    }
  }
}
