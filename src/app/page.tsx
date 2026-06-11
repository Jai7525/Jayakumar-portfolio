import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import QuoteTransition from "@/components/QuoteTransition";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <QuoteTransition />
      <Contact />
    </main>
  );
}
