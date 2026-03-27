// src/lib/kit.ts
// Kit (ConvertKit) email automation helper.
//
// SETUP:
//   1. Go to kit.com → Settings → Developer → API Key (public key)
//   2. Add KIT_API_KEY to .env.local and Vercel environment variables
//   3. In Kit, create tags for each trigger below, then fill in the tag IDs.
//      Tag IDs appear in the URL when you click a tag: /tags/1234567/edit
//
// AUTOMATIONS (create one per tag in Kit):
//   Tag applied → send corresponding email

const KIT_API_KEY = process.env.KIT_API_KEY;

export const KIT_TAGS: Record<string, string> = {
  welcome: "17765641", // Email 00 — fires on first dashboard visit
  "01":    "17765642", // Email 01 — fires when Module 01 is marked complete
  "02":    "17765644", // Email 02
  "03":    "17766224", // Email 03
  "04":    "17766225", // Email 04
  "05":    "17766226", // Email 05
  "06":    "17766228", // Email 06
  "07":    "17766230", // Email 07
  "08":    "17766231", // Email 08 — completion email
};

/**
 * Tags a subscriber in Kit, which triggers the corresponding automation.
 * Silently no-ops if the API key or tag ID isn't configured yet.
 */
export async function kitTag(
  email: string,
  tagKey: string,
  firstName?: string,
): Promise<void> {
  const tagId = KIT_TAGS[tagKey];
  if (!KIT_API_KEY || !tagId || tagId === "FILL_IN") return;

  try {
    await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email,
        first_name: firstName ?? "",
      }),
    });
  } catch {
    // Non-fatal — don't break the user experience if Kit is down
  }
}
