"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// ─── Config ────────────────────────────────────────────────────────
const FRAME_COUNT = 192; // frame_000.png → frame_191.png
const FRAME_PATH = "/sequence/frame_";
const FRAME_EXT = ".png";

function padIndex(i: number): string {
  return String(i).padStart(3, "0");
}

// ─── Loader ────────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]">
      {/* Minimal spinner */}
      <div className="mb-8">
        <div className="h-8 w-8 rounded-full border-[1.5px] border-white/10 border-t-white/60 animate-spin" />
      </div>
      {/* Progress bar */}
      <div className="relative w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden loading-shimmer">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/40 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-[11px] tracking-[0.25em] uppercase text-white/25 font-light">
        Loading
      </p>
    </div>
  );
}

// ─── Text Overlay Beat ─────────────────────────────────────────────
interface BeatProps {
  scrollProgress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
  align?: "left" | "center" | "right";
  children: ReactNode;
}

function TextBeat({
  scrollProgress,
  start,
  end,
  align = "center",
  children,
  initiallyVisible = false,
  endVisible = false,
}: BeatProps & { initiallyVisible?: boolean; endVisible?: boolean }) {
  const fadeIn = start + (end - start) * 0.1;
  const fadeOut = end - (end - start) * 0.1;

  const opacityInput = initiallyVisible
    ? endVisible
      ? [start, end]
      : [start, fadeOut, end]
    : endVisible
    ? [start, fadeIn, end]
    : [start, fadeIn, fadeOut, end];

  const opacityOutput = initiallyVisible
    ? endVisible
      ? [1, 1]
      : [1, 1, 0]
    : endVisible
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const yInput = initiallyVisible
    ? endVisible
      ? [start, end]
      : [start, fadeOut, end]
    : endVisible
    ? [start, fadeIn, end]
    : [start, fadeIn, fadeOut, end];

  const yOutput = initiallyVisible
    ? endVisible
      ? [0, 0]
      : [0, 0, -40]
    : endVisible
    ? [40, 0, 0]
    : [40, 0, 0, -40];

  const opacity = useTransform(scrollProgress, opacityInput, opacityOutput);
  const y = useTransform(scrollProgress, yInput, yOutput);

  const alignClass =
    align === "left"
      ? "items-start text-left pl-[8vw]"
      : align === "right"
      ? "items-end text-right pr-[8vw]"
      : "items-center text-center";

  return (
    <motion.div
      className={`fixed inset-0 z-[10] flex flex-col justify-center ${alignClass} pointer-events-none px-6`}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll Down Hint ───────────────────────────────────────────────
function ScrollHint({ scrollProgress }: { scrollProgress: ReturnType<typeof useSpring> }) {
  const opacity = useTransform(scrollProgress, [0, 0.03], [1, 0]);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 pointer-events-none"
      style={{ opacity }}
    >
      <span className="text-white/30 text-[0.7rem] tracking-[0.3em] font-mono uppercase">
        Scroll down
      </span>
      <motion.svg
        className="w-4 h-4 text-white/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </motion.svg>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ── Scroll tracking ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 50,
    mass: 0.2,
  });

  // ── Preload all images ──
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${padIndex(i)}${FRAME_EXT}`;
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Canvas draw with "cover" logic ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Cover fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number, drawH: number, dx: number, dy: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      dx = 0;
      dy = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      dx = (cw - drawW) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // ── Resize canvas to viewport ──
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      drawFrame(currentFrameRef.current);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, drawFrame]);

  // ── rAF render loop driven by spring ──
  useMotionValueEvent(smoothProgress, "change", (v) => {
    const frameIndex = Math.min(
      Math.floor(v * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  // ── Draw first frame once loaded ──
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // Cleanup rAF
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  const tags = [
    "Java",
    "Spring Boot",
    "SQL",
    "Git",
    "REST APIs",
    "PostgreSQL",
    "Docker",
  ];

  const frontendTags = [
    "Next.js",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
  ];

  return (
    <>
      {!loaded && <LoadingScreen progress={loadProgress} />}

      <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
        {/* Sticky canvas wrapper — overflow hidden + slight scale to crop watermark */}
        <div className="sticky top-0 left-0 w-full h-screen z-[1] overflow-hidden" style={{ background: "#0A0A0A" }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ transform: "scale(1.14)", transformOrigin: "center center" }}
          />
        </div>

        {/* Scroll down hint — fades out as user scrolls */}
        <ScrollHint scrollProgress={smoothProgress} />

        {/* ─── Beat A: Hero (3–18%) ─── */}
        <TextBeat scrollProgress={smoothProgress} start={0.03} end={0.18} align="right">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white/90 leading-[0.9]"
            style={{ fontSize: "clamp(5rem, 8vw, 9rem)" }}
            >
            PARTH
            <br />
            KHATKE
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/50 max-w-md tracking-wide font-light leading-relaxed">
            Full Stack Developer.
            <br />
            Driven by curiosity, built for scale.
          </p>
        </TextBeat>

        {/* ─── Beat B: About (22–38%) ─── */}
        <TextBeat scrollProgress={smoothProgress} start={0.22} end={0.38} align="left">
          <h2
            className="font-display text-white/90 leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 6vw, 7rem)" }}
          >
            ROBUST
            <br />
            BACKENDS
          </h2>
          <p className="text-white/50 font-sans font-light mt-6 max-w-[420px] text-sm sm:text-base leading-relaxed">
            Engineering scalable, production-grade architectures using Java,
            Spring Boot, Hibernate, and REST APIs.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex gap-2">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 rounded-full px-3 py-1 text-xs font-mono text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {tags.slice(4).map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 rounded-full px-3 py-1 text-xs font-mono text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TextBeat>

        {/* ─── Beat C: Frontends (45–65%) ─── */}
        <TextBeat scrollProgress={smoothProgress} start={0.45} end={0.65} align="right">
          <h2
            className="font-display text-white/90 leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 6vw, 7rem)" }}
          >
            DYNAMIC
            <br />
            FRONTENDS
          </h2>
          <p className="text-white/50 font-sans font-light mt-6 max-w-[420px] text-sm sm:text-base leading-relaxed mx-auto md:mx-0 md:ml-auto">
            Crafting seamless, pixel-perfect user experiences with Next.js,
            React.js, TypeScript, and Tailwind CSS.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex gap-2 justify-center md:justify-end">
              {frontendTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 rounded-full px-3 py-1 text-xs font-mono text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 justify-center md:justify-end">
              {frontendTags.slice(3).map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 rounded-full px-3 py-1 text-xs font-mono text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TextBeat>

        {/* ─── Beat D: CTA (75–100%) ─── */}
        <TextBeat scrollProgress={smoothProgress} start={0.75} end={1.0} align="center" endVisible>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white/90 leading-[0.9]">
            LET&apos;S
            <br />
            BUILD
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.06] text-white/80 text-sm tracking-widest uppercase font-light hover:bg-white/10 hover:border-white/25 transition-all duration-500 backdrop-blur-xl"
            >
              Let&apos;s Connect
              <svg
                className="w-3.5 h-3.5 opacity-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.06] text-white/80 text-sm tracking-widest uppercase font-light hover:bg-white/10 hover:border-white/25 transition-all duration-500 backdrop-blur-xl"
            >
              About Me
              <svg
                className="w-3.5 h-3.5 opacity-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </a>
          </div>
        </TextBeat>
      </div>
    </>
  );
}
