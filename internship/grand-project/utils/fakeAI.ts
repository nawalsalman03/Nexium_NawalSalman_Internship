export const fakeAISummary = async (jobTitle: string) => {
  // Simulate processing delay
  await new Promise((res) => setTimeout(res, 1000));
  return {
    summary: `This is a simulated AI summary for the role: ${jobTitle}`,
    confidence: "High",
    insights: [
      "Key skill: React",
      "Expected salary: $80K",
      "Remote preferred"
    ]
  };
};
