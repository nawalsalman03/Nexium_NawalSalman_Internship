import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/utils/supabase/types' // Adjust if needed

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const body = await req.json()
  const { email, job_title, summary, score } = body

  try {
    // Find the job record by email + title
    const { data, error: findError } = await supabase
      .from('job_results')
      .select('id')
      .eq('email', email)
      .eq('job_title', job_title)
      .order('created_at', { ascending: false }) // Just in case multiple exist
      .limit(1)

    const jobId = data?.[0]?.id
    if (!jobId) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    const { error: updateError } = await supabase
      .from('job_results')
      .update({
        result: summary,
        score,
        status: 'done',
      })
      .eq('id', jobId)

    if (updateError) {
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
