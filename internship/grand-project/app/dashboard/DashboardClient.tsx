'use client';

import { Session } from '@supabase/auth-helpers-nextjs';

export default function DashboardClient({ session }: { session: Session }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {session.user.email}!</h1>

      <form action="/api/save-to-mongo" method="POST" className="mt-6">
        <input type="hidden" name="user_id" value={session.user.id} />
        <input type="hidden" name="job_title" value="Fake AI Job" />
        <input type="hidden" name="ai_summary" value="Smart result from our AI" />
        <input type="hidden" name="created_at" value={new Date().toISOString()} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Run Fake AI & Save to MongoDB
        </button>
      </form>
    </div>
  );
}
