"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const nameLetters = "JAYAKUMAR".split("");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST +5:30",
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const heroLetters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      const letterCenter = (heroLetters.length - 1) / 2;

      gsap.set(".hero-name-wrap", {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(".hero-name", { pointerEvents: "none" });
      gsap.set(".nav-top-anim", { y: -20, opacity: 0 });
      gsap.set(".hero-letter", {
        opacity: 0,
        filter: "blur(4px)",
      });
      gsap.set(".letter-clone", { xPercent: -100 });
      gsap.set(".role-left", { x: -90, opacity: 0 });
      gsap.set(".role-right", { x: 90, opacity: 0 });
      gsap.set(".hero-photo-wrap", {
        clipPath: "inset(18% 0% 0% 0%)",
        y: 120,
        scale: 0.94,
        opacity: 0,
      });
      gsap.set(".anim-bottom", { y: 24, opacity: 0 });
      gsap.set(".social-link", { opacity: 0, letterSpacing: "0.22em" });

      tl.fromTo(
          ".hero-name",
          {
            scaleX: 0.42,
            opacity: 0,
            filter: "blur(6px)",
            letterSpacing: "-0.02em",
            transformOrigin: "center center",
          },
          {
            scaleX: 1,
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: () => (window.innerWidth < 900 ? "0.015em" : "0.028em"),
            duration: 1.1,
            ease: "power4.out",
          },
          0,
        )
        .fromTo(
          heroLetters,
          {
            x: (index) => (index < letterCenter ? 90 : index > letterCenter ? -90 : 0),
            opacity: 0,
            filter: "blur(4px)",
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.018,
            ease: "power4.out",
          },
          0,
        )
        .to(
          ".hero-name-wrap",
          {
            top: () => (window.innerWidth < 900 ? "15%" : "12%"),
            left: "50%",
            xPercent: -50,
            yPercent: 0,
            duration: 0.75,
            ease: "power4.inOut",
          },
          "-=0.08",
        )
        .set(".hero-name-wrap", {
          top: () => (window.innerWidth < 900 ? "15%" : "12%"),
          left: "50%",
          xPercent: -50,
          yPercent: 0,
        })
        .set(".hero-name", { pointerEvents: "auto" })
        .to(
          ".role-left",
          {
            x: 0,
            opacity: 1,
            duration: 0.72,
          },
          "-=0.34",
        )
        .to(
          ".role-right",
          {
            x: 0,
            opacity: 1,
            duration: 0.72,
          },
          "-=0.62",
        )
        .to(
          ".hero-photo-wrap",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.7",
        )
        .to(
          ".anim-bottom",
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .to(
          ".social-link",
          {
            opacity: 1,
            letterSpacing: "0.14em",
            stagger: 0.045,
            duration: 0.32,
            ease: "power3.out",
          },
          "-=0.46",
        )
        .to(
          ".nav-top-anim",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.45",
        )

      gsap.to(".hero-photo", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleLetterEnter = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slot = event.currentTarget;
    if (slot.dataset.animating === "true") return;

    const main = event.currentTarget.querySelector<HTMLElement>(".letter-main");
    const clone = event.currentTarget.querySelector<HTMLElement>(".letter-clone");
    if (!main || !clone) return;

    slot.dataset.animating = "true";
    gsap.killTweensOf([main, clone]);
    gsap.set(main, { xPercent: 0 });
    gsap.set(clone, { xPercent: -100 });

    gsap.timeline({
      defaults: { ease: "power3.inOut", overwrite: "auto" },
      onComplete: () => {
        slot.dataset.animating = "false";
      },
    })
      .to(main, { xPercent: 100, duration: 0.72 })
      .to(clone, { xPercent: 0, duration: 0.86 }, "-=0.32");
  };

  const handleLetterLeave = (event: React.PointerEvent<HTMLSpanElement>) => {
    const main = event.currentTarget.querySelector<HTMLElement>(".letter-main");
    const clone = event.currentTarget.querySelector<HTMLElement>(".letter-clone");
    if (!main || !clone) return;

    gsap.killTweensOf([main, clone]);
    gsap.set(main, {
      xPercent: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      overwrite: "auto",
    });
    gsap.set(clone, {
      xPercent: -100,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      overwrite: "auto",
    });
  };

  return (
    <section ref={containerRef} className="hero">
      <div 
        className={`fixed left-4 right-4 top-5 z-[100] flex items-start justify-between font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white mix-blend-difference transition-transform duration-500 ease-in-out md:left-8 md:right-8 md:top-7 md:text-[11px] ${
          isVisible ? "translate-y-0" : "-translate-y-[300%]"
        }`}
      >
        <div className="nav-meta nav-top-anim flex gap-4 md:gap-8">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            CHENNAI, IN
          </span>
          <span className="hidden md:inline-block">{time}</span>
          <span className="hidden lg:inline-block">13.0827&deg; N, 80.2707&deg; E</span>
        </div>

        <div className="nav-links nav-top-anim flex gap-6 md:gap-8">
          <a href="#" className="transition-all duration-300 hover:opacity-70">HOME</a>
          <a href="#work" className="transition-all duration-300 hover:opacity-70">WORKS</a>
          <a href="#about" className="transition-all duration-300 hover:opacity-70">ABOUT</a>
          <a href="#contact" className="transition-all duration-300 hover:opacity-70">CONTACT</a>
        </div>
      </div>

      <div className="hero-name-wrap">
        <div className="hero-name-mask">
          <h1 className="hero-name" aria-label="Jayakumar">
            {nameLetters.map((letter, index) => (
              <span
                className="hero-letter char"
                key={`${letter}-${index}`}
                onPointerEnter={handleLetterEnter}
                onPointerLeave={handleLetterLeave}
              >
                <span className="letter-main">{letter}</span>
                <span className="letter-clone" aria-hidden="true">
                  {letter}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="role-left font-heading text-4xl uppercase tracking-[0.08em] text-[#111111] md:text-5xl lg:text-6xl">
        AI &amp; FULL-STACK
      </div>
      <div className="role-right font-heading text-4xl uppercase tracking-[0.08em] text-[#111111] md:text-5xl lg:text-6xl">
        DEVELOPER
      </div>

      <div className="hero-photo-wrap">
        <img src="/jai-new.webp" alt="Jayakumar Profile" className="hero-photo" />
      </div>

      <div className="hero-bottom absolute bottom-6 left-4 right-4 z-10 flex items-end justify-between text-[#111111] md:left-8 md:right-8">
        <div className="anim-bottom flex flex-col pointer-events-auto">
          <span className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.32em] text-[#5E6470] md:text-xs">
            AVAILABILITY
          </span>
          <span className="font-heading text-2xl uppercase leading-none tracking-[0.01em] md:text-[2.15rem]">
            OPEN TO WORK
          </span>
        </div>

        <div className="anim-bottom pointer-events-auto absolute bottom-0 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center text-white mix-blend-difference md:flex">
          <span className="mb-2 font-label text-[9px] font-bold uppercase tracking-[0.22em] text-white md:text-[10px]">
            SOCIALS
          </span>
          <div className="flex gap-6 font-label text-[10px] font-bold uppercase tracking-[0.14em] md:text-[11px]">
            <a href="https://github.com/Jai7525" target="_blank" rel="noreferrer" className="social-link transition-opacity hover:opacity-60">
              GITHUB
            </a>
            <a href="mailto:jayakumar312006@gmail.com" className="social-link transition-opacity hover:opacity-60">
              EMAIL
            </a>
            <a href="https://www.linkedin.com/in/jayakumar-m-110b653a3/" target="_blank" rel="noreferrer" className="social-link transition-opacity hover:opacity-60">
              LINKEDIN
            </a>
          </div>
        </div>

        <div className="anim-bottom flex flex-col items-end text-right pointer-events-auto">
          <span className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.32em] text-[#5E6470] md:text-xs">
            SELECTED WORKS
          </span>
          <span className="font-heading text-2xl uppercase leading-none tracking-[0.01em] md:text-[2.15rem]">
            VIEW PROJECTS
          </span>
        </div>
      </div>
    </section>
  );
}
