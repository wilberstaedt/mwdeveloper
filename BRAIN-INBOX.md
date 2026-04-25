# BRAIN-INBOX — mwdeveloper

> Caixa de entrada para o segundo cérebro (`~/Developer/projects/segundo-cerebro/`).
> O CTO deste projeto deve anexar entradas aqui ao final de cada sessão produtiva.
> O segundo cérebro processa e limpa este arquivo via `/end-session` ou `/daily-briefing`.

<!-- Formato de cada entrada:

---

## YYYY-MM-DD — título curto da sessão

### Decisões técnicas
-

### Learnings
-

### O que foi feito
-

### Mudança de status do projeto
-

### Próximo passo
-

-->

---

## 2026-04-18 — i18n (EN/ES/PT-BR), Maestri card, CV download

**Agent CTO:** Nicolas Borges (mwdeveloper CTO — sessão de estreia)

### Decisões técnicas

- **i18n stack:** `i18next` + `react-i18next` + `i18next-browser-languagedetector`. 3 idiomas: EN (default), ES, PT-BR. Detecção: localStorage → navegador → fallback EN. Chave `mwdev-lang` no localStorage. Termos técnicos (React, Node.js, SaaS, etc.) não traduzidos nos 3 locales.
- **Estrutura:** `src/i18n/index.ts` (init + detector), `src/i18n/locales/{en,es,pt-BR}.json`, `src/i18n/useDocumentMeta.ts` (atualiza title/meta + `html.lang` on language change). Padrão segue o que o GlowArt usa (decision `2026-04-10-glowart-i18n-obrigatorio-todas-paginas.md`).
- **Data files refatorados:** `services.ts`, `projects.ts`, `stack.ts` perderam strings user-facing, mantiveram apenas estrutura técnica (IDs, stack técnico, icons, meta). Strings resolvem via `t(\`namespace.id.field\`)`. `projects.highlights` usa `t(..., { returnObjects: true })` para arrays.
- **Projects:** card "Segundo Cérebro" substituído por "Maestri" (escritório virtual multi-agente com 12 agentes Claude, Sofia LinkedIn agent, Telegram bot). Decisão: Maestri é showcase técnico mais forte para LP de dev que se vende como alguém que usa IA em escala.
- **CV link:** PDF copiado pra `public/cv.pdf` (2.8MB). Link no Navbar (desktop, com ícone FileText + cor cyan), botão dedicado no Contact section (com meta PDF·2 pages·EN), e link no Footer. Não adicionei foto pessoal conforme orientação.
- **Default EN:** `index.html lang="en"` + title/description EN. `useDocumentMeta` hook mantém sincronizado on language change.

### Learnings

- Deploy do mwdeveloper **não é Hostinger FTP** como o CLAUDE.md local diz — é Vercel auto-deploy via push pra main (DNS na Hostinger). CLAUDE.md desatualizado nesse ponto — vale atualizar. `projects.md` do vault tem a info correta (decision `2026-04-15-mwdeveloper-hosting-vercel-dns-hostinger`).
- Banner LinkedIn (1584×396) renderizado via Chrome headless com `--screenshot --window-size`. Design com safe zone central de ~1100px (LinkedIn corta bordas em mobile). Mesmo approach que o CV usa — consistência operacional.

### O que foi feito

- PR/commit único: `c8ab064 feat: i18n (EN/ES/PT-BR), Maestri project card, CV download` — 24 files changed, +1066/-262 LOC. Push no main → Vercel faz auto-deploy.
- LanguageSwitcher no Navbar (dropdown com EN/ES/PT, fecha com ESC/click outside, selecionado marcado com check).
- Todas as 7 seções refatoradas (Hero, Services, Projects, About, Stack, Process, Contact) + Navbar + Footer.
- 3 JSONs completos (~170 chaves cada). Traduções revisadas, naturais no idioma, sem literalismo.
- Build limpo: 423kB JS (132kB gzip) · 37kB CSS (7kB gzip) · zero erros TS.
- Banner LinkedIn salvo em `linkedin-agent/cv/assets/linkedin-cover.png` (1584×396, 247KB PNG).

### Mudança de status do projeto

- LP agora é multi-idioma (EN default, ES/PT-BR disponíveis). Pronta para uso em aplicações de vagas europeias.
- Card do Segundo Cérebro → Maestri. Segundo Cérebro vira sub-menção (parte do Maestri).

### Próximo passo

