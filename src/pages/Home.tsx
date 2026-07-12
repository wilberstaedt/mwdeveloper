import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/interactive/CommandPalette";
import { CursorSpotlight } from "@/components/interactive/CursorSpotlight";
import { HeroPortfolio } from "@/components/sections/HeroPortfolio";
import { WorkSection } from "@/components/sections/WorkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutPortfolio } from "@/components/sections/AboutPortfolio";
import { ContactPortfolio } from "@/components/sections/ContactPortfolio";
import { FooterPortfolio } from "@/components/sections/FooterPortfolio";
import { useDocumentMeta } from "@/i18n/useDocumentMeta";

/**
 * Portfolio hire-me (redesign 2026-07): sell the engineer, not the products.
 * The old Services/Projects/Stack/Process sections stay in the codebase but
 * are out of the home; the freelance door is a discreet line inside Contact.
 * See docs/redesign-brief-2026-07.md.
 */
export default function Home() {
  useDocumentMeta();

  return (
    <>
      <CursorSpotlight />
      <CommandPalette />
      <Navbar />
      <main>
        <HeroPortfolio />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutPortfolio />
        <ContactPortfolio />
      </main>
      <FooterPortfolio />
    </>
  );
}
