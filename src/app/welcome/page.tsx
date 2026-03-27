"use client";

import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { SparklesCore } from "@/components/ui/sparkles";

export default function WelcomePage() {
  return (
    <main className="text-white min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="welcome-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          particleColor="#ffffff"
          speed={0.6}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full">

      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/attune-logo.png"
          alt="Attune"
          width={56}
          height={56}
          style={{ filter: "invert(1)", objectFit: "contain" }}
          priority
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-12 max-w-lg">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Purchase confirmed
        </p>
        <h1
          className="text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.02em] text-white mb-5"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          You&apos;re in.<br />
          <em style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            Now create your account.
          </em>
        </h1>
        <p className="text-[15px] text-white/45 leading-[1.8]">
          Your account gives you permanent access to Foundations — all 8 modules, all future updates, and everything that compounds from here.
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
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "none",
              background: "#111110",
            },
            headerTitle: {
              display: "none",
            },
            headerSubtitle: {
              display: "none",
            },
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
            footerActionLink: {
              color: "rgba(255,255,255,0.5)",
            },
            identityPreviewText: {
              color: "rgba(255,255,255,0.7)",
            },
            formFieldInput: {
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0px",
            },
          },
        }}
      />

      {/* Reassurance */}
      <p
        className="mt-10 text-[11px] text-white/20 tracking-[0.12em] uppercase text-center max-w-xs"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Your purchase is confirmed. This account unlocks your course access.
      </p>
      </div>
    </main>
  );
}
