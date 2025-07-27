// import { NextResponse } from 'next/server';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export async function POST(req: Request) {
//   const supabase = createRouteHandlerClient({ cookies }); // ✅ correct usage

//   const {
//     data: { user },
//     error: authError,
//   } = await supabase.auth.getUser();

//   if (authError || !user) {
//     return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
//   }

//   const { job_title } = await req.json();

//   const { error: insertError } = await supabase.from('job_results').insert([
//     {
//       user_id: user.id,
//       job_title,
//     },
//   ]);

//   if (insertError) {
//     return NextResponse.json({ success: false, message: insertError.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }
// import { NextResponse } from 'next/server';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export async function POST(req: Request) {
//   try {
//     const supabase = createRouteHandlerClient({ cookies }); // ✅ correct for app router

//     // 🔐 Check user session
//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();

//     if (authError || !user) {
//       console.error("❌ Auth error:", authError?.message || 'No user');
//       return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
//     }

//     // 🧠 Parse request body
//     const body = await req.json();

//     const { job_title } = body;

//     if (!job_title) {
//       return NextResponse.json(
//         { success: false, message: "Missing 'job_title' in request body" },
//         { status: 400 }
//       );
//     }

//     // 📤 Insert data
//     const { error: insertError } = await supabase.from('job_results').insert([
//       {
//         user_id: user.id,
//         job_title,
//       },
//     ]);

//     if (insertError) {
//       console.error("❌ Insert error:", insertError.message);
//       return NextResponse.json({ success: false, message: insertError.message }, { status: 500 });
//     }

//     return NextResponse.json({ success: true });

//   } catch (err: unknown) {
//   const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
//   console.error("🔥 Unexpected API error:", errorMessage);

//   return NextResponse.json(
//     { success: false, message: errorMessage },
//     { status: 500 }
//   );
// }
// }
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { job_title } = await req.json();

  // ✅ Ensure user exists in the 'users' table
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!existingUser) {
    const { error: userInsertError } = await supabase.from('users').insert([
      {
        id: user.id,
        email: user.email,
      },
    ]);
    if (userInsertError) {
      return NextResponse.json({ success: false, message: userInsertError.message }, { status: 500 });
    }
  }

  const { error: insertError } = await supabase.from('job_results').insert([
    {
      user_id: user.id,
      job_title,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ success: false, message: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
