import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const { url, title, summary } = await req.json();

  const { data, error } = await supabase.from("summaries").insert([
    {
      url,
      title,
      summary,
    },
  ]);

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, data });
}
