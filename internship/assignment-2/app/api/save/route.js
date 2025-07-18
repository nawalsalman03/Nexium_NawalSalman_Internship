import { NextResponse } from "next/server";
import { createClientInstance } from "@/utils/supabase/server";

export async function POST(req) {
  const supabase = createClientInstance();
  const body = await req.json();

  const { url, summary, title } = body;

  if (!url || !summary || !title) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("summaries").insert([
    {
      url,
      summary,
      title,
    },
  ]);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
