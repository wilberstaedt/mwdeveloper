# MW Developer — Landing Page

> Landing page pessoal de Matheus Wilberstaedt (MW Dev). Apresenta posicionamento profissional, produtos próprios e ponto de contato. Domínio de produção: `mwdeveloper.tech` (Hostinger).

---

## 0. Regras globais

- **Idioma do site:** Português (BR) por padrão, com termos técnicos em inglês quando natural (ex: "Full Stack", "SaaS", "white-label").
- **Idioma do código/commits:** Inglês.
- **Tom de voz:** Direto, prático, sem bullshit. "Colega que entende do assunto", não consultor corporativo. Sem oversell, sem jargão desnecessário, sem promessas vagas.
- **Segundo cérebro:** Toda decisão estratégica deste projeto é registrada em `/Users/mw/Developer/projects/segundo-cerebro/_decisions/`. Mudanças relevantes atualizam `_knowledge/projects.md` e `_memory/current-state.md`.

---

## 1. Objetivo

Apresentar o Matheus como desenvolvedor full-stack que constrói produtos do zero. A LP serve para:

1. **Credibilidade técnica** — quem vê o site precisa sair com a sensação "esse cara constrói coisa séria e sabe o que faz".
2. **Showcase de produtos** — Sistema Cleaning (GlowArt, em produção na AU) e FourHub (marketplace em desenvolvimento, lançamento set/2026).
3. **Captação de contato** — prospects que queiram:
   - Contratar para projetos (SaaS, apps, web)
   - Usar o Sistema Cleaning como white-label
   - Parcerias / investimento / convite profissional
4. **Ponto de presença digital** para quando aplicar a vagas dev remoto na Europa a partir de jul/2026.

Não é um portfolio de agência. É uma LP de dev solo com produtos reais.

---

## 2. Stack

- **Build:** Vite 6
- **Framework:** React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`) com tokens CSS custom properties
- **Animações:** Framer Motion (motion v11+)
- **Ícones:** Lucide React (sem emoji como ícone)
- **Fontes:** Google Fonts — JetBrains Mono (headings/mono) + DM Sans (body)
- **Deploy:** Hostinger shared (build estático, upload da pasta `dist/`)
- **Domínio:** `mwdeveloper.tech`

### Decisões de stack

- Vite ao invés de Next.js: LP estática sem backend, sem SSR necessário. Menos complexidade, build mais rápido, deploy simples em shared hosting.
- Tailwind v4 com `@theme` em CSS: mais simples que `tailwind.config.js`, suporta CSS variables nativamente, alinhado com brand tokens.
- Sem CMS: conteúdo em arquivos TS (`src/data/`). Baixo volume, baixa frequência de mudança.
- Sem back-end: contato via mailto e WhatsApp link. Quando precisar de form com anti-spam, avaliar Web3Forms ou Formspree.

---

## 3. Estrutura

```
mwdeveloper/
├── CLAUDE.md                 ← Você está aqui
├── brand.html                ← Brand reference (manter como doc visual)
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json · tsconfig.node.json
├── postcss.config.js
├── public/
│   ├── favicon.svg           ← Logo MW (ícone)
│   ├── og-image.png          ← Open Graph (gerar depois)
│   └── robots.txt
└── src/
    ├── main.tsx              ← Bootstrap React
    ├── App.tsx               ← Compõe todas as sections
    ├── index.css             ← Tailwind + @theme tokens + globals
    ├── lib/
    │   └── utils.ts          ← cn() helper
    ├── data/
    │   ├── projects.ts       ← Sistema Cleaning, FourHub, etc.
    │   ├── services.ts       ← O que ele entrega
    │   └── stack.ts          ← Tecnologias que usa
    └── components/
        ├── layout/
        │   ├── Navbar.tsx
        │   └── Footer.tsx
        ├── sections/
        │   ├── Hero.tsx
        │   ├── Services.tsx
        │   ├── About.tsx
        │   ├── Projects.tsx
        │   ├── Stack.tsx
        │   ├── Process.tsx
        │   └── Contact.tsx
        └── ui/
            ├── Logo.tsx          ← SVG logo MW reutilizável
            ├── GridBackground.tsx
            ├── Badge.tsx
            ├── Reveal.tsx         ← Wrapper framer-motion
            └── NoiseTexture.tsx
