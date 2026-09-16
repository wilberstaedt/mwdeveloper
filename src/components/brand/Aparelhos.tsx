import { motion, type MotionValue } from "framer-motion";

/**
 * AS MOLDURAS (16/09/2026).
 *
 * Um portátil e um telemóvel desenhados em CSS, sem imagem nem marca de
 * ninguém. Saíram do CinemaLanding para aqui quando a landing de captação
 * passou a mostrar a mesma demonstração: o desenho é o mesmo, só muda o que
 * lhes corre lá dentro — um iframe vivo na home, uma captura na landing, que
 * tem de carregar depressa porque recebe tráfego pago.
 */

/* PORTÁTIL. Tudo CSS, sem imagem nem marca de ninguém.
   A tampa roda sobre a aresta de baixo; por baixo dela ficam, por esta ordem,
   a dobradiça (escura, da largura da tampa), a base em cunha (mais larga, com
   o entalhe do dedo à frente) e a sombra de contacto. Foi o que faltava na
   primeira versão: sem dobradiça nem sombra, a barra clara parecia solta. */
export function MacBook({
  url,
  conteudo,
  rotacao,
  ecraOpacity,
  capaOpacity,
}: {
  url: string;
  conteudo: React.ReactNode;
  rotacao?: MotionValue<number>;
  ecraOpacity?: MotionValue<number>;
  capaOpacity?: MotionValue<number>;
}) {
  return (
    <div className="relative w-full" style={{ perspective: 2000 }}>
      {/* TAMPA */}
      <motion.div
        style={
          rotacao ? { rotateX: rotacao, transformOrigin: "bottom center", transformStyle: "preserve-3d" } : undefined
        }
        className="relative z-10 rounded-[10px] bg-[linear-gradient(175deg,#c9ced6_0%,#8e949d_18%,#5c626b_55%,#31353b_100%)] p-[1.5px] shadow-[0_60px_130px_-45px_rgba(0,102,255,.5)] md:rounded-[18px] md:p-[2.5px]"
      >
        <div className="relative rounded-[9px] bg-[#0a0a0d] p-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,.07)] md:rounded-[16px] md:p-[10px]">
          {/* Câmara */}
          <span className="absolute left-1/2 top-[1.5px] h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-[#22252b] md:top-[4px] md:h-[4px] md:w-[4px]" />
          <motion.div style={ecraOpacity ? { opacity: ecraOpacity } : undefined} className="aspect-[16/10] w-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[3px] bg-[#0b0b13] md:rounded-[5px]">
              {/* Barra do navegador, dentro do ecrã */}
              <div className="flex shrink-0 items-center gap-[3px] bg-[#1a1a22] px-[6px] py-[4px] md:gap-1.5 md:px-2.5 md:py-1.5">
                <span className="h-[3px] w-[3px] rounded-full bg-[#ff5f57] md:h-2 md:w-2" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#febc2e] md:h-2 md:w-2" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#28c840] md:h-2 md:w-2" />
                <span className="ml-1.5 hidden truncate rounded bg-white/[0.07] px-2 py-[2px] font-mono text-[9px] text-text-dim md:inline md:text-[10px]">
                  {url}
                </span>
              </div>
              <div className="min-h-0 flex-1">{conteudo}</div>
            </div>
          </motion.div>

          {/* Com a tampa em baixo vê-se o alumínio das costas, não o ecrã.
             Some assim que a tampa passa de meio caminho. */}
          {capaOpacity && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: capaOpacity }}
              className="pointer-events-none absolute inset-0 rounded-[9px] bg-[linear-gradient(168deg,#c6ccd4_0%,#9ba1aa_36%,#787e87_66%,#adb3bc_100%)] md:rounded-[16px]"
            />
          )}
        </div>
      </motion.div>

      {/* DOBRADIÇA: escura, da largura da tampa, cola a tampa à base. */}
      <div className="relative z-0 mx-auto h-[2px] w-[97%] bg-[linear-gradient(180deg,#191c21,#2b2f36)] md:h-[5px]" />

      {/* BASE em cunha, mais larga do que a tampa. */}
      <div
        className="relative left-1/2 z-0 h-[5px] w-[111%] -translate-x-1/2 md:h-[13px]"
        style={{ clipPath: "polygon(0 0, 100% 0, 98.8% 100%, 1.2% 100%)" }}
      >
        <div className="h-full rounded-b-[4px] bg-[linear-gradient(180deg,#d9dee4_0%,#b0b6bf_24%,#878e97_60%,#565c65_100%)] md:rounded-b-[9px]" />
        {/* Entalhe do dedo, à frente e ao centro. */}
        <span className="absolute left-1/2 top-0 h-[2px] w-[13%] -translate-x-1/2 rounded-b-full bg-[#9ba1aa] md:h-[5px]" />
      </div>

      {/* Sombra de contacto: é o que assenta o objecto em vez de o deixar a
         flutuar em cima do preto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative left-1/2 h-[14px] w-[92%] -translate-x-1/2 md:h-[26px]"
        style={{ background: "radial-gradient(closest-side, rgba(0,0,0,.75), transparent)" }}
      />
    </div>
  );
}

/* Telemóvel: aro de titânio, ilha dinâmica, botões laterais. */
export function IPhone({ conteudo }: { conteudo: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <span className="absolute -left-[1.5px] top-[20%] h-[5%] w-[1.5px] rounded-l-sm bg-[#565b63] md:-left-[2.5px] md:w-[2.5px]" />
      <span className="absolute -left-[1.5px] top-[28%] h-[9%] w-[1.5px] rounded-l-sm bg-[#565b63] md:-left-[2.5px] md:w-[2.5px]" />
      <span className="absolute -right-[1.5px] top-[26%] h-[12%] w-[1.5px] rounded-r-sm bg-[#565b63] md:-right-[2.5px] md:w-[2.5px]" />
      <div className="relative aspect-[9/19.5] w-full rounded-[14px] bg-[linear-gradient(145deg,#8b9098_0%,#3e424a_35%,#22242a_70%,#5a5f68_100%)] p-[1.5px] shadow-[0_34px_80px_-22px_rgba(0,0,0,.95)] md:rounded-[30px] md:p-[2.5px]">
        <div className="h-full rounded-[13px] bg-[#0a0a0e] p-[1.5px] md:rounded-[28px] md:p-[3px]">
          <div className="relative h-full overflow-hidden rounded-[11px] md:rounded-[25px]">
            {conteudo}
            <span className="absolute left-1/2 top-[1%] h-[1.4%] w-[21%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

