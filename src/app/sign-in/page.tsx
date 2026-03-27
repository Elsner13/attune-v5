"use client";

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

const CHECKOUT_URL = "https://buy.stripe.com/3cIcN5fCp1CR0qz2RBefC04";

export default function SignInPage() {
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
            Returning member
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
            Welcome back.
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
            Sign in to continue your practice.
          </p>
        </div>

        {/* Clerk SignIn */}
        <SignIn
          fallbackRedirectUrl="/dashboard"
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

        <div
          style={{
            marginTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "1.5rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)" }}>
            New here?{" "}
            <a
              href={CHECKOUT_URL}
              style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              Get Foundations →
            </a>
          </p>
        </div>

        <Link
          href="/"
          style={{
            marginTop: "1.25rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
        >
          ← Back to Attune
        </Link>
      </div>
    </main>
  );
}
