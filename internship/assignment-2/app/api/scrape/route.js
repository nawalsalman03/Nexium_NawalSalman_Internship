import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    
await new Promise((r) => setTimeout(r, 5000));

const title = await page.title();

const paragraphs = await page.$$eval("p, div, article", (els) =>
  els
    .map((el) => el.innerText.trim())
    .filter((text) => text.length > 50)
    .slice(0, 5)
);

const text = paragraphs.join(" ").replace(/\s+/g, " ").trim();


    return NextResponse.json({
      title: title || "No title",
      text: text || "",
    });

  } catch (err) {
    console.warn("⚠️ Puppeteer scraping failed:", err.message);
    return NextResponse.json({
      title: "Static Fallback Title",
      text:
        "JavaScript is a versatile programming language used on the web. It allows developers to build dynamic and interactive web applications easily.",
    });
  } finally {
    if (browser) await browser.close();
  }
}
