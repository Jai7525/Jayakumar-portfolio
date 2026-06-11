"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function QuoteTransition() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".quote-line", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      gsap.to(".quote-line-top", {
        x: -72,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".quote-line-bottom", {
        x: 72,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="quote-transition mt-20 flex min-h-[58vh] flex-col items-center justify-center overflow-hidden bg-[#F4F1EA] px-5 py-20 text-center md:mt-28 md:px-8">
      <div className="quote-copy will-change-transform">
        <p className="quote-line quote-line-top whitespace-nowrap font-body text-[clamp(3.2rem,6.6vw,7.2rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[#18181B]">
          Good products aren&apos;t built by accident.
        </p>
        <p className="quote-line quote-line-bottom mt-5 whitespace-nowrap font-body text-[clamp(3.2rem,6.6vw,7.2rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[#3F4954]">
          They&apos;re built by solving real problems.
        </p>
      </div>
    </section>
  );
}
