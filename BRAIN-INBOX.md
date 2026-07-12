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
- Redesign hire-me: de "seções construídas mas soltas" pra "preview completo no Vercel aguardando aprovação do Matheus pra merge em prod"

### Próximo passo
- Matheus aprova o preview → merge main = prod. Depois: CVs fr/de (hoje caem no EN), chrome do palette/terminal i18n (TODO-i18n), tuning do ask ("years of experience" retorna fato subótimo), sitemap/404/JSON-LD do brief, CLAUDE.md do repo reescrever
