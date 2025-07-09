"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  const [saved, setSaved] = useState(false);  //saved success msg


  const handleSummarise = async () => {
  const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
  const data = await res.json();

  if (!data.text) {
    setSummary("⚠️ Failed to fetch blog content. Please check the URL.");
    return; 
  }

  console.log("🔍 Extracted:", data);

  const fakeSummary = data.text.split(".").slice(0, 2).join(".") + ".";
  setSummary(fakeSummary);

  await fetch("/api/save", {
  method: "POST",
  body: JSON.stringify({
    url,
    title: "Dummy title",
    summary: fakeSummary,
  }),
});

setSaved(true);



};



  return (
    <main className="min-h-screen p-8 flex flex-col gap-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">📝 Blog Summariser</h1>

      <Input
        type="url"
        placeholder="Paste blog URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={handleSummarise}>
        Summarise & Translate
      </Button>

      {summary && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-gray-800">
          <h2 className="font-semibold mb-2">Summary (Fake Urdu):</h2>
          <p>{summary}</p>

          {saved &&(
            <p className="text-green-600 font-semibold mt-2">
              Summary saved to supabase!
            </p>
          )}
       </div>
      )}
    </main>
  );
}
