"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, Database, LayoutGrid, Server, Terminal, Workflow } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip-card";

const lines = [
  [
    { text: "Great AI products", highlight: true },
    { text: " don't happen by accident." },
  ],
  [
    { text: "As an " },
    { text: "AI-focused full-stack developer,", highlight: true },
    { text: " I build " },
    { text: "intelligent backend systems,", highlight: true },
    { text: " modern web experiences, and " },
    { text: "AI-powered tools", highlight: true },
    { text: " that transform complex workflows into simple user experiences." },
  ],
  [
    { text: "I don't just write code.", highlight: true },
  ],
  [
    { text: "I build " },
    { text: "real products", highlight: true },
    { text: " - from " },
    { 
      text: "InboxIQ AI", 
      highlight: true, 
      tooltip: { title: "InboxIQ AI", desc: "AI Email Security", image: "/jai3.webp" } 
    },
    { text: ", " },
    { 
      text: "DevGuide AI", 
      highlight: true, 
      tooltip: { title: "DevGuide AI", desc: "AI Codebase Understanding", image: "/jai2.webp" } 
    },
    { text: ", and " },
    { 
      text: "TaskFlow", 
      highlight: true, 
      tooltip: { title: "TaskFlow", desc: "Modern Work Management", image: "/taskflow.png" } 
    },
    { text: " to modern full-stack applications - focused on " },
    { text: "solving meaningful problems", highlight: true },
    { text: " and creating " },
    { text: "experiences people actually remember.", highlight: true },
  ],
];

const skills = [
  {
    label: "Category",
    title: "AI",
    description: "AI product features with retrieval and LLM workflows.",
    items: ["RAG", "Embeddings", "FAISS", "Vector Search", "Prompt Engineering", "Gemini API"],
    icon: BrainCircuit,
  },
  {
    label: "Category",
    title: "Backend",
    description: "APIs, auth flows, uploads, and backend logic.",
    items: ["Python", "FastAPI", "Flask", "REST APIs", "Authentication", "Supabase"],
    icon: Server,
  },
  {
    label: "Category",
    title: "Frontend",
    description: "Clean, modern, recruiter-ready interfaces.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    icon: LayoutGrid,
  },
  {
    label: "Category",
    title: "Databases",
    description: "Structured data, users, projects, and chat history.",
    items: ["PostgreSQL", "Supabase", "SQLite", "Vector Storage"],
    icon: Database,
  },
  {
    label: "Category",
    title: "Architecture",
    description: "Connecting UI, backend systems, and AI workflows.",
    items: ["RAG Pipelines", "System Design", "API Design", "AI Workflows"],
    icon: Workflow,
  },
  {
    label: "Category",
    title: "Developer Tools",
    description: "Testing, deploying, and managing full-stack projects.",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render"],
    icon: Terminal,
  },
];

