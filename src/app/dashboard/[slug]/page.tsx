// src/app/dashboard/[slug]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getModule } from "@/lib/modules";
import ModuleProgress from "./ModuleProgress";
import ModuleContent from "./content";

interface Props {
  params: Promise<{ slug: string }>;
}

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const user = await currentUser();
  const completedModules = (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];

  return (
    <main
      className="text-white min-h-screen"
      style={{ maxWidth: "660px", margin: "0 auto", padding: "clamp(2rem,6vw,3.5rem) 1.5rem clamp(4rem,10vw,6rem)" }}
    >

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "clamp(3rem,8vw,5rem)",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            ...mono,
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          ← All Modules
        </Link>
        <UserButton appearance={{ elements: { avatarBox: { width: 28, height: 28 } } }} />
      </nav>

      {/* Module header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ ...mono, fontSize: "0.575rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1rem" }}>
          Module {mod.slug}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(1.875rem,4vw,3rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: "0.5rem",
          }}
        >
          {mod.title}
        </h1>
        <p style={{ ...mono, fontSize: "0.575rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          {mod.duration}
        </p>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "2.5rem" }} />

      {/* Content + progress/nav */}
      <ModuleProgress currentSlug={slug} initialCompleted={completedModules}>
        <article>
          <ModuleContent slug={slug} sections={mod.sections} />
        </article>
      </ModuleProgress>

    </main>
  );
}
