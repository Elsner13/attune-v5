"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  const divRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use native DOM listeners instead of React synthetic events.
  // framer-motion's animate={{ width }} forces layout reflow every frame,
  // which causes React's synthetic onMouseLeave to misfire mid-animation.
  // Native mouseenter/mouseleave are not affected by layout changes.
  React.useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const onEnter = () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setOpen(true);
    };

    const onLeave = () => {
      closeTimer.current = setTimeout(() => {
        closeTimer.current = null;
        setOpen(false);
      }, 300);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [setOpen]);

  return (
    <motion.div
      ref={divRef}
      className={cn(
        "h-full px-3 py-6 hidden md:flex md:flex-col",
        "bg-transparent border-r border-white/[0.09]",
        "flex-shrink-0 overflow-hidden",
        className
      )}
      animate={{
        width: animate ? (open ? "240px" : "56px") : "240px",
      }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-12 px-4 flex md:hidden items-center justify-between",
          "bg-transparent border-b border-white/[0.09] w-full"
        )}
        {...props}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase text-white/30"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Foundations
        </span>
        <Menu
          className="text-white/50 cursor-pointer hover:text-white/80 transition-colors"
          size={18}
          onClick={() => setOpen(!open)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn(
              "fixed h-full w-72 inset-y-0 left-0 z-[100] flex flex-col md:hidden",
              "bg-[#0A0A0A] border-r border-white/[0.09] p-6",
              className
            )}
          >
            <button
              className="absolute right-4 top-4 text-white/40 hover:text-white/80 transition-colors"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 group/sidebar py-2 rounded-md px-2",
        "hover:bg-white/[0.04] transition-colors duration-150",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.15 }}
        className="text-white/60 text-[12px] group-hover/sidebar:text-white/90 transition-colors whitespace-pre !p-0 !m-0"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
