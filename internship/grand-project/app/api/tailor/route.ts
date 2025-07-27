// import { NextRequest, NextResponse } from "next/server";
// import { fakeAISummary } from "@/utils/fakeAI"; // ✅ adjust the path if needed

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { jobTitle } = body;

//     if (!jobTitle) {
//       return NextResponse.json({ error: "Missing job title" }, { status: 400 });
//     }

//     const result = await fakeAISummary(jobTitle);

//     return NextResponse.json({
//       success: true,
//       data: result,
//     });
//   } catch (err) {
//     console.error("Error in /api/tailor:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const POST = async (req: Request) => {
  const cookieStore = cookies(); // ✅ this is already synchronous and correct

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { job_title } = body;

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
};
