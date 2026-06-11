"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    index: "01",
    title: "InboxIQ AI",
    platform: "AI Email Security Platform",
    description: "Detects phishing, spoofing, suspicious links, and provides AI-powered inbox intelligence.",
    tech: ["React", "FastAPI", "Supabase", "Gemini"],
    image: "/jai3.webp",
    liveUrl: "https://inbox-iq-ai.vercel.app/",
    githubUrl: "https://github.com/Jai7525/InboxIQ-AI",
    year: "2026",
    links: ["Live", "GitHub", "Case Study"],
    caseStudy: {
      problem: "Email users struggle to identify phishing attacks, suspicious links, and spoofed domains.",
      solution: "Built an AI-powered email security platform that analyzes emails, domains, and links to identify potential threats.",
      features: ["Gmail Integration", "AI Threat Analysis", "Domain Reputation Checks", "Email Risk Scoring", "Threat Dashboard"],
      role: "Designed the product architecture, frontend, backend APIs, database structure, and AI workflow.",
    },
  },
  {
    index: "02",
    title: "DevGuide AI",
    platform: "AI Codebase Understanding Platform",
    description: "Upload a repository and receive setup guides, tech stack analysis, and source-grounded answers.",
    tech: ["FastAPI", "FAISS", "RAG", "Gemini", "Supabase"],
    image: "/jai2.webp",
    year: "2026",
    links: ["Case Study"],
    caseStudy: {
      problem: "Developers spend significant time understanding unfamiliar codebases.",
      solution: "Built an AI assistant for repository upload, architecture summaries, and codebase Q&A.",
      features: ["ZIP Upload", "Repository Analysis", "RAG Chat", "FAISS Vector Search", "Architecture Summaries"],
      role: "Designed the RAG pipeline, document processing workflow, vector search architecture, and backend services.",
    },
  },
  {
    index: "03",
    title: "AgroStore",
    platform: "Smart Agriculture Operations Platform",
    description: "Warehouse booking, IoT monitoring, SMS alerts, and crop storage forecasting.",
    tech: ["Flask", "SQLite", "HTML", "CSS", "Python"],
    image: "/jai4.webp",
    liveUrl: "https://agrostore.onrender.com",
    githubUrl: "https://github.com/Jai7525/AgroStore",
    year: "2025",
    links: ["Live", "GitHub", "Case Study"],
    caseStudy: {
      problem: "Farmers often struggle to find secure warehouse storage and manage bookings efficiently.",
      solution: "Built a warehouse booking platform that connects farmers with available storage facilities.",
      features: ["Farmer Registration", "Warehouse Listings", "Booking Management", "Admin Dashboard", "Storage Tracking"],
      role: "Developed the booking workflow, authentication system, database design, and administrative tools.",
    },
  },
  {
    index: "04",
    title: "Portfolio",
    platform: "Creative Developer Portfolio",
    description: "Editorial design system, GSAP motion, custom interactions, and premium UX.",
    tech: ["React", "GSAP", "Framer Motion", "Lenis", "Tailwind CSS"],
    image: "/jai.1.webp",
    liveUrl: "https://jefrin.vercel.app/",
    year: "2026",
    links: ["Live", "Case Study"],
    caseStudy: {
      problem: "Most developer portfolios focus only on skills rather than demonstrating real product-building ability.",
      solution: "Designed a premium editorial portfolio that highlights projects, engineering decisions, and product thinking.",
      features: ["Editorial Layout", "GSAP Animations", "Smooth Scroll", "Interactive Case Studies", "Responsive Design"],
      role: "Designed the user experience, motion system, visual design, and frontend implementation.",
    },
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openCase, setOpenCase] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".work-head-item", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        const line = row.querySelector(".project-line");
        const number = row.querySelector(".project-number");
        const title = row.querySelector(".project-title");
        const platform = row.querySelector(".project-platform");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
          },
        });

        tl.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.out",
        })
          .from(number, { y: 30, opacity: 0, duration: 0.45, ease: "power3.out" }, "-=0.45")
          .fromTo(
            title,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.85, ease: "power4.out", immediateRender: false },
            "-=0.3",
          )
          .from(platform, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.45");

      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".case-panel").forEach((panel) => {
      const isOpen = panel.dataset.open === "true";
      gsap.to(panel, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
      gsap.to(panel.querySelectorAll(".case-item"), {
        y: isOpen ? 0 : 16,
        opacity: isOpen ? 1 : 0,
        stagger: 0.04,
        duration: 0.32,
        ease: "power3.out",
      });
    });
  }, [openCase]);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-[#F4F1EA] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <h2 className="work-head-item font-about text-[clamp(3.2rem,6.8vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-[#18181B]">
            Selected Work
          </h2>
          <p className="work-head-item mb-4 hidden font-label text-xs font-bold uppercase tracking-[0.35em] text-[#5E6470] md:block">
            4 Works
          </p>
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2">
          {projects.map((project) => {
            const isOpen = openCase === project.index;
            const isHovered = hoveredProject === project.index;
            const isExpanded = isHovered || isOpen;
            const isMuted = hoveredProject !== null && !isHovered;

            return (
              <article
                key={project.index}
                className={`project-row group relative overflow-hidden transition-[color,opacity] duration-500 ${
                  isHovered ? "text-white" : "text-[#18181B]"
                } ${isMuted ? "opacity-35" : "opacity-100"}`}
                onPointerEnter={() => {
                  setHoveredProject(project.index);
                }}
                onPointerLeave={() => {
                  setHoveredProject(null);
                }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 top-0 z-0 origin-bottom bg-[#18181B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{ transform: isHovered ? "scaleY(1)" : "scaleY(0)" }}
                />
                <div className={`project-line relative z-10 h-px w-full transition-colors duration-500 ${isHovered ? "bg-white/15" : "bg-[#DDD6CC]"}`} />
                <div className={`project-row-inner relative z-10 mx-auto grid max-w-[1320px] gap-6 px-5 transition-[padding] duration-500 md:grid-cols-[52px_minmax(0,1fr)_minmax(360px,480px)] md:gap-10 md:px-8 ${isExpanded ? "py-9 md:py-10" : "py-7 md:py-8"}`}>
                  <span className={`project-number font-label text-xs font-bold uppercase tracking-[0.18em] ${isHovered ? "text-[#D6D1C8]" : "text-[#5E6470]"}`}>
                    {project.index}
                  </span>

                  <div>
                    <div className="title-mask overflow-hidden">
                      <h3 className="project-title inline-block font-about text-[clamp(2.2rem,4.2vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.055em] transition-transform duration-300 ease-out group-hover:translate-x-3">
                        {project.title}
                      </h3>
                    </div>
                    <p className="project-platform mt-2 font-about text-[clamp(1.25rem,1.6vw,1.7rem)] font-medium tracking-[-0.03em]">
                      {project.platform}
                    </p>
                    <p className={`project-desc max-w-[640px] overflow-hidden font-body text-base leading-7 transition-all duration-500 md:text-lg ${isExpanded ? "mt-4 max-h-28 opacity-100" : "mt-0 max-h-0 opacity-0"} ${isHovered ? "text-[#D6D1C8]" : "text-[#5E6470]"}`}>
                      {project.description}
                    </p>
                    <p className={`project-tech overflow-hidden font-label text-[11px] font-bold uppercase leading-6 tracking-[0.2em] transition-all duration-500 ${isExpanded ? "mt-5 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0"} ${isHovered ? "text-[#D6D1C8]" : "text-[#5E6470]"}`}>
                      {project.tech.join(" / ")}
                    </p>
                    <div className={`project-actions flex flex-wrap gap-5 overflow-hidden transition-all duration-500 ${isExpanded ? "mt-5 max-h-10 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
                      {project.links.map((link) =>
                        link === "Case Study" ? (
                          <button
                            key={link}
                            type="button"
                            onClick={() => setOpenCase(isOpen ? null : project.index)}
                            className="project-link link-underline font-label text-[11px] font-bold uppercase tracking-[0.18em]"
                          >
                            {isOpen ? "Close" : "Case Study"}
                          </button>
                        ) : (
                          (() => {
                            const href =
                              link === "Live" && project.liveUrl
                                ? project.liveUrl
                                : link === "GitHub" && project.githubUrl
                                  ? project.githubUrl
                                  : "#";

                            return (
                              <a
                                key={link}
                                href={href}
                                target={href !== "#" ? "_blank" : undefined}
                                rel={href !== "#" ? "noreferrer" : undefined}
                                className="project-link link-underline font-label text-[11px] font-bold uppercase tracking-[0.18em]"
                              >
                                {link}
                              </a>
                            );
                          })()
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center justify-end">
                    <div className={`project-image w-full max-w-[420px] overflow-hidden bg-[#D8D4CC] transition-all duration-700 ${isExpanded ? "max-h-[288px] translate-y-0 scale-100 p-3 opacity-100" : "max-h-0 translate-y-4 scale-[0.96] p-0 opacity-0"}`}>
                      <img src={project.image} alt={`${project.title} preview`} className="aspect-[16/10] h-full w-full bg-white object-contain object-center shadow-[0_12px_28px_rgba(0,0,0,0.24)]" />
                    </div>
                  </div>
                </div>

                <div className="case-panel relative z-10 h-0 overflow-hidden opacity-0" data-open={isOpen ? "true" : "false"}>
                  <div className={`mx-auto grid max-w-[1320px] gap-6 border-t px-5 pb-10 pt-8 md:grid-cols-5 md:px-8 ${isHovered ? "border-white/15" : "border-[#DDD6CC]"}`}>
                    {[
                      ["Problem", project.caseStudy.problem],
                      ["Solution", project.caseStudy.solution],
                      ["Key Features", project.caseStudy.features.join(", ")],
                      ["Tech Stack", project.tech.join(", ")],
                      ["My Role", project.caseStudy.role],
                    ].map(([label, value]) => (
                      <div key={label} className="case-item">
                        <p className={`font-label text-[10px] font-bold uppercase tracking-[0.2em] ${isHovered ? "text-[#D6D1C8]" : "text-[#5E6470]"}`}>{label}</p>
                        <p className={`mt-3 font-body text-sm leading-6 ${isHovered ? "text-[#E8E3DA]" : "text-[#18181B]"}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

    </section>
  );
}
