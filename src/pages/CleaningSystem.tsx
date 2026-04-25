import { useEffect } from "react";
import { CSNavbar } from "./cleaning-system/CSNavbar";
import { CSHero } from "./cleaning-system/CSHero";
import { CSPortals } from "./cleaning-system/CSPortals";
import { CSFeatures } from "./cleaning-system/CSFeatures";
import { CSStats } from "./cleaning-system/CSStats";
import { CSWhiteLabel } from "./cleaning-system/CSWhiteLabel";
import { CSPricing } from "./cleaning-system/CSPricing";
import { CSContact } from "./cleaning-system/CSContact";
import { CSFooter } from "./cleaning-system/CSFooter";

export default function CleaningSystem() {
  useEffect(() => {
    document.title = "Sistema Cleaning — Gestão completa para empresas de limpeza · MW Dev";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Sistema SaaS white-label para empresas de limpeza. 3 portais (admin, cleaner, cliente), invoices em PDF, chat integrado, audit logs. Hoje rodando pela GlowArt na Austrália.",
      );
    }
    return () => {
      document.title = "MW Dev — Construo produtos do primeiro commit ao primeiro cliente";
    };
  }, []);

  return (
    <>
      <CSNavbar />
      <main>
        <CSHero />
        <CSPortals />
        <CSFeatures />
        <CSStats />
        <CSWhiteLabel />
        <CSPricing />
        <CSContact />
      </main>
      <CSFooter />
    </>
  );
}
