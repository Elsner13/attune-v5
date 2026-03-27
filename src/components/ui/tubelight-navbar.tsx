"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  external?: boolean
  cta?: boolean
}

interface TubelightNavBarProps {
  items: NavItem[]
  defaultActive?: string
  className?: string
}

export function TubelightNavBar({ items, defaultActive, className }: TubelightNavBarProps) {
  const [activeTab, setActiveTab] = useState(defaultActive ?? items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={cn("fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4 pointer-events-none", className)}>
      <div
        className="pointer-events-auto flex items-center gap-1 border border-white/[0.10] py-1.5 px-2 rounded-full shadow-[0_4px_32px_rgba(0,0,0,0.55)]"
        style={{ background: "rgba(14,12,10,0.92)", backdropFilter: "blur(16px)" }}
      >
        {/* Logo */}
        <Link href="/" className="px-2.5 py-1 opacity-60 hover:opacity-100 transition-opacity">
          <Image
            src="/attune-logo.png"
            alt="Attune"
            width={20}
            height={20}
            style={{ filter: "invert(1)", objectFit: "contain" }}
          />
        </Link>

        {/* Divider */}
        <div className="w-px h-3.5 bg-white/[0.12] mx-0.5 shrink-0" />

        {/* Nav items */}
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          if (item.cta) {
            return (
              <a
                key={item.name}
                href={item.url}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="relative cursor-pointer text-[10px] font-semibold px-4 py-1.5 rounded-full transition-colors ml-0.5 shrink-0"
                style={{ background: "var(--crimson)", color: "#0A0907", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--crimson-bright)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--crimson)")}
              >
                <span className="hidden md:inline uppercase">{item.name}</span>
                <span className="md:hidden"><Icon size={15} strokeWidth={2.5} /></span>
              </a>
            )
          }

          return (
            <a
              key={item.name}
              href={item.url}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-[10px] font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 uppercase tracking-[0.08em]",
                isActive ? "text-white/90" : "text-white/40 hover:text-white/70",
              )}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden"><Icon size={15} strokeWidth={2.5} /></span>

              {isActive && (
                <motion.div
                  layoutId="attune-lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: "rgba(225,29,72,0.08)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* The lamp — crimson bar + glow above active tab */}
                  <div
                    className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-7 h-[2px] rounded-t-full"
                    style={{ background: "var(--crimson)" }}
                  >
                    <div
                      className="absolute w-12 h-5 rounded-full blur-md -top-2 -left-2.5"
                      style={{ background: "rgba(225,29,72,0.22)" }}
                    />
                    <div
                      className="absolute w-7 h-4 rounded-full blur-md -top-1"
                      style={{ background: "rgba(225,29,72,0.18)" }}
                    />
                    <div
                      className="absolute w-4 h-3 rounded-full blur-sm top-0 left-1.5"
                      style={{ background: "rgba(225,29,72,0.14)" }}
                    />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
