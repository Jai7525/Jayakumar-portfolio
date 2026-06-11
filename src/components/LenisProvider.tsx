"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      event.preventDefault();

      if (href === "#") {
        lenis.scrollTo(0, { duration: 1.1 });
        window.history.pushState(null, "", window.location.pathname);
        return;
      }

      const section = document.querySelector<HTMLElement>(href);
      if (!section) return;

      lenis.scrollTo(section, { duration: 1.1, offset: 0 });
      window.history.pushState(null, "", href);
    };

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    document.addEventListener("click", handleAnchorClick);
    rafId = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
