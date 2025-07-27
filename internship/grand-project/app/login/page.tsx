'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function TestPage() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      console.error(error.message)
    } else {
      alert('Check your email for the magic link.')
    }
  }

  if (session) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Welcome, {session.user.email}!</h1>
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin} className="p-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        className="border px-4 py-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Magic Link
      </button>
    </form>
  )
}
