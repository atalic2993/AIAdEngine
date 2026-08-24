"use client";

import { useRef, useState } from "react";
import { Container, Section } from "@/components/ui";

export function VideoSlot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    videoRef.current?.play();
  }

  return (
    <Section id="demo" className="border-b border-line">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Walkthrough</p>
          <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
            See AI Ad Engine in action.
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            A screen recording of the platform, start to finish. Just under two minutes, with sound.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-navy-2">
            <video
              ref={videoRef}
              className="size-full object-contain"
              src="/demo.mp4"
              poster="/demo-poster.jpg"
              controls={started}
              playsInline
              preload="metadata"
              onPlay={() => setStarted(true)}
              aria-label="AI Ad Engine product walkthrough"
            />

            {started ? null : (
              <button
                type="button"
                onClick={start}
                className="absolute inset-0 grid place-items-center bg-navy/45 transition-colors duration-150 hover:bg-navy/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto grid size-16 place-items-center rounded-full border border-brand/40 bg-brand-soft backdrop-blur-sm"
                  >
                    <svg viewBox="0 0 24 24" className="size-6 text-brand" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                  <span className="mt-4 block text-sm font-semibold text-ink">
                    Play the walkthrough
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
