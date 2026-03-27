// src/app/api/complete-module/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { mailerTag } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const moduleNumber = body?.moduleNumber as string | undefined;
  if (!moduleNumber || typeof moduleNumber !== "string") {
    return NextResponse.json({ error: "Missing moduleNumber" }, { status: 400 });
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const existingMeta = (user.publicMetadata ?? {}) as Record<string, unknown>;
  const completed = (existingMeta.completedModules as string[] | undefined) ?? [];

  if (!completed.includes(moduleNumber)) {
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...existingMeta,
        completedModules: [...completed, moduleNumber],
      },
    });

    // Trigger module follow-up email via Kit tag
    const email = user.emailAddresses[0]?.emailAddress;
    if (email) {
      await mailerTag(email, moduleNumber, user.firstName ?? undefined);
    }
  }

  return NextResponse.json({ success: true });
}
