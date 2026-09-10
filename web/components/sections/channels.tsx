import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";
import { LogoMark, TAGLINE } from "@/components/brand";

const CHANNELS = [
  {
    name: "Facebook",
    Mark: FacebookMark,
    tint: "text-[#0866FF]",
    note: "Feed, Reels, Stories",
    href: "/facebook-ads-south-africa",
  },
  {
    name: "Instagram",
    Mark: InstagramMark,
    tint: "",
    note: "Feed, Reels, Stories",
    // Meta runs both from one system, so both lead to the same explainer.
    href: "/facebook-ads-south-africa",
  },
  {
    name: "Google",
    Mark: GoogleMark,
    tint: "",
    note: "Search, Display, YouTube",
    href: "/google-ads-south-africa",
  },
  {
    name: "TikTok",
    Mark: TikTokMark,
    tint: "text-ink",
    note: "In-feed video",
    href: "/tiktok-ads-south-africa",
  },
];

/**
 * Signature element: four channel rails feeding one engine.
 * The rails are the product in one picture, so they get the boldness budget.
 */
export function Channels() {
  return (
    <Section id="platform" className="border-b border-line">
      <Container>
        <h2 className="display max-w-3xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          One platform.
          <span className="block text-muted-2">Four major advertising channels.</span>
        </h2>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_140px_minmax(0,0.9fr)]">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {CHANNELS.map((channel) => (
              <li key={channel.name}>
                <Link
                  href={channel.href}
                  className="group flex min-h-[44px] items-center gap-3 rounded-card border border-line bg-navy-2/70 p-4 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-navy/45">
                    <channel.Mark className={`size-5 ${channel.tint}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold" translate="no">
                      {channel.name}
                    </span>
                    <span className="block truncate text-xs text-muted-2">{channel.note}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-muted-2 transition-colors group-hover:text-brand-2"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Rails: drawn on wide screens, replaced by a plain arrow on mobile. */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 140 320" preserveAspectRatio="none" className="size-full" fill="none">
              <defs>
                <linearGradient id="rail" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#0b84f6" stopOpacity="0.15" />
                  <stop offset="1" stopColor="#23b4e3" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {[40, 120, 200, 280].map((y, index) => (
                <path
                  key={y}
                  d={`M0 ${y} H48 Q84 ${y} 88 160 H140`}
                  stroke="url(#rail)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  className="motion-safe:animate-[dash_2.4s_linear_infinite]"
                  style={{ animationDelay: `${index * 0.18}s` }}
                />
              ))}
            </svg>
          </div>

          <div className="flex items-center gap-4 self-center rounded-card border border-brand/35 bg-brand-soft p-5">
            <LogoMark size={52} />
            <div className="min-w-0">
              <p className="display text-sm uppercase tracking-[0.06em] text-brand-2" translate="no">
                AI Ad Engine
              </p>
              <p className="mt-1 text-sm text-muted">
                One login connects your campaigns, performance and leads, so you can see the next step.
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                {TAGLINE}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
