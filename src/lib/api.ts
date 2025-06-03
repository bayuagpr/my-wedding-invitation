import { supabase, type UserSubmission } from './supabase'

// Submit RSVP with wishes
export async function submitRSVP(data: {
  name: string
  attendance: 'attending' | 'unable'
  guest_count: number
  message: string
}) {
  const { data: result, error } = await supabase
    .from('user_submissions')
    .insert({
      name: data.name,
      message: data.message,
      attendance: data.attendance,
      guest_count: data.guest_count,
    })
    .select()

  if (error) {
    console.error('Error submitting RSVP:', error)
    throw error
  }

  return result
}

// Submit standalone wish
export async function submitWish(data: {
  name: string
  message: string
}) {
  const { data: result, error } = await supabase
    .from('user_submissions')
    .insert({
      name: data.name,
      message: data.message,
      attendance: null,
      guest_count: null,
    })
    .select()

  if (error) {
    console.error('Error submitting wish:', error)
    throw error
  }

  return result
}

// Get all wishes for display (from both RSVP and standalone)
export async function getWishes() {
  const { data, error } = await supabase
    .from('user_submissions')
    .select('name, message, created_at')
    .not('message', 'is', null)
    .neq('message', '')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching wishes:', error)
    throw error
  }

  return data
}

// Get RSVP responses for admin/analytics
export async function getRSVPResponses() {
  const { data, error } = await supabase
    .from('user_submissions')
    .select('*')
    .not('attendance', 'is', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching RSVP responses:', error)
    throw error
  }

  return data
}
