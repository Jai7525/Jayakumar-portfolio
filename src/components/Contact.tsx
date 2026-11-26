"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BriefcaseBusiness, Code2, FileText, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jayakumar-m-110b653a3/",
    iconSrc: "/linkedin.png",
    iconText: "in",
  },
  {
    label: "GitHub",
    href: "https://github.com/Jai7525",
    iconSrc: "/github.png",
    iconText: "GH",
  },
  {
    label: "Resume",
    href: "/Jai_Resume.pdf",
    icon: FileText,
  },
];

const infoItems = [
  {
    label: "Based In",
    value: "Chennai, India",
    icon: MapPin,
    hoverClass: "group-hover:rotate-[10deg]",
  },
  {
    label: "Building",
    value: "AI Products & Web Experiences",
    icon: Code2,
    hoverClass: "group-hover:scale-110",
  },
  {
    label: "Open To",
    value: "Internships & Collaborations",
    icon: BriefcaseBusiness,
    hoverClass: "group-hover:-translate-y-1",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      tl.from(
          ".availability",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0,
        )
        .from(
          ".contact-line",
          {
            yPercent: 100,
            duration: 0.75,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .from(
          ".contact-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          ".contact-email",
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".contact-social",
          {
            y: 15,
            opacity: 0,
            stagger: 0.06,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          ".contact-info-card",
          {
            y: 25,
            opacity: 0,
            stagger: 0.06,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .from(
          ".contact-footer",
          {
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="bg-[#0B0B0B] px-5 py-16 text-[#F5F5F5] md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center gap-5">
          <span className="status-dot" aria-hidden="true" />
          <p className="availability font-body text-[11px] font-medium uppercase tracking-[0.36em] text-[#B8B0A8] md:text-sm">
            Available for internships & full-stack roles
          </p>
        </div>

        <h2 className="mt-11 max-w-[1040px] font-body text-[clamp(5rem,7.8vw,8.75rem)] font-normal leading-[0.92] tracking-[-0.07em] text-[#F5F5F5]">
          <span className="block overflow-hidden pb-2">
            <span className="contact-line block">Let&apos;s build products</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="contact-line block">people actually use.</span>
          </span>
        </h2>

        <p className="contact-description mt-8 max-w-[660px] font-body text-xl leading-[1.55] text-[#A1A1AA] md:text-[1.45rem]">
          I&apos;m an AI Product Developer and Full-Stack Engineer focused on building AI-powered products, developer tools, and modern web experiences.
        </p>

        <a
          href="mailto:jayakumar312006@gmail.com"
          className="contact-email group mt-10 inline-flex w-full max-w-[470px] items-center justify-between border border-white/25 px-6 py-5 font-body text-sm font-semibold uppercase tracking-[0.22em] text-[#F5F5F5] transition-colors duration-300 hover:bg-white/10 md:text-base"
        >
          <span>Jayakumar312006@gmail.com</span>
          <ArrowUpRight className="email-arrow h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1.5} />
        </a>

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:gap-14">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-social group inline-flex items-center gap-5 font-body text-sm font-semibold uppercase tracking-[0.24em] text-[#F5F5F5]"
              >
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#F5F5F5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#D8D0C7] group-hover:text-[#0B0B0B]">
                  {link.iconSrc ? (
                    <img
                      src={link.iconSrc}
                      alt=""
                      className="h-6 w-6 object-contain brightness-0 invert transition-all duration-300 group-hover:scale-110 group-hover:invert-0"
                    />
                  ) : Icon ? (
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  ) : (
                    <span className="font-body text-base font-extrabold tracking-[-0.05em]">
                      {link.iconText}
                    </span>
                  )}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  {link.label}
                </span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45" strokeWidth={1.5} />
              </a>
            );
          })}
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/20 pt-10 md:mt-20 md:grid-cols-3">
          {infoItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="contact-info-card group flex items-start gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#D8D0C7]">
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${item.hoverClass}`} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-body text-sm font-semibold uppercase tracking-[0.22em] text-[#F5F5F5]">
                    {item.label}
                  </span>
                  <span className="mt-3 block font-body text-lg text-[#B8B0A8]">
                    {item.value}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <p className="contact-footer mt-16 font-body text-sm text-[#B8B0A8]">
          &copy; 2026 Jayakumar M. All rights reserved.
        </p>
      </div>
    </section>
  );
}
