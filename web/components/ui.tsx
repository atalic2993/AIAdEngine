import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  size?: "md" | "lg";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-150 touch-manipulation active:translate-y-px";
  const sizing = size === "lg" ? "min-h-[52px] px-6 text-[15px]" : "min-h-[44px] px-5 text-sm";
  const styles =
    variant === "primary"
      ? "bg-brand text-navy shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_30px_-12px_rgba(11,132,246,0.8)] hover:bg-[#2f97ff]"
      : "border border-line-strong bg-white/[0.03] text-ink hover:border-white/30 hover:bg-white/[0.07]";
  return (
    <Link href={href} className={`${base} ${sizing} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-4 shrink-0 ${className}`}
      fill="none"
    >
      <path
        d="M3 8.4 6.2 11.6 13 4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-4 shrink-0 ${className}`}
      fill="none"
    >
      <path
        d="M4.2 4.2l7.6 7.6M11.8 4.2l-7.6 7.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-navy-2/70 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_60px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Honest caption for interface visuals until real screenshots land. */
export function VisualNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-xs text-muted-2">{children}</p>;
}
