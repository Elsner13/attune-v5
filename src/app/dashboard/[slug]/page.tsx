// src/app/dashboard/[slug]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getModule } from "@/lib/modules";
import ModuleProgress from "./ModuleProgress";
import ModuleContent from "./content";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const user = await currentUser();
  const completedModules = (user?.publicMetadata?.completedModules as string[] | undefined) ?? [];

  return (
    <main className="text-white min-h-screen flex flex-col">

      {/* NAV */}
      <nav className="px-[clamp(1.75rem,6vw,5rem)] py-5 flex items-center justify-between border-b border-white/[0.08] shrink-0 bg-black/30 backdrop-blur-2xl">
        <Link href="/dashboard" className="opacity-70 hover:opacity-100 transition-opacity">
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={32}
            height={32}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </Link>
        <div className="flex items-center gap-5">
          <p
            className="hidden sm:block text-[10px] tracking-[0.2em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Foundations
          </p>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 32, height: 32 } },
            }}
          />
        </div>
      </nav>

      {/* TWO-COLUMN BODY */}
      <ModuleProgress currentSlug={slug} initialCompleted={completedModules}>

        {/* Lesson header */}
        <div className="mb-10">
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Module {mod.slug}
          </p>
          <h1
            className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.0] tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {mod.title}
          </h1>
          <p
            className="text-[11px] tracking-[0.15em] uppercase text-white/20"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {mod.duration}
          </p>
        </div>

        <hr className="border-white/[0.06] mb-10" />

        {/* Lesson content */}
        <article className="relative w-full border border-white/[0.08] bg-[#111110] px-5 sm:px-10 py-10 sm:py-12 overflow-hidden">
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
          <div className="relative z-10">
            <ModuleContent slug={slug} sections={mod.sections} />
          </div>
        </article>

      </ModuleProgress>

    </main>
  );
}
