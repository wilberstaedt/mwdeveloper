import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * O React Router não repõe o scroll ao mudar de rota (16/09/2026): o Matheus
 * clicou em "ver meu CV" a partir do rodapé da home e aterrou no rodapé do CV.
 *
 * Repõe no topo em cada mudança de caminho, mas NÃO quando o utilizador anda
 * para trás ou para a frente no histórico — aí o browser já restaura a posição
 * certa e mexer estragaria. Também não mexe quando há âncora no URL.
 */
export function ReporScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    if (typeof window === "undefined") return;
    if (window.history.scrollRestoration) window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
