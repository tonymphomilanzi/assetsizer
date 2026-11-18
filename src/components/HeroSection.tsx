import { useEffect, useRef } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

// Platform cards that float in the hero — purely decorative, no real images needed.
const floatingCards = [
  {
    id: "ios",
    label: "iOS App Icon",
    sizes: "11 sizes",
    angle: -12,
    top: "4%",
    left: "2%",
    accent: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.3.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    id: "android",
    label: "Android",
    sizes: "6 sizes",
    angle: 8,
    top: "28%",
    left: "0%",
    accent: "#a1a1aa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
      </svg>
    ),
  },
  {
    id: "web",
    label: "Web / Favicon",
    sizes: "5 sizes",
    angle: -6,
    top: "55%",
    left: "4%",
    accent: "#71717a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Social Media",
    sizes: "11 sizes",
    angle: 14,
    top: "72%",
    left: "-1%",
    accent: "#52525b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "33", label: "Output sizes" },
  { value: "4", label: "Platforms covered" },
  { value: "0", label: "Uploads to a server" },
  { value: "100%", label: "Free to start" },
];

interface HeroSectionProps {
  onScrollToTool: () => void;
  onOpenPaywall: () => void;
}

function HeroSection({ onScrollToTool, onOpenPaywall }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(badgeRef.current, { opacity: 0, y: -16, duration: 0.5 })
        .from(
          headlineRef.current,
          { opacity: 0, y: 40, duration: 0.7 },
          "-=0.2"
        )
        .from(subRef.current, { opacity: 0, y: 24, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(
          statsRef.current,
          { opacity: 0, y: 16, duration: 0.5 },
          "-=0.2"
        );

      // Cards stagger in with rotation from their final rotation values
      const validCards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      gsap.from(validCards, {
        opacity: 0,
        scale: 0.85,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });

      // Subtle continuous float on each card
      validCards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 2.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-zinc-950"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Premium Glow Effect */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-500/5 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 right-0 w-[400px] h-[400px] bg-zinc-400/5 rounded-full blur-[100px]" />

      {/* Large watermark letter — purely decorative depth */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[28rem] font-black text-zinc-900 select-none leading-none pr-8 hidden xl:block">
        A
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT: Copy ── */}
          <div>
            {/* Eyebrow badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 border border-zinc-800 rounded-full px-3 py-1 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 animate-pulse" />
              <span className="text-zinc-400 text-xs tracking-widest uppercase">
                Free to use — no account needed
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight text-zinc-100 mb-6"
            >
              One image.
              <br />
              <span className="text-zinc-500">Every</span> size.
              <br />
              Instantly.
            </h1>

            {/* Sub */}
            <p ref={subRef} className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md">
              Drop your icon or artwork once. AssetSizer crops, resizes, and
              packages every required dimension for iOS, Android, Web, and
              Social into a tidy ZIP — right in your browser.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onScrollToTool}
                className="group inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 font-medium text-sm px-6 py-3 rounded-lg hover:bg-white transition-colors"
              >
                Start resizing
                <ArrowDownIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={onOpenPaywall}
                className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-medium text-sm px-6 py-3 rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
              >
                Get Pro — $5/mo
              </button>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10 border-t border-zinc-800"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-zinc-100 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Floating platform cards ── */}
          <div className="relative h-[480px] hidden lg:block">
            {floatingCards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  position: "absolute",
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.angle}deg)`,
                  width: "200px",
                }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 cursor-default select-none"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-200 text-sm font-medium truncate">
                      {card.label}
                    </p>
                    <p className="text-zinc-500 text-xs">{card.sizes}</p>
                  </div>
                </div>

                {/* Mini size bars */}
                <div className="space-y-1.5">
                  {[100, 72, 55, 40].map((width, barIndex) => (
                    <div
                      key={barIndex}
                      className="h-1.5 rounded-full bg-zinc-800"
                    >
                      <div
                        className="h-full rounded-full bg-zinc-600"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Size pill */}
                <div className="mt-3 flex justify-end">
                  <span className="text-zinc-600 text-xs font-mono">
                    .png
                  </span>
                </div>
              </div>
            ))}

            {/* Connector lines — purely decorative SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 300 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M120 60 Q200 120 180 200"
                stroke="#27272a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d="M110 200 Q230 260 190 340"
                stroke="#27272a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d="M130 340 Q250 380 220 440"
                stroke="#27272a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle cx="180" cy="200" r="3" fill="#3f3f46" />
              <circle cx="190" cy="340" r="3" fill="#3f3f46" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom fade into the tool section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}

export default HeroSection;
