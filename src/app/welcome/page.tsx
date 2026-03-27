"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function WelcomePage() {
  return (
    <main
      className="text-white min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: "var(--void)" }}
    >
      <div className="w-full flex flex-col items-center" style={{ maxWidth: "400px" }}>

        {/* Logo wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "1.375rem",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            marginBottom: "3rem",
          }}
        >
          Attune
        </Link>

        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              marginBottom: "1.25rem",
            }}
          >
            Purchase confirmed
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(2rem,5vw,3.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            You&apos;re in.
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
            Create your account to access Foundations — all 8 modules and all future updates.
          </p>
        </div>

        {/* Clerk SignUp */}
        <SignUp
          appearance={{
            variables: {
              colorBackground: "#111110",
              colorText: "#ffffff",
              colorTextSecondary: "rgba(255,255,255,0.45)",
              colorInputBackground: "#0A0A0A",
              colorInputText: "#ffffff",
              colorPrimary: "#ffffff",
              borderRadius: "0px",
              fontFamily: "var(--font-sans)",
            },
            elements: {
              card: {
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "none",
                background: "#111110",
              },
              headerTitle: { display: "none" },
              headerSubtitle: { display: "none" },
              formButtonPrimary: {
                background: "#ffffff",
                color: "#000000",
                fontWeight: "600",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "0px",
                "&:hover": { background: "rgba(255,255,255,0.85)" },
              },
              footerActionLink: { color: "rgba(255,255,255,0.5)" },
              identityPreviewText: { color: "rgba(255,255,255,0.7)" },
              formFieldInput: {
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0px",
              },
            },
          }}
        />

        <p
          style={{
            marginTop: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
            textAlign: "center",
          }}
        >
          Your purchase is confirmed. This account unlocks your course access.
        </p>
      </div>
    </main>
  );
}
