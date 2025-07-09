import fetch from "node-fetch";
import unfluff from "unfluff";

export async function extractBlogText(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const data = unfluff(html);

    return {
      title: data.title,
      text: data.text?.slice(0, 1500) || "No content found.",
    };
  } catch (err) {
    console.error("Scraping failed:", err);
    return { title: "", text: "" };
  }
}
