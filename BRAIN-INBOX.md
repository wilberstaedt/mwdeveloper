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

> **Última consolidação no vault:** 2026-07-09 (entradas de 03-04/05 processadas: rota /flow live, auditoria autônoma + og-image/JSON-LD/sitemap/favicons/PWA, i18n QA, a11y 100, Lighthouse mobile 86/100/100/100. Pendências levadas pro `_knowledge/projects.md` do vault.)
>
> **Pendência recorrente desde 2026-04-18:** atualizar CLAUDE.md local do projeto pra refletir Vercel auto-deploy (não Hostinger FTP), i18n, CV multi-idioma e token `--color-text-dim #8a8a9e` (brand.html/CLAUDE.md ainda têm `#555566`).

---

## [2026-07-12] — Retomada pós-restart: interativos + i18n 5 línguas + preview no Vercel

### Decisões técnicas
- Hero em 2 zonas: nome em largura total (impacto tipográfico), grid lead/CTAs + terminal só abaixo dele - resolve overflow do "Wilberstaedt." sobre o painel do terminal em 1440px
- FR/DE são locales mínimos (só `p.*` + nav.cv/common.available/language.label); todo o resto cai no fallback EN do i18next - evita traduzir o site legado que saiu da home
- meta.title normalizado pra hífen simples nas 5 línguas (guardrail do Matheus: sem em-dash)
- Traduções: fan-out de 4 agentes + review nativo por língua + validação local (paridade de chaves, brand safety GlowArt/Samba, placeholders, números intocáveis) - tudo passou

### Learnings
- Workflow: `args` passado como string JSON quebra `args.keys` no script (fica string, não objeto) - os agentes rodaram, o estágio de validação morreu; resultado recuperado inteiro do journal.jsonl sem re-rodar (403k tokens salvos)
- Screenshot fullPage com `whileInView` rende seções pretas - é artefato (IntersectionObserver não dispara); rolar por âncoras antes do fullPage resolve
- Token do Vercel CLI expirado ≠ bloqueio: a integração GitHub builda preview no push; URL pública vem de `gh api repos/.../deployments/<id>/statuses` (environment_url)

### O que foi feito
- HeroTerminal renderizado (coluna direita desktop + disclosure mobile), CommandPalette + CursorSpotlight montados no Home, botão ⌘K na Navbar
- Traduções p.* pra es/pt-BR + locales novos fr/de; SUPPORTED_LANGS/detector/useCvPath/LanguageSwitcher com 5 línguas
- Smoke Playwright 9/9 PASS (palette, terminal help/uptime, spotlight, switch ES) + screenshots desktop/mobile/por língua + test-ask (retrieval ok)
- Commit `0dbd305` na branch `redesign/portfolio-hire-me`, push, preview: https://mwdeveloper-4s3oiy638-wilberstaedts-projects.vercel.app

### Mudança de status do projeto
- Redesign hire-me EM PRODUÇÃO: Matheus dispensou o gate de aprovação ("pq já não tá em prod?"), merge `6b5393b` em main, www.mwdeveloper.tech verificado live (bundle novo + terminal respondendo em prod)

### Próximo passo
- CVs fr/de (hoje caem no EN), chrome do palette/terminal i18n (TODO-i18n), tuning do ask ("years of experience" retorna fato subótimo), sitemap/404/JSON-LD do brief, CLAUDE.md do repo reescrever

---

## [2026-07-13] — Terminal Lúmen AO VIVO + ask multilíngue + polish final EM PROD

### Decisões técnicas
- Terminal virou canal REAL com o Lúmen em 3 camadas: comandos locais → corpus semântico in-browser (multilíngue, 40 fatos, hallucination-proof) → ponte viva chat.mwdeveloper.tech (tunnel Cloudflare → Mac, worker claude -p Haiku com corpus fechado, ~5-20s)
- Cold-start ponte-primeiro: 1ª pergunta não espera o modelo de 50MB baixar; modelo esquenta em bg pras próximas
- Filtragem em 5 camadas antes de gastar token (CORS, validação, rate limit 6/h-sessão 12/h-IP 150/dia, heurística de abuso com deflexão canned, worker sem tools anti-injection). Doc completa: docs/lumen-terminal.md
- Caret: posicionamento por N×1ch em contexto sans causava drift; espelho de texto real (caret no fluxo) torna drift impossível
- CV REMOVIDO do site inteiro a pedido do Matheus (hero, navbar, contact, palette, terminal)

### Learnings
- Modelo multilíngue (paraphrase-multilingual-MiniLM-L12-v2) casa pergunta PT/ES/FR/DE com vetores EN direto; scores rodam mais baixos que o modelo EN-only (recalibrar thresholds) e paráfrases-pergunta embedadas por fato resolvem os misses (13/13 na suíte)
- Worker Haiku embeleza levemente mesmo com regra; saneamento determinístico no servidor (strip em-dash, cap) > confiar no prompt

### O que foi feito
- facts.i18n.ts (40 fatos × 4 línguas via fan-out de agentes), detectAskLang, aliases de retrieval, spinner braille + typewriter + caret solid-while-typing, print novo do FourHub repaginado, lumen-web-bridge (repo privado wilberstaedt/lumen-web-bridge, launchd com.mw.lumen-web-bridge, porta 8790)
- E2E em PROD: PT natural em 13s, fora-do-corpus honesto, abuso deflectido, caret 0px

### Próximo passo
- Acompanhar logs/conversations.md do bridge (perguntas reais de recrutadores viram candidatas a fatos novos no corpus)
- Se o volume crescer: digest diário das conversas via cron
