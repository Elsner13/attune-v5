// src/lib/mailer.ts
// MailerLite email automation helper.
//
// SETUP:
//   1. app.mailerlite.com → Integrations → API → Generate new token
//   2. Add MAILERLITE_API_KEY to .env.local and Vercel environment variables
//   3. In MailerLite, create one Group per trigger below, then fill in the group IDs.
//      Group IDs appear in the URL when you open a group: /subscribers/groups/1234567890
//
// AUTOMATIONS (create one per group in MailerLite):
//   Trigger: "Subscriber joins a group" → select group → action: send email

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

// Fill these in after creating groups in MailerLite
export const ML_GROUPS: Record<string, string> = {
  welcome: "182658360735172124", // Email 00 — fires on first dashboard visit
  "01":    "182658388186891718", // Email 01 — fires when Module 01 is marked complete
  "02":    "182658398182966647", // Email 02
  "03":    "182658407294044109", // Email 03
  "04":    "182658416289776736", // Email 04
  "05":    "182658717498476445", // Email 05
  "06":    "182658727465190450", // Email 06
  "07":    "182658737306076467", // Email 07
  "08":    "182658745616041400", // Email 08 — completion email
};

/**
 * Adds a subscriber to a MailerLite group, which triggers the corresponding automation.
 * Silently no-ops if the API key or group ID isn't configured yet.
 * If the subscriber already exists, MailerLite adds them to the group without duplication.
 */
export async function mailerTag(
  email: string,
  groupKey: string,
  firstName?: string,
): Promise<void> {
  const groupId = ML_GROUPS[groupKey];
  if (!MAILERLITE_API_KEY || !groupId || groupId === "FILL_IN") return;

  try {
    await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName ?? "" },
        groups: [groupId],
      }),
    });
  } catch {
    // Non-fatal — don't break the user experience if MailerLite is down
  }
}