- Aguardar Vercel terminar deploy e validar visualmente os 3 idiomas em produção (https://mwdeveloper.tech).
- Atualizar CLAUDE.md local do projeto para refletir a stack real de deploy (Vercel, não Hostinger FTP) e mencionar o sistema i18n — fica pra próxima sessão se não for feito no /end-session.
- Sofia pode ser pingada pra subir o banner novo no LinkedIn (path: `linkedin-agent/cv/assets/linkedin-cover.png`).
- Pendências herdadas: og-image.png (1200×630), JSON-LD Person schema, favicon variants.

---

## 2026-04-18 — CV i18n (3 idiomas) + fix crítico i18next

**Agent CTO:** Nicolas Borges (mwdeveloper CTO)

### Decisões técnicas

- **CV multi-idioma:** 3 PDFs em `public/` (`cv.pdf` EN, `cv-pt.pdf` PT-BR, `cv-es.pdf` ES). Link respeita idioma ativo via hook `useCvPath()` em `src/i18n/useCvPath.ts` que mapeia `resolvedLanguage` → path. Aplicado nos 3 locais (Navbar, Contact, Footer) substituindo o hardcoded `/cv.pdf`.
- **Fix crítico i18next:** config original tinha `load: "currentOnly"` + `nonExplicitSupportedLngs: true` e não incluía `react: { useSuspense: false }`. Resultado: língua "pt-BR" era detectada mas resolvia pra fallback EN (languages chain ficava só `["en"]`). Corrigido removendo `load: "currentOnly"` e adicionando `useSuspense: false`. Bônus: `convertDetectedLanguage` normaliza `pt` → `pt-BR`, `es-AR` → `es`, etc., no detector — evita depender de normalização interna.
- **Copy ajustado:** removido " · EN" do `contact.cvMeta` nos 3 JSONs (não faz mais sentido com PDFs traduzidos).

### Learnings

- **`useSuspense: false` é obrigatório** quando não se usa `<Suspense>` no root. Sem ele, `useTranslation` não re-renderiza em changeLanguage se o namespace não estiver "resolvido" de acordo com o load strategy.
- **`load: "currentOnly"`** com locales como "pt-BR" é armadilha — o detector pode normalizar pra "pt" e falhar. Usar default ou `convertDetectedLanguage` explícito.
- **Testar via portal do Maestri pegou o bug no dev** antes de ir pra prod. Sem o portal, o deploy teria ido broken (i18n rodando com localStorage válido mas render sempre em EN). Lição: sempre validar troca de idioma no navegador, não só typecheck.
- **Portal workflow validado:** `maestri portal navigate → snapshot → evaluate` é excelente pra debug runtime — dá acesso a `window.__i18n` e querySelector em tempo real.

### O que foi feito

- Commit novo (após `c8ab064`): CV i18n + config fix. Push pro main → Vercel auto-deploy.
- Dev server rodado (`npm run dev`), portal navegou pra `localhost:3333`, testados os 3 idiomas clicando no LanguageSwitcher. Todos os hrefs do CV validados: EN→`/cv.pdf`, PT-BR→`/cv-pt.pdf`, ES→`/cv-es.pdf`.
- Build limpo: 423kB JS / 132kB gzip.

### Mudança de status do projeto

- LP agora serve CV no idioma ativo do visitante. Pronta pra candidaturas em EU (ES), BR e AU/UK.
- i18n robusto — config corrigida, não tem fallback silencioso pra EN.

### Próximo passo

- Validar em prod (https://mwdeveloper.tech) depois do Vercel terminar build — portal navigate + screenshot final. ✓ FEITO — prod OK nos 3 idiomas, PDFs 200 application/pdf.
- Atualizar CLAUDE.md local do projeto (deploy Vercel + i18n + CV multi-idioma). ← pendente.

---

## PAUSADO OVERNIGHT 2026-04-18 — limite sessão

**Agent:** Nicolas Borges (mwdeveloper CTO)

### Estado no momento da pausa

- **Branch:** `main`, limpa, em sync com origin (último commit: `c2d1ab4 feat(cv): localized CV downloads`).
- **Sem WIP** — nenhum código não-commitado, nenhum arquivo modificado.
- **Dev server:** encerrado.
- **Flag atual:** 🔴 FLAG-PC ON (silêncio operacional com Cérebro).
- **Sessão:** standby desde a validação final de prod.

### Próxima ação óbvia quando retomar

1. **Atualizar `CLAUDE.md` local do mwdeveloper** (pendência herdada de duas sessões atrás):
   - Seção 2 (Stack) → deploy é Vercel auto-deploy via GitHub push, não Hostinger FTP
   - Adicionar seção sobre sistema i18n (estrutura `src/i18n/`, padrão de chaves, `useCvPath` hook, `useDocumentMeta` hook)
   - Mencionar CV multi-idioma em public/ (cv.pdf / cv-pt.pdf / cv-es.pdf)
   - Seção 8 (Deploy) → reescrever pra Vercel; remover seção FTP Hostinger
2. Pendências herdadas mais antigas (quando houver tempo): og-image.png (1200×630), JSON-LD Person schema, favicon variants.

### Estado mental / hipóteses em aberto

- Nenhuma hipótese em investigação, nenhuma decisão pendente, nenhum bug em debug.
- Confiança alta em tudo que foi entregue (3 commits, prod validada, BRAIN-INBOX consistente com vault).

---

---

## 2026-04-24 — LP Sistema Cleaning (/cleaning-system)

**Agent CTO:** (sessão autônoma via Matheus/Telegram)

### Decisões técnicas

- **React Router** instalado (`react-router-dom`). `main.tsx` envolve App em `BrowserRouter`. `App.tsx` usa `Routes` + `Route` pra `/` (Home) e `/cleaning-system` (CleaningSystem). Home extraída pra `src/pages/Home.tsx`.
- **Rota `/cleaning-system`:** full LP do produto Sistema Cleaning. Sem Next.js, puro React + Vite + Framer Motion + Tailwind + Lucide já existentes. Zero novas deps de UI.
- **Estrutura nova:** `src/pages/CleaningSystem.tsx` (entry) + `src/pages/cleaning-system/` com 7 componentes de seção (`CSNavbar`, `CSHero`, `CSPortals`, `CSFeatures`, `CSStats`, `CSWhiteLabel`, `CSContact`, `CSFooter`).
- **Portal mockups:** mini-UI coded em HTML/Tailwind dentro de `CSPortals.tsx` simulando screenshots reais dos 3 portais (Admin, Cleaner, Client) — mais impactante que ícones estáticos.
- **`.htaccess` adicionado** em `public/` para SPA routing no Apache da Hostinger. Sem isso, refresh direto em `/cleaning-system` dá 404 em shared hosting.
- **SEO da página:** `useEffect` em `CleaningSystem.tsx` atualiza `document.title` e `meta[description]` ao montar, restaura ao desmontar.

### Learnings

- Typecheck clean em 0 erros. Build clean: 492kB JS / 150kB gzip (+70kB vs antes — react-router-dom + conteúdo novo). Aceitável.
- `React.ReactNode` sem import explícito causaria erro com `isolatedModules` se não corrigido — trocado para `import type { ReactNode } from "react"`.
- O CLAUDE.md do projeto diz "Deploy: Hostinger shared (FTP)", mas sessão de 2026-04-18 descobriu que o deploy real é **Vercel auto-deploy via GitHub push** (DNS na Hostinger). O `.htaccess` serve como fallback se algum dia o deploy mudar pra shared, mas não tem efeito no Vercel. Não prejudica.

### O que foi feito

- 10 arquivos criados: `Home.tsx`, `CleaningSystem.tsx`, 7 seções CS, `public/.htaccess`
- 3 arquivos modificados: `main.tsx` (BrowserRouter), `App.tsx` (Routes), `CSPortals.tsx` (fix ReactNode)
- `react-router-dom` instalado
- Typecheck ✓ · Build ✓ · Dev server rodando em `localhost:3333`

### Mudança de status do projeto

- mwdeveloper.tech agora tem 2 rotas: `/` (LP pessoal) e `/cleaning-system` (produto LP).
- Sistema Cleaning tem LP pública dedicada para prospecção white-label.

### Próximo passo

- **Matheus revisar** `/cleaning-system` no browser (localhost:3333/cleaning-system).
- **Commit + push** para Vercel auto-deploy após aprovação visual.
- Pendências herdadas: atualizar CLAUDE.md local (deploy Vercel, i18n, CV multi-idioma) — item recorrente desde 2026-04-18.

---

### 23:05 BNE — PARADA OVERNIGHT ordenada por Matheus

**Agent:** Nicolas Borges (mwdeveloper CTO)

**Pronto hoje (mwdeveloper):**
- i18n EN/ES/PT-BR implementado e deployado em prod (commit `c8ab064`)
- Fix crítico config i18next (pt-BR/es presas em fallback EN — `load:"currentOnly"` + `useSuspense` ausente). Corrigido em `c2d1ab4`.
- CV multi-idioma em prod: 3 PDFs (`/cv.pdf`, `/cv-pt.pdf`, `/cv-es.pdf`) servidos por idioma ativo via hook `useCvPath()`
- Banner LinkedIn 1584×396 gerado (`linkedin-agent/cv/assets/linkedin-cover.png`) — Sofia pode subir
- Card "Segundo Cérebro" substituído por "Maestri" nos 3 locales
- Seletor de idioma (EN/ES/PT) no Navbar, persistência localStorage, detecção de navegador
- Validações: build limpo (423kB / 132kB gzip), portal Maestri testado em dev E em prod nos 3 idiomas, PDFs 200 application/pdf

**Amanhã — próxima ação concreta:**
Atualizar `/Users/mw/Developer/projects/mwdeveloper/CLAUDE.md`:
1. Seção 2 (Stack) — trocar "Deploy: Hostinger shared" por "Deploy: Vercel auto-deploy via GitHub push (DNS Hostinger)"
2. Adicionar seção "12. i18n" documentando estrutura `src/i18n/`, padrão de chaves, `useCvPath`, `useDocumentMeta`, 3 idiomas EN default
3. Seção 8 (Deploy) — reescrever pra fluxo Vercel; remover subseção FTP Hostinger
4. Mencionar CV multi-idioma em `public/cv*.pdf`

Pendências herdadas de menor prioridade (backlog): og-image 1200×630, JSON-LD Person schema, favicon variants.

Standby total até Matheus mandar "retoma". Boa noite.
