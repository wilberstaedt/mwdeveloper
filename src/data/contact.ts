export const contact = {
  email: "wilberstaedtt@gmail.com",
  /* Numero actual (Espanha) desde 13/09/2026. O +61 410 501 923 era o de
     Brisbane e continuava em todos os botoes de WhatsApp do site, incluindo a
     landing do Sistema Cleaning. */
  whatsapp: "34643731430",
  whatsappDisplay: "+34 643 731 430",
  github: "wilberstaedt",
  linkedin: "matheus-wilberstaedt",
  locationNow: "Brisbane · Austrália",
  locationNext: "Valencia · Espanha",
  moveDate: "junho 2026",
  timezoneNow: "AEST · UTC+10",
  timezoneNext: "CET · UTC+1",
} as const;

export const mailto = (subject = "Projeto novo") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

export const waLink = (text = "Oi Matheus, vi seu site.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