```

---

## 4. Brand (source of truth: `brand.html`)

### Cores

| Nome | Uso | Hex |
|---|---|---|
| Electric Blue | Primary | `#0066FF` |
| Cyan | Accent / axis | `#00D4FF` |
| Void | Background | `#06060C` |
| Card | Surface | `#0C0C14` |
| Border | Divisor sutil | `rgba(255,255,255,0.06)` |
| Text | Body | `#B8B8CC` |
| Text Dim | Label/meta | `#555566` |
| White | Heading | `#E8E8F0` |
| Cloud | Light surface | `#F2F2F8` |

### Fontes

- **Headings / code / meta:** `JetBrains Mono` (600/500/400)
- **Body / UI:** `DM Sans` (400/500/600/700)

### Logo

SVG diamante MW + W (em `brand.html` linhas 420-450). Conceito: M/W formando diamante com axis central ciano. Representa dualidade do full-stack. Reutilizar como componente React (`<Logo />`).

### Style

- Dark mode nativo (sem light mode — decisão: LP é premium/tech, light mode adiciona complexidade sem retorno).
- Grid backgrounds sutis no hero.
- Radial gradients azuis/ciano bem sutis no background.
- Shadows de drop-shadow azul no logo.
- Border radius: `12px` padrão, `16px` em cards grandes, `6px` em ícones pequenos.
- Animações Framer Motion: fade + translateY, duration 0.6-0.8s, ease-out. Respeitar `prefers-reduced-motion`.

---

## 5. Seções da LP

Ordem final:

1. **Navbar** (sticky, translúcido)
   - Logo + wordmark
   - Nav: Work · Services · About · Contact
   - Badge "Available" (pulse verde)

2. **Hero**
   - Eyebrow mono: `AVAILABLE FOR PROJECTS · BRISBANE → VALENCIA`
   - Title: "Eu construo produtos. Do primeiro commit ao primeiro cliente."
   - Sub: descrição em 1-2 linhas
   - CTAs: "Ver trabalhos" (scroll) + "Me chamar no WhatsApp"
   - Logo diamante grande animado
   - Grid background + gradient

3. **Services / O que eu entrego**
   - 4 cards com foco no valor entregue (não lista de tecnologias)
     1. SaaS & Web Apps do Zero
     2. Apps Mobile (React Native / Expo)
     3. SaaS White-Label (ex: Sistema Cleaning)
     4. Consultoria Técnica & Product Review

4. **About / Quem sou eu**
   - Narrativa curta em 2 parágrafos
   - Stats: 5 anos dev · 2 produtos em produção · 100% remoto
   - Localização + timezone
   - Lista compacta de skills core

5. **Projects / Work** (Bento grid)
   - **GlowArt** (Sistema Cleaning — LIVE na AU) — featured, colSpan 2
   - **FourHub** — marketplace de veículos SC/BR
   - **Segundo Cérebro** — sistema pessoal Obsidian+Claude Code (projeto next-gen)
   - Cada card: título, status, descrição 1-2 linhas, stack tags, link (quando público)

6. **Stack / Toolbelt**
   - Grid de tecnologias organizadas por camada: Frontend · Backend · Infra · Tools
   - Tag visual compacto, sem logos complicados

7. **How I work / Processo**
   - 4 passos: Conversa → Proposta → Build → Suporte
   - Foco em ship rápido e transparência

8. **Contact**
   - Title: "Bora construir algo?"
   - 2 botões: Email (mailto:) + WhatsApp (wa.me link)
   - Available indicator + fuso horário atual
   - Nota sobre disponibilidade

9. **Footer**
   - Logo + tagline
   - Links (GitHub, LinkedIn se tiver)
   - Copyright + "Made with Claude Code"