const ProjectTooltipCard = ({ title, desc, image }: { title: string; desc: string; image: string }) => {
  return (
    <div className="text-left font-body tracking-normal">
      <img
        src={image}
        alt={title}
        className="aspect-[16/10] w-full rounded-lg object-cover bg-[#F4F1EA]"
      />
      <div className="mt-3 flex flex-col">
        <div className="text-base font-bold text-[#18181B] leading-tight tracking-tight">{title}</div>
        <div className="mt-1 text-xs text-[#6B6B6B] tracking-normal">
          {desc}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = containerRef.current;
    const aboutText = aboutTextRef.current;
    const skillsSection = skillsSectionRef.current;
    const skillsGrid = skillsGridRef.current;
    if (!section || !aboutText || !skillsSection || !skillsGrid) return;

    const ctx = gsap.context(() => {
      const aboutWords = gsap.utils.toArray<HTMLElement>(".about-word");
      const skillCards = gsap.utils.toArray<HTMLElement>(".skill-card");
      const skillHeader = gsap.utils.toArray<HTMLElement>(".skills-heading, .skills-copy");

      gsap.set(aboutWords, {
        color: "#C9C9C6",
        opacity: 1,
      });

      gsap.to(aboutWords, {
        color: (_index, target: HTMLElement) =>
          target.dataset.highlight === "true" ? "#18181B" : "#6B6B6B",
        opacity: 1,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: aboutText,
          start: "top 75%",
          end: "bottom 45%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(skillHeader, {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsSection,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(skillCards, {
        y: 50,
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: skillsGrid,
          start: "top 75%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="about bg-[#F4F1EA] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="flex min-h-[70vh] items-center justify-center">
        <div
          ref={aboutTextRef}
          className="about-text mx-auto max-w-[1080px] text-center font-about text-[clamp(1.75rem,3.35vw,3.85rem)] font-medium leading-[1.18] tracking-[-0.045em] text-[#6B6B6B] will-change-transform"
        >
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className={lineIndex === 0 ? "" : "mt-4 md:mt-6"}>
              {line.map((part, partIndex) => {
                const words = part.text
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((word, wordIndex) => (
                    <React.Fragment key={`${lineIndex}-${partIndex}-${wordIndex}`}>
                      <span
                        className={`about-word inline-block ${part.highlight ? "font-bold" : ""}`}
                        data-highlight={part.highlight ? "true" : "false"}
                      >
                        {word}
                      </span>
                      {" "}
                    </React.Fragment>
                  ));

                if ((part as any).tooltip) {
                  const tooltipData = (part as any).tooltip;
                  return (
                    <Tooltip
                      key={`${lineIndex}-${partIndex}`}
                      content={<ProjectTooltipCard {...tooltipData} />}
                      containerClassName="inline-flex cursor-pointer"
                    >
                      {words}
                    </Tooltip>
                  );
                }

                return <React.Fragment key={`${lineIndex}-${partIndex}`}>{words}</React.Fragment>;
              })}
            </div>
          ))}
        </div>
      </div>

      <div ref={skillsSectionRef} className="skills-section mx-auto max-w-[1440px] pb-8 pt-24 md:pt-32">
        <p className="skills-heading font-label text-[12px] font-bold uppercase tracking-[0.18em] text-[#6B6B6B]">
          Skills & Technologies
        </p>
        <h2 className="skills-heading mt-6 font-about text-[clamp(3.6rem,7vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em] text-[#18181B]">
          What I Know
        </h2>
        <p className="skills-copy mt-7 max-w-[620px] font-body text-base leading-7 text-[#6B6B6B] md:text-lg">
          Technologies I&apos;ve mastered and actively use to design, build, and ship production-ready products.
        </p>

        <div ref={skillsGridRef} className="skills-grid mt-16 grid border-l border-t border-[#DDD6CC] bg-[#FFFFFF] md:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ label, title, description, items, icon: Icon }) => (
            <article
              key={title}
              className="skill-card group min-h-[240px] border-b border-r border-[#DDD6CC] bg-[#FFFFFF] p-5 text-[#18181B] transition-colors duration-300 hover:bg-[#0D0D0D] hover:text-[#FFFFFF] md:p-6"
            >
              <Icon size={26} strokeWidth={1.8} className="text-current transition-colors duration-300" />
              <p className="mt-5 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[#5E6470] transition-colors duration-300 group-hover:text-[#D6D1C8]">
                {label}
              </p>
              <h3 className="mt-2 font-about text-[clamp(1.55rem,1.8vw,2rem)] font-semibold tracking-[-0.04em] text-current">
                {title}
              </h3>
              <p className="mt-4 max-w-[340px] font-body text-[0.9rem] leading-6 text-[#5E6470] transition-colors duration-300 group-hover:text-[#FFFFFF]">
                {description}
              </p>
              <p className="mt-6 max-w-[340px] font-label text-[9px] font-bold uppercase leading-5 tracking-[0.14em] text-[#5E6470] transition-colors duration-300 group-hover:text-[#D6D1C8]">
                {items.slice(0, 4).join(" / ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
