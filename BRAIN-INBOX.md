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

- Validar em prod (https://mwdeveloper.tech) depois do Vercel terminar build — portal navigate + screenshot final.
- Atualizar CLAUDE.md local do projeto (deploy Vercel + i18n + CV multi-idioma).
