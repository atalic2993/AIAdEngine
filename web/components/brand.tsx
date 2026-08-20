import Image from "next/image";
import Link from "next/link";

export const TAGLINE = "Smarter ads. Bigger results.";

/** The logo badge. The artwork carries its own navy ground, so it sits on a plate. */
export function LogoMark({
  size = 36,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-mark-128.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      aria-hidden="true"
      className={`shrink-0 rounded-[9px] ring-1 ring-line-strong ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** AI in electric blue, AD ENGINE in chrome, the way the logo sets it. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`display uppercase tracking-[0.07em] ${className}`}
      translate="no"
    >
      <span className="text-brand-2">AI</span>{" "}
      <span className="chrome-text">Ad Engine</span>
    </span>
  );
}

export function LogoLockup({
  href = "/",
  size = 36,
  className = "",
  priority = false,
}: {
  href?: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="AI Ad Engine home"
    >
      <LogoMark size={size} priority={priority} />
      <Wordmark className="text-[15px]" />
    </Link>
  );
}

/** Small glyph for feature rows, echoing the bolt inside the logo. */
export function BoltMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M13.6 2 4.8 13.4h5.3L9.9 22l9-11.6h-5.4L13.6 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
