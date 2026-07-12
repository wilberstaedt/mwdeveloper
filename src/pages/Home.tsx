import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroPortfolio } from "@/components/sections/HeroPortfolio";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { useDocumentMeta } from "@/i18n/useDocumentMeta";

/**
 * Portfolio hire-me (redesign 2026-07): sell the engineer, not the products.
 * Services/Process removed from the home; the freelance door lives as a
 * discreet line inside Contact. Section components are being replaced
 * incrementally — see docs/redesign-brief-2026-07.md.
 */
export default function Home() {
  useDocumentMeta();

  return (
    <>
      <Navbar />
      <main>
        <HeroPortfolio />
        <Projects />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
