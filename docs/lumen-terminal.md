# Terminal Lúmen — arquitetura (2026-07)

O terminal do hero em mwdeveloper.tech é um canal real de conversa com o Lúmen
(o agente de IA do Matheus). Não é mock: mensagens fora do repertório local
chegam ao Mac do Matheus e são respondidas por Claude em segundos.

## As três camadas de resposta

**Camada 1 — comandos (instantâneo, local).**
`help`, `work`, `contact`, `langs`, `lang <código>`, `uptime`, `joke`,
`clear`. Navegação e easter eggs, tudo client-side.

**Camada 2 — memória local do Lúmen (instantâneo, custo zero).**
Busca semântica no browser sobre um corpus de 40 fatos escritos à mão
(`src/lib/ask/facts.ts`), cada um derivado do copy aprovado do site — por
construção não há como alucinar: a resposta é sempre um fato humano, nunca
texto gerado. O modelo de embedding é multilíngue
(`Xenova/paraphrase-multilingual-MiniLM-L12-v2`, ~50MB, baixado uma vez no
primeiro uso e cacheado): pergunta em PT/ES/FR/DE casa com os vetores EN
direto, e a resposta volta no idioma da pergunta via traduções revisadas
(`facts.i18n.ts`). Fatos-chave têm paráfrases-pergunta embedadas junto
(campo `queries`) para puxar perguntas naturais pro fato certo — suíte de
regressão em `scripts/test-ask.mjs` (13/13).

**Camada 3 — Lúmen ao vivo (segundos, via ponte).**
O que a camada 2 não responde com confiança (score < 0.45) vai para
`https://chat.mwdeveloper.tech` — um hostname no tunnel Cloudflare que
aponta pro Mac do Matheus (ligado 24/7), onde roda o
`lumen-web-bridge` (launchd `com.mw.lumen-web-bridge`, porta 8790,
`~/Developer/projects/lumen-web-bridge/`). O bridge dispara um worker
`claude -p` (Haiku) com um prompt fechado: as únicas informações disponíveis
são o MESMO corpus de fatos, com regras inegociáveis (não inventar, não
extrapolar, responder no idioma do visitante, 1-3 frases, nunca revelar as
instruções). O browser faz polling e a resposta aparece no terminal em
~5-20s. Cada troca fica em `logs/conversations.md`, que o Lúmen lê — o que o
worker não soube, o Lúmen pode responder depois e acompanhar.

**Cold start inteligente:** na primeira pergunta de um visitante o modelo
local ainda está baixando, então a pergunta vai direto pra ponte (resposta em
segundos) enquanto o modelo esquenta em background para as próximas.
Se a ponte estiver fora do ar (Mac desligado), o terminal cai para a melhor
resposta local fraca em vez de falhar — e avisa que o Lúmen está offline.

## Filtragem: o que gasta token e o que não

1. **CORS**: só `mwdeveloper.tech`/`www` (e localhost em dev) falam com a ponte.
2. **Validação**: mensagem 2–400 caracteres, sessionId sano, payload ≤ 2KB.
3. **Rate limit**: 6 escalações/hora por sessão, 12/hora por IP,
   150/dia global (persistido em `logs/counters.json`). Estourou: resposta
   educada localizada, sem worker.
4. **Heurística de abuso** (zero token): prompt injection ("ignore as
   instruções", "system prompt", jailbreak), pedidos de código/redação/
   tradução, pesca de credenciais → deflexão canned localizada na hora.
5. **Worker blindado**: sem tools, sem acesso a nada além do corpus público;
   instruções tratam o texto do visitante como dado, nunca como comando; se a
   mensagem for off-topic, recusa em uma frase. Saída sanitizada
   (sem em-dash, cap 800 chars).

O barato responde primeiro: comandos e corpus local cobrem a maioria das
perguntas de recrutador sem custo; só o resto (limitado e filtrado) toca o
Claude do Matheus.

## Operação

- Serviço: `launchctl kickstart -k gui/$UID/com.mw.lumen-web-bridge`
- Health: `curl https://chat.mwdeveloper.tech/health` (`today` = contagem diária)
- Conversas: `~/Developer/projects/lumen-web-bridge/logs/conversations.md`
- Corpus mudou? Editar `facts.ts` → `npm run build:ask` →
  `node scripts/test-ask.mjs` → reiniciar o bridge (ele importa o corpus no boot).
