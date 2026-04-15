export const contact = {
  email: "wilberstaedtt@gmail.com",
  whatsapp: "61410501923",
  whatsappDisplay: "+61 410 501 923",
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
