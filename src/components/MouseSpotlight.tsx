import { useEffect, useRef } from "react";

/** Soft gradient blob that follows the cursor. */
export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf = 0;

    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen blur-3xl"
      style={{
        background:
          "radial-gradient(closest-side, oklch(0.78 0.18 200 / 0.35), oklch(0.82 0.16 75 / 0.15) 40%, transparent 70%)",
      }}
    />
  );
}
