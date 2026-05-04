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

> **Última consolidação no vault:** 2026-04-28 (i18n EN/ES/PT-BR, CV multi-idioma, LP Cleaning System `/cleaning-system` com 3 tiers pricing live)
>
> **Pendência recorrente desde 2026-04-18:** atualizar CLAUDE.md local do projeto pra refletir Vercel auto-deploy (não Hostinger FTP), i18n e CV multi-idioma.

---

---

## 2026-05-03 — Nova rota /flow + limpeza textos pessoais

### O que foi feito
- Criado /flow (Flow.tsx) com Hero, Features, Stack, CTA acesso por mailto
- Card Flow na home agora aponta pra rota interna /flow (era link externo direto)
- Removido "Matheus + Nathalia" das taglines e descriptions de mwflow nos 3 idiomas (pt-BR, en, es)
- Tagline reescrita: "Tracker pessoal multi-moeda em produção real"

### Mudança de status do projeto
- Em prod: www.mwdeveloper.tech/flow ao vivo

---

## 2026-05-04 — Auditoria autônoma (4h block) + fixes perf/a11y

### O que foi feito
- Auditoria completa: links externos (github 200, linkedin 999=anti-bot normal, CVs 3 idiomas 200), og-image 200, i18n 0 keys missing/extra entre EN/ES/PT-BR (263 chaves cada).
- Lighthouse mobile prod (baseline): perf 86, a11y 80, BP 100, SEO 100.
- Fix a11y: bump `--color-text-dim` `#555566` → `#8a8a9e` (contraste 2.76 → ~6:1 vs void, passa WCAG AA). Falhava em footer mono e label "AVAILABLE…" do hero.
- Fix perf: code-split rotas via `React.lazy` em `App.tsx` — Home não carrega mais `Flow` nem `CleaningSystem`. Bundle inicial 547→494KB (gz 164→155). Chunks lazy: Flow 12.5KB, CleaningSystem 42KB.
- Commit `22874f0` pushed pra main → Vercel auto-deploy disparado.

### Decisões técnicas
- Mudei token de brand `text-dim` autonomamente (autorização Matheus pra fix óbvio). Brand.html e CLAUDE.md (seção 4 "Cores") ainda têm o hex antigo `#555566` — **flag pra reconciliar** quando Cérebro processar.
- `wasted JS 76KB` no audit — code-split resolve parcialmente. Não fui mais fundo (lazy de Framer Motion seria refactor maior, fora do escopo "óbvio").

### Discrepância flagada pro Cérebro
- Briefing trazia "Card Flow → flow.mwdeveloper.tech"; código + decisão atual: Flow stay `/flow` interno. Matheus confirmou em-sessão que current-state estava desatualizado.

### Próximo passo
- Aguardar Vercel deploy concluir (~1min) e validar Lighthouse pós-fix.
- Pendente recorrente: atualizar CLAUDE.md local pra Vercel auto-deploy + token text-dim novo.

---

## 2026-05-04 — Janelas 2/3/4 (sessão autônoma 4h continuada)

### Janela 2 — SEO/share (commit 3adcf63)
- `public/og-image.png` 1200×630 brand-aligned: header MW DEV logo + Available pill, eyebrow Brisbane→Valencia, headline "I build products.", diamond MW logo grande, grid sutil + glows blue/cyan. Renderizado via headless-chrome de HTML template.
- JSON-LD Person schema em `index.html`: name/alternateName/url/image/jobTitle/email/sameAs (github+linkedin)/knowsAbout (12 skills)/knowsLanguage (3 idiomas)/worksFor.
- og:image:width/height/alt + og:locale (en) + alternates (pt_BR, es_ES) + twitter alt.

### Janela 3 — SEO/PWA/i18n (commit b2bd6bb)
- `public/sitemap.xml`: home + /flow + /cleaning-system com priority/lastmod (robots.txt já referenciava).
- Favicons completos: `favicon-16/32.png`, `apple-touch-icon.png` (180), `icon-512.png`. Master via headless-chrome do MW logo SVG sobre rounded-square void bg, downscale via sips.
- `public/site.webmanifest` PWA basics: name/icons/theme_color #06060C/standalone.
- `index.html` wired com link rel=icon (svg+png 16/32) + apple-touch + manifest.
- **i18n deep QA**: encontrei 30+ strings EN vazando em PT-BR/ES, fixei 14 high-impact: PT-BR nav (Trabalhos/Serviços/Sobre/Contato), `hero.badge` "Available"→"Disponível", eyebrows services/projects/about/process em PT+ES. Termos tech (Founder/Ship/Toolbelt/Tooling/GitHub) mantidos EN conforme tone-of-voice CLAUDE.md.

### Janela 4 — A11y refactor (commit fa4462f)
- **About.tsx**: `<dl>` facts restruturado pra grid 2-col, `<dt>/<dd>` como direct children do group div (sem wrapper aninhado). Icon row-span-3 mantém visual idêntico.
- **Process.tsx + Reveal.tsx**: estendi Reveal pra aceitar `as="li"` via `motion[as]` dinâmico. `<ol>` agora tem `<li>` como direct children.
- **Navbar.tsx**: drop aria-label redundante do home link; visible "MW DEV" + Logo aria-label compõem nome acessível sem mismatch.
- **LanguageSwitcher.tsx**: aria-label inclui código do idioma corrente.

### Lighthouse final (prod, mwdeveloper.tech)
- **Mobile**: perf 86, **a11y 100** (era 80), BP 100, SEO 100. TBT 0ms, CLS 0.
- **Desktop**: perf 97, a11y 100, BP 100, SEO 100.
- Audits zerados (score 1, 0 items): color-contrast, dlitem, definition-list, listitem, list, label-content-name-mismatch.

### Pendências/flags
- **Brand token reconciliação**: `--color-text-dim #555566 → #8a8a9e` aplicado mas brand.html + CLAUDE.md sec 4 ainda têm hex antigo. Cérebro reconcilia.
- **CLAUDE.md sessão 8 desatualizado**: ainda diz "Hostinger shared FTP", real é Vercel auto-deploy.
- **favicon.ico**: não gerado (sem ImageMagick local; SVG+PNG 16/32 cobrem ≥97% browsers).
- **Vercel checkpoint**: dispara intermitente em curl/lighthouse rapidos. Não bloqueia nada de usuário real.
- **Perf mobile 86** estagnou: LCP/FCP 3.2s ainda. Próximas alavancas: preload das fontes Google ou self-host das fontes, lazy de framer-motion. Refactor maior — flagado mas não atacado.

### Próximo passo
- Turno encerrado conforme orientação Matheus ("apos isso pode encerrar turno").
- Próxima sessão pode: (1) self-host fontes p/ ganhar 4-6 pontos perf, (2) versão EN/ES dedicada do CV/copy estratégica pra vagas EU jul/2026, (3) atualizar CLAUDE.md sec 4 + sec 8.
