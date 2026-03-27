"use client";

import type { ModuleSection } from "@/lib/modules";
import Module01 from "./module-01";
import Module02 from "./module-02";
import Module03 from "./module-03";
import Module04 from "./module-04";
import Module05 from "./module-05";
import Module06 from "./module-06";
import Module07 from "./module-07";
import Module08 from "./module-08";

/* ── Rich content registry — add new modules here as they're written ── */
const RICH_CONTENT: Record<string, React.ComponentType> = {
  "01": Module01,
  "02": Module02,
  "03": Module03,
  "04": Module04,
  "05": Module05,
  "06": Module06,
  "07": Module07,
  "08": Module08,
};

/* ── Fallback: plain text render for modules not yet written ────────── */
function PlainContent({ sections }: { sections: ModuleSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => {
        const isTheMove = section.heading === "The Move";
        if (isTheMove) {
          return (
            <div
              key={section.heading}
              className="border border-white/[0.14] bg-white/[0.04] px-7 py-6 mt-4"
            >
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                The Move
              </p>
              <div className="space-y-4">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-[16px] text-white/85 leading-[1.9]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          );
        }
        return (
          <section key={section.heading}>
            <p
              className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {section.heading}
            </p>
            <div className="space-y-5">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-[17px] text-white/80 leading-[1.85]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ── Router ─────────────────────────────────────────────────────────── */
export default function ModuleContent({
  slug,
  sections,
}: {
  slug: string;
  sections: ModuleSection[];
}) {
  const Component = RICH_CONTENT[slug];
  if (Component) return <Component />;
  return <PlainContent sections={sections} />;
}