---

## 6. Conteúdo / Copy rules

- Escrever em PT-BR, com termos técnicos em EN quando natural.
- Frases curtas, sem rodeio.
- **Evitar:** "revolucionário", "solução completa", "disruptivo", "otimização de workflows", "transforme seu negócio". Qualquer oversell.
- **Usar:** "construo", "entrego", "shipo", "rodando em produção", "cliente usando no dia a dia", verbos concretos.
- Prova social sempre concreta ("GlowArt usa desde 2026" > "vários clientes satisfeitos").
- Sem dados inventados. Se não tiver métrica, não forja. Ex: "X clientes atendidos" só se for real.

---

## 7. Contato

- **Email:** `wilberstaedtt@gmail.com`
- **WhatsApp:** (preencher depois — pedir ao Matheus)
- **Timezone atual:** AEST (Brisbane, UTC+10) — até 14/06/2026
- **Timezone futuro:** CET (Valencia, UTC+1) — a partir de 22/06/2026

---

## 8. Deploy

### Desenvolvimento local

```bash
npm install
npm run dev    # http://localhost:5173
```

### Build de produção

```bash
npm run build    # gera dist/
npm run preview  # testa o build localmente
```

### Deploy na Hostinger

1. Rodar `npm run build`
2. Upload do conteúdo da `dist/` via FTP para a pasta do domínio `mwdeveloper.tech` na Hostinger shared
3. Verificar se `index.html` está na raiz pública
4. Configurar redirect www → non-www (ou vice-versa) na Hostinger se necessário
5. HTTPS automático via Let's Encrypt da Hostinger

### DNS (caso precise apontar)

Se o domínio ainda não estiver apontado para a shared:
- Hostinger hPanel → DNS → apontar A record para o IP da shared hosting
- Ou usar os nameservers da Hostinger: `ns1.dns-parking.com` / `ns2.dns-parking.com`

---

## 9. Performance / SEO

- Imagens: preferir SVG inline (logo), WebP para raster, `loading="lazy"` para below-the-fold.
- `<title>` e `<meta name="description">` definidos no `index.html`.
- Open Graph tags: og:title, og:description, og:image, og:url.
- JSON-LD Person schema para ajudar buscadores.
- `lang="pt-BR"` no `<html>`.
- `prefers-color-scheme` respeita dark por padrão.
- `prefers-reduced-motion` reduz/remove animações.
- Lighthouse target: 90+ em todas as categorias.

---

## 10. Próximos passos (depois do v1)

- [ ] Gerar `og-image.png` (1200×630) no style do brand
- [ ] Pedir número WhatsApp ao Matheus e adicionar
- [ ] Confirmar usernames GitHub/LinkedIn para footer
- [ ] Adicionar favicon com variantes (favicon.ico, apple-touch-icon.png)
- [ ] JSON-LD Person schema
- [ ] Google Analytics ou Plausible (opcional, privacidade-first)
- [ ] Versão EN da LP (para aplicar a vagas europeias depois de julho)
- [ ] Blog / writing section (se começar a escrever sobre produtos e dev solo)

---

## 11. Convenções de código

- **TypeScript strict** — `"strict": true` no `tsconfig`.
- **No `any`** — prefira `unknown` ou tipar corretamente.
- **Componentes funcionais** apenas, sem classes.
- **Arquivos:** PascalCase para componentes (`Hero.tsx`), camelCase para utils (`utils.ts`).
- **Imports:** absolute via alias `@/` (configurado no `vite.config.ts` e `tsconfig.json`).
- **Props:** definir interface explícita para cada componente.
- **Comentários:** apenas quando o porquê não for óbvio pelo código. Nunca comentar o que já está claro.
- **Acessibilidade:** `aria-label` em botões icon-only, focus states visíveis, contraste ≥4.5:1.

---

*Última revisão: 2026-04-15. Atualizar este arquivo quando a arquitetura ou conteúdo mudar.*
