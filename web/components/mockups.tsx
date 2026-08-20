import type { ReactNode } from "react";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";

/* ---------------------------------------------------------------
   Interface visuals, drawn in code. Every number here is an example,
   captioned as such on the page, and swapped for real screenshots
   when they are supplied.
   --------------------------------------------------------------- */

export function ConsoleFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-card border border-line-strong bg-navy-2 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_40px_90px_-50px_rgba(0,0,0,1)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-navy-3/70 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto rounded-md bg-navy/45 px-3 py-1 font-mono text-[11px] text-muted-2">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function NavRail() {
  const items = ["Campaigns", "Channels", "AI Launcher", "Leads", "Pipeline", "Reporting"];
  return (
    <nav className="hidden w-[168px] shrink-0 border-r border-line bg-navy/45 p-3 min-[1400px]:block">
      <p className="eyebrow px-2 pb-2">Workspace</p>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={item}>
            <span
              className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] ${
                index === 0 ? "bg-brand-soft text-brand-2" : "text-muted"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${index === 0 ? "bg-brand" : "bg-white/20"}`}
              />
              {item}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-line bg-navy/45 px-2.5 py-3">
      <p className="eyebrow leading-tight" style={{ letterSpacing: "0.08em", fontSize: "10px" }}>
        {label}
      </p>
      <p className="tnum mt-1 whitespace-nowrap font-display text-[14px] leading-tight font-semibold md:text-[16px] lg:text-[14px] xl:text-[15px]">
        {value}
      </p>
      {sub ? <p className="tnum mt-0.5 truncate text-[11px] text-muted-2">{sub}</p> : null}
    </div>
  );
}

const CHANNEL_ROWS = [
  { name: "Facebook", Mark: FacebookMark, tint: "text-[#0866FF]", spend: "R 3 200", leads: "48", bar: 88 },
  { name: "Instagram", Mark: InstagramMark, tint: "", spend: "R 2 450", leads: "31", bar: 64 },
  { name: "Google", Mark: GoogleMark, tint: "", spend: "R 4 100", leads: "57", bar: 100 },
  { name: "TikTok", Mark: TikTokMark, tint: "text-ink", spend: "R 1 150", leads: "12", bar: 32 },
];

/** Hero visual: the whole engine on one screen. */
export function HeroConsole() {
  return (
    <ConsoleFrame title="app.aiadengine.co.za / campaigns">
      <div className="flex">
        <NavRail />
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Live campaign</p>
              <p className="mt-1 font-display text-lg font-semibold">Winter Promo — Leads</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-navy/45 px-3 py-1.5 text-[11px] text-muted">
              <span className="size-1.5 rounded-full bg-brand" />
              Running on 4 channels
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Stat label="Spend" value="R 10 900" sub="30 days" />
            <Stat label="Leads" value="148" sub="+22 wk" />
            <Stat label="Cost / lead" value="R 73" sub="Down 18%" />
            <Stat label="Top channel" value="Google" sub="57 leads" />
          </div>

          <div className="mt-4 rounded-xl border border-line bg-navy/45 p-3">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Channel performance</p>
              <p className="eyebrow">Leads</p>
            </div>
            <ul className="mt-3 space-y-2.5">
              {CHANNEL_ROWS.map((row) => (
                <li key={row.name} className="flex items-center gap-3">
                  <row.Mark className={`size-4 shrink-0 ${row.tint}`} />
                  <span className="w-[68px] shrink-0 truncate text-[12px] text-muted">
                    {row.name}
                  </span>
                  <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                      style={{ width: `${row.bar}%` }}
                    />
                  </span>
                  <span className="tnum hidden w-[54px] shrink-0 text-right font-mono text-[11px] text-muted-2 sm:block">
                    {row.spend}
                  </span>
                  <span className="tnum w-[26px] shrink-0 text-right font-mono text-[12px]">
                    {row.leads}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ConsoleFrame>
  );
}


/** Phone version of the hero console: same story, far less height. */
export function HeroConsoleCompact() {
  return (
    <ConsoleFrame title="app.aiadengine.co.za" className="hero-compact">
      <div className="p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-[13px] font-semibold">Winter Promo — Leads</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-[10px] text-muted">
            <span className="size-1.5 rounded-full bg-brand" />
            4 channels
          </span>
        </div>

        <div className="hero-compact-stats mt-2 grid grid-cols-2 gap-1.5">
          <Stat label="Spend" value="R 10 900" />
          <Stat label="Leads" value="148" />
          <Stat label="Cost / lead" value="R 73" />
          <Stat label="Top channel" value="Google" />
        </div>

        <ul className="hero-compact-channels mt-2 flex items-center justify-between gap-2 rounded-xl border border-line bg-navy/45 px-3 py-2">
          {CHANNEL_ROWS.map((row) => (
            <li key={row.name} className="flex items-center gap-1.5">
              <row.Mark className={`size-3.5 shrink-0 ${row.tint}`} />
              <span className="tnum font-mono text-[11px] text-muted">{row.leads}</span>
            </li>
          ))}
          <li className="eyebrow" style={{ fontSize: "9px" }}>
            Leads
          </li>
        </ul>
      </div>
    </ConsoleFrame>
  );
}

/** Campaign creation. */
export function CampaignBuilder() {
  return (
    <ConsoleFrame title="app.aiadengine.co.za / campaigns / new">
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <div>
            <p className="eyebrow">Step 1 — What do you want?</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Leads", "Sales", "Traffic"].map((goal, index) => (
                <span
                  key={goal}
                  className={`rounded-lg border px-3 py-2 text-center text-[12px] ${
                    index === 0
                      ? "border-brand/60 bg-brand-soft text-brand-2"
                      : "border-line bg-navy/45 text-muted"
                  }`}
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Daily budget</p>
            <div className="mt-2 flex items-center gap-3 rounded-lg border border-line bg-navy/45 px-3 py-2.5">
              <span className="tnum font-display text-lg font-semibold">R 250</span>
              <span className="h-1 flex-1 rounded-full bg-white/10">
                <span className="block h-full w-[38%] rounded-full bg-brand" />
              </span>
              <span className="font-mono text-[11px] text-muted-2">per day</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Where</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Johannesburg", "Pretoria", "+25 km"].map((place) => (
                <span
                  key={place}
                  className="rounded-full border border-line bg-navy/45 px-3 py-1.5 text-[12px] text-muted"
                >
                  {place}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-navy/45 p-3">
          <p className="eyebrow">Ad preview</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-line">
            <div className="flex items-center gap-2 bg-navy-3/80 px-3 py-2">
              <span className="grid size-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-navy">
                A
              </span>
              <span className="text-[11px] text-muted">Your business · Sponsored</span>
            </div>
            <div className="h-20 bg-[linear-gradient(120deg,rgba(11,132,246,0.25),rgba(35,180,227,0.08))]" />
            <div className="space-y-1 bg-navy-3/60 px-3 py-2.5">
              <p className="text-[12px] font-semibold">Fully booked by Friday? Not this month.</p>
              <p className="text-[11px] text-muted">
                Get a quote in 60 seconds. No call-back queue.
              </p>
              <span className="mt-1 inline-block rounded bg-white/10 px-2 py-1 text-[10px]">
                Get quote
              </span>
            </div>
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-2">Written with AI · 6 variations</p>
        </div>
      </div>
    </ConsoleFrame>
  );
}

/** Channel connection board. */
export function ChannelBoard() {
  const rows = [
    { name: "Facebook", Mark: FacebookMark, tint: "text-[#0866FF]", status: "Connected" },
    { name: "Instagram", Mark: InstagramMark, tint: "", status: "Connected" },
    { name: "Google", Mark: GoogleMark, tint: "", status: "Connected" },
    { name: "TikTok", Mark: TikTokMark, tint: "text-ink", status: "Connect" },
  ];
  return (
    <ConsoleFrame title="app.aiadengine.co.za / channels">
      <div className="grid gap-2 p-4 sm:grid-cols-2 sm:p-5">
        {rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-navy/45 p-3"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.05]">
              <row.Mark className={`size-4 ${row.tint}`} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px]">{row.name}</span>
              <span className="block font-mono text-[10px] text-muted-2">Ad account</span>
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] ${
                row.status === "Connected"
                  ? "bg-brand-soft text-brand-2"
                  : "border border-line-strong text-muted"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </ConsoleFrame>
  );
}

/** AI writing panel. */
export function AIPanel() {
  return (
    <ConsoleFrame title="app.aiadengine.co.za / ai-launcher">
      <div className="p-4 sm:p-5">
        <p className="eyebrow">Tell it about your business</p>
        <div className="mt-2 rounded-xl border border-line bg-navy/45 p-3 text-[12px] text-muted">
          “We install solar geysers in Centurion. Free site visit, 5-year warranty, finance
          available.”
        </div>
        <p className="eyebrow mt-4">AI wrote 3 versions</p>
        <ul className="mt-2 space-y-2">
          {[
            "Load shedding killed your hot water? Solar geysers installed in one day.",
            "Free solar geyser site visit in Centurion. 5-year warranty.",
            "Hot water that does not depend on Eskom. Finance from R499 a month.",
          ].map((line, index) => (
            <li
              key={line}
              className={`flex items-start gap-3 rounded-xl border p-3 text-[12px] ${
                index === 0 ? "border-brand/50 bg-brand-soft" : "border-line bg-navy/45"
              }`}
            >
              <span className="mt-0.5 font-mono text-[10px] text-muted-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={index === 0 ? "text-ink" : "text-muted"}>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </ConsoleFrame>
  );
}

/** Reporting. */
export function ReportingBoard() {
  const bars = [38, 52, 44, 61, 74, 69, 88, 95];
  return (
    <ConsoleFrame title="app.aiadengine.co.za / reporting">
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Spend" value="R 10 900" />
          <Stat label="Leads" value="148" />
          <Stat label="Cost / lead" value="R 73" />
          <Stat label="Booked jobs" value="26" />
        </div>
        <div className="mt-4 rounded-xl border border-line bg-navy/45 p-3">
          <p className="eyebrow">Leads per week</p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {bars.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand/35 to-brand"
              />
            ))}
          </div>
        </div>
        <ul className="mt-3 divide-y divide-white/[0.06] rounded-xl border border-line bg-navy/45 text-[12px]">
          {[
            ["Winter Promo — Leads", "R 4 100", "57 leads"],
            ["Retargeting — Website", "R 2 450", "31 leads"],
            ["Search — Solar geyser", "R 3 200", "48 leads"],
          ].map(([name, spend, leads]) => (
            <li key={name} className="flex items-center gap-3 px-3 py-2.5">
              <span className="min-w-0 flex-1 truncate">{name}</span>
              <span className="tnum font-mono text-[11px] text-muted-2">{spend}</span>
              <span className="tnum w-[62px] text-right font-mono text-[11px]">{leads}</span>
            </li>
          ))}
        </ul>
      </div>
    </ConsoleFrame>
  );
}
