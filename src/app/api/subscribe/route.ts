// src/app/api/subscribe/route.ts
// Subscribes a new Signal/Noise reader to the Kit welcome sequence.
// Called from the homepage inline form.

import { NextRequest, NextResponse } from "next/server";

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID;

export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error("KIT_API_KEY or KIT_FORM_ID not configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          first_name: firstName ?? "",
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("Kit API error:", body);
      return NextResponse.json({ error: "Subscription failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kit subscribe error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }
}
