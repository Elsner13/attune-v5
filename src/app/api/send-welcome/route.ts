// src/app/api/send-welcome/route.ts
// Called once on first dashboard visit to trigger the welcome email in MailerLite.
// Idempotent: sets publicMetadata.welcomeEmailSent so it only fires once per student.

import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { mailerTag } from "@/lib/mailer";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const meta = (user.publicMetadata ?? {}) as Record<string, unknown>;

  // Already sent — do nothing
  if (meta.welcomeEmailSent) {
    return NextResponse.json({ ok: true });
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (email) {
    await mailerTag(email, "welcome", user.firstName ?? undefined);
  }

  // Mark as sent so this never fires twice
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { ...meta, welcomeEmailSent: true },
  });

  return NextResponse.json({ ok: true });
}
