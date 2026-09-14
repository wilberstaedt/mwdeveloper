/* Medicao do Google Ads, com consentimento primeiro.

   Visitantes em Espanha: sem "aceito" nao se carrega o gtag.js nem se grava
   cookie nenhum (LSSI + RGPD, e o Consent Mode v2 que o Google exige na UE).
   Implementacao "basica" de proposito: perde-se a conversao de quem recusa, em
   troca de nao haver pedido nenhum ao Google antes do consentimento.

   Os identificadores vem do ambiente da Vercel. Sem VITE_GADS_ID nao ha tag,
   nao ha banner e nao ha pedido a terceiros - o site nao pede consentimento
   para uma coisa que nao faz. */

const GADS_ID = (import.meta.env.VITE_GADS_ID as string | undefined)?.trim() || "";
const LABELS = {
  whatsapp: (import.meta.env.VITE_GADS_LABEL_WHATSAPP as string | undefined)?.trim() || "",
  email: (import.meta.env.VITE_GADS_LABEL_EMAIL as string | undefined)?.trim() || "",
} as const;

export type Conversao = keyof typeof LABELS;
export type Consentimento = "aceite" | "recusado";

const CHAVE = "mwdev-consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export const medicaoConfigurada = GADS_ID !== "";

export function lerConsentimento(): Consentimento | null {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === "aceite" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

let carregado = false;

function carregarTag() {
  if (carregado || !medicaoConfigurada) return;
  carregado = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GADS_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GADS_ID)}`;
  document.head.appendChild(s);
}

export function guardarConsentimento(v: Consentimento) {
  try {
    localStorage.setItem(CHAVE, v);
  } catch {
    /* modo privado: a escolha vale so para esta visita */
  }
  if (v === "aceite") carregarTag();
}

/** Chamar no arranque da pagina: retoma a escolha de uma visita anterior. */
export function iniciarMedicao() {
  if (lerConsentimento() === "aceite") carregarTag();
}

/** Regista a conversao so se houve consentimento e o rotulo existe. */
export function registarConversao(tipo: Conversao) {
  const label = LABELS[tipo];
  if (!carregado || !label || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${GADS_ID}/${label}` });
}
