"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { translateToUrdu } from "@/lib/translate";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    setSummary(null);
    setSaved(false);
    setError("");
    setLoading(true);

    if (!url || !url.startsWith("http")) {
      setError("❌ Please enter a valid blog URL.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to fetch blog data");
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Response was not valid JSON");
      }

      if (!data.text || !data.title) {
        setError("❌ Blog scraping failed. Try another URL.");
        setLoading(false);
        return;
      }

      const fakeSummary = data.text.split(".").slice(0, 2).join(".") + ".";
      const translated = translateToUrdu(fakeSummary);

      setSummary({
        title: data.title,
        english: fakeSummary,
        urdu: translated,
      });

      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          title: data.title,
          summary: fakeSummary,
        }),
      });

      setSaved(true);
    } catch (err) {
      setError("❌ Unexpected error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/bgvid.mp4" type="video/mp4" />
      </video>

      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">
            📰 Blog Summariser
          </h1>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter blog URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-black"
            />
            <Button onClick={handleSummarise} disabled={loading}>
              {loading ? "Loading..." : "Summarise & Translate"}
            </Button>

            {error && <p className="text-red-300 font-medium">{error}</p>}

            {summary && (
              <div className="bg-white/30 backdrop-blur p-4 rounded-lg mt-4 text-white">
                <h2 className="text-xl font-semibold">{summary.title}</h2>
                <p className="mt-2">
                  <strong>English:</strong> {summary.english}
                </p>
                <p className="mt-2">
                  <strong>Urdu:</strong> {summary.urdu}
                </p>
                {saved && (
                  <p className="text-green-300 mt-2">
                    ✅ Saved to Supabase!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
