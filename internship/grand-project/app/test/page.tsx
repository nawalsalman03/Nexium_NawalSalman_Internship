"use client";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TestPage() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [entry, setEntry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      console.error(error.message);
    } else {
      alert("Check your email for the magic link.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleSubmitJob = async () => {
    setStatus("Submitting to AI...");
    setAiResponse("");

    const res = await fetch("/api/submit-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobTitle, skills, entry, location }),
    });

    const result = await res.json();

    if (result.success && result.generated) {
      setAiResponse(result.generated);
      setStatus("✅ AI result generated and saved.");
      setJobTitle("");
      setSkills("");
      setEntry("");
      setExperienceLevel("Entry");
      setLocation("");
    } else if (result.success) {
      setStatus("✅ Job submitted, but no AI result returned.");
    } else {
      setStatus(`❌ Error: ${result.error || result.message || "Unknown error"}`);
    }
  };

  if (session) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Welcome, {session.user.email}!</h1>
          <Button variant="destructive" onClick={handleLogout} size="sm">
            Logout
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <Textarea
              placeholder="Skills (e.g., React, Node.js, SQL)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={3}
            />

            <div>
              <Label>Entry (experience/goals)</Label>
              <Textarea
                placeholder="Tell us about your background, experience, or goals"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Button className="w-full" onClick={handleSubmitJob}>
              Submit to AI
            </Button>

            {status && <p className="text-sm text-muted-foreground">{status}</p>}

            {aiResponse && (
              <div className="bg-muted p-4 rounded text-sm whitespace-pre-wrap border">
                {aiResponse}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 space-y-4">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <Button type="submit" className="w-full">
        Send Magic Link
      </Button>
    </form>
  );
}

