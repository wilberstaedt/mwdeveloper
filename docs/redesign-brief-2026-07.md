# Redesign 2026-07 — mwdeveloper.tech vira PORTFOLIO hire-me

> Working doc do redesign (Lúmen, 12/07/2026). Fonte de verdade durante a construção.
> Pedido do Matheus: "me vender, não vender meus produtos" + "algo divertido" + EN primário
> com línguas da Europa. Referências: tamalsen.dev, ewan-kerboas.fr, robbowen.digital,
> brittanychiang.com.

## Direção visual (síntese das 4 referências)

- **Base:** dark cinematográfico já existente (void #06060c, blue #0066ff, cyan #00d4ff,
  DM Sans + JetBrains Mono) — EVOLUIR tokens, não trocar a marca.
- **Hero:** tipografia GIGANTE (Ewan/Tamal) — nome + role em display bold; acentos
  monospace (`// work`); badge vivo "Open to EU remote · Based in Spain (CET) ·
  Authorized to work in Spain" (primeira dobra = fuso + autorização).
- **Diversão (Robb) com disciplina (Brittany):** spotlight que segue o cursor; terminal
  interativo no hero (linhas ciclando); relógio CET vivo comparando com o fuso do
  visitante; command palette Cmd+K com easter eggs; micro-interações nos cards.
  Toda animação respeita prefers-reduced-motion (padrão já existe no repo).
- **Diferencial vs as 4 refs:** cases com PRODUTO REAL EM PRODUÇÃO + números reais.
  Nenhuma das referências tem "paying customers" como prova central. Nós temos.

## IA nova da Home (single-page, anchors)

1. **Hero** — nome enorme, role, positioning line aprovada, badge Spain/CET, CTAs
   (See work / Download CV lang-aware), socials, terminal playful.
2. **Proof strip** — números-âncora: 7+ years · ~160 invoices/mo automated ·
   ~10k app users (Figueirense) · 24/7 production, sole operator.
3. **Selected Work (cases)** — formato: problema → o que construí → stack → resultado
   com número → screenshot real:
   - Sistema Cleaning (flagship): multi-tenant SaaS, billing engine ~160 inv/mês,
     state machine de invoice, RBAC — print do admin ANONIMIZADO.
   - AI invoice pipeline (Amazon Bedrock, Essentia): hackathon → prod nacional,
     "still in production today"; visual abstrato/diagrama (sem print possível).
   - Samba/moving company site + CRM: WordPress→React cutover, CRM em construção.
   - FourHub: mobile marketplace RN/Expo — SEMPRE "Building", sem oversell.
   - Lúmen (fun case): AI second brain, orbe/grafo 3D — prova do posicionamento
     AI-augmented.
4. **Experience** — timeline: MW Developer (Founder, Nov/25–) · Essentia (Senior,
   Jun/23–Mar/26) · Zaztech (Intern→Mid, Jun/22–Jun/23) · Independent (2019–22,
   fábrica de biscoitos da família + Rocketseat). Bullets = cv-base-en condensado.
5. **Skills** — stack canônica agrupada; toda skill evidenciada em case (regra Remark).
6. **About** — humano/divertido: jornada BR→AU→ES (motivo visual 3 fusos), origem na
   fábrica de biscoitos, como é trabalhar comigo. Self-deprecating técnico permitido.
7. **Contact** — hire-me primário (email, LinkedIn, GitHub, CV); linha DISCRETA de
   freelance/orçamento ("I also take selected freelance projects") — não é a venda
   principal.
8. Footer.

## Copy — guardrails (do dossiê Turney, NÃO violar)

- ZERO fabricação. Números permitidos: 7+ years (software development, NUNCA
  "professional") · ~160 invoices/mo · ~80 recurring clients · ~10,000 Figueirense
  members · 18 meses sole remote dev com 12h de gap · 2 paying customers ·
  mid→senior em ~3 meses · intern→mid com 2 promoções em 1 ano · 24/7 sem DevOps.
- PROIBIDO: "GlowArt" (usar "Sistema Cleaning" / "a Brisbane-based cleaning company");
  "Samba" no TEXTO dos cases (usar "an Australian moving company"; screenshot/link do
  site público ok — precedente do site atual); valores de contrato (A$2.400 etc.);
  números Essentia 1.700/130/10+ (SEM FONTE no vault — não usar).
- FourHub = "Building". Posicionamento IC/founder, nunca gerencial.
- Headline aprovada: "I ship production SaaS end-to-end — from architecture to paying
  customers, amplified by AI-driven development."
- Tom: direto, técnico, com número; auto-promoção estruturada (mercado internacional
  espera); sem tom guru/oversell.

## Idiomas

EN (default) + ES + PT-BR (existem) + **FR + DE (novos)**. i18next já configurado
(SUPPORTED_LANGS, mwdev-lang). CVs: EN/ES/PT existem; FR/DE caem no fallback EN
(useCvPath). hreflang + meta por idioma.

## Preservar (do mapa do repo)

i18n infra completa · useCvPath · useDocumentMeta · JSON-LD Person (estender) ·
og-image/favicons/webmanifest · padrões a11y (dl/ol, aria, focus ring, reduced-motion)
· tokens @theme em src/index.css · vercel.json SPA rewrite · rotas /cleaning-system e
/flow continuam existindo mas SAEM da navegação principal (viram detalhe/legado).

## Descartar/rework

Services section da Home (pivot hire-me) · CLAUDE.md stale (reescrever ao final) ·
public/.htaccess · sitemap regenerar · adicionar rota 404.

## Fluxo de entrega

Branch `redesign/portfolio-hire-me` → push → Vercel preview URL → screenshots pro
Matheus aprovar → merge main (prod). Lighthouse alvo: manter a11y 100, perf ≥ atual.
