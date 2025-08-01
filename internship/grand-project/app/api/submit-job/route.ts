

// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { type NextRequest, NextResponse } from 'next/server'
// import { type Database } from '@/utils/supabase/types'

// export async function POST(req: NextRequest) {
//   try {
//     const supabase = await createRouteHandlerClient<Database>({ cookies: () => cookies() })

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser()

//     if (userError || !user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await req.json()
//     const { jobTitle, skills, entry, location } = body

//     const { data, error: insertError } = await supabase.from('job_results').insert([
//       {
//         user_id: user.id,
//         job_title: jobTitle,
//         skills: skills,
//         entry: entry,
//         location: location,
//         status: 'pending',
//       },
//     ]).select('id') // we’ll need the ID to track the result later

//     if (insertError) {
//       console.error('Supabase insert error:', insertError)
//       return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 })
//     }

//     const jobId = data?.[0]?.id

//     return NextResponse.json({ success: true, jobId })
//   } catch (error) {
//     console.error('Unexpected error:', error)
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
//   }
// }


// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { type NextRequest, NextResponse } from 'next/server'
// import { type Database } from '@/utils/supabase/types'

// export async function POST(req: NextRequest) {
//   try {
//     // ✅ Fix cookies error here
//     const cookieStore = cookies()
//     const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser()

//     if (userError || !user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await req.json()
//     const { jobTitle, skills, entry, location } = body

//     const { data, error: insertError } = await supabase.from('job_results').insert([
//       {
//         user_id: user.id,
//         job_title: jobTitle,
//         skills,
//         entry,
//         location,
//         status: 'pending',
//         result:null,   //placeholder for AI
//       },
//     ]).select('id')

//     if (insertError) {
//       console.error('Supabase insert error:', insertError)
//       return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 })
//     }

//     const jobId = data?.[0]?.id
//     return NextResponse.json({ success: true, jobId })
//   } catch (error) {
//     console.error('Unexpected error:', error)
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
//   }
// }
//inputs correct above one*******
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { NextRequest, NextResponse } from 'next/server'
// import type { Database } from '@/utils/supabase/types'

// export async function POST(req: NextRequest) {
//   const supabase = createRouteHandlerClient<Database>({ cookies })
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const { jobTitle, entry } = await req.json()

//     // Save job input to Supabase
//     const { error: insertError } = await supabase.from('job_results').insert({
//       email: user.email,
//       job_title: jobTitle,
//       entry,
//       status: 'pending',
//     })

//     if (insertError) {
//       return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
//     }

//     // 🔁 Trigger n8n webhook
//     await fetch('https://n8n.nexintern.tech/webhook/process-job-ai', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: user.email,
//         job_title: jobTitle,
//         original_resume: entry,
//       }),
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
//   }
// }
import 'server-only';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { type Database } from '@/utils/supabase/types';

// ✅ Define expected response from n8n webhook
type AIWebhookResponse = {
  result?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    // 🟢 Use cookies correctly
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

    // 🧠 Authenticate user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 📥 Parse input
    const body = await req.json();
    const { jobTitle, skills, entry, location } = body;

    // 📝 Insert job input into Supabase
    const { data, error: insertError } = await supabase
      .from('job_results')
      .insert([
        {
          user_id: user.id,
          job_title: jobTitle,
          skills,
          entry,
          location,
          status: 'pending',
          result: null, // placeholder
        },
      ])
      .select('id');

    if (insertError || !data || !data[0]?.id) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }

    const jobId = data[0].id;

    // 🤖 Send data to n8n webhook
    const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobTitle,
        skills,
        entry,
      }),
    });

    // ✅ Type-safe + safe JSON parsing
    let aiData: AIWebhookResponse = {};
    try {
      aiData = (await webhookResponse.json()) as AIWebhookResponse;
    } catch (err) {
      console.error('Webhook response was not valid JSON:', err);
      return NextResponse.json({ error: 'Invalid response from AI service' }, { status: 500 });
    }

    // 💾 Update Supabase with AI result (if present)
    if (aiData?.result) {
      const { error: updateError } = await supabase
        .from('job_results')
        .update({ result: aiData.result, status: 'completed' })
        .eq('id', jobId);

      if (updateError) {
        console.error('Failed to update AI result:', updateError);
      }
    }

    // 🎉 Final response to frontend
    return NextResponse.json({
      success: true,
      jobId,
      generated: aiData?.result || null,
    });

  } catch (err) {
    console.error('Unexpected error in job summarizer:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
