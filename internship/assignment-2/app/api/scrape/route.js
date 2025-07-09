import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    title: "How to Learn JavaScript Fast",
    text: "JavaScript is a versatile programming language used on the web. It allows developers to build dynamic and interactive web applications easily. With libraries and frameworks, building becomes faster.",
  });
}
