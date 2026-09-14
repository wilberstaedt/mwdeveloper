import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio";

const CleaningSystem = lazy(() => import("./pages/CleaningSystem"));
const Flow = lazy(() => import("./pages/Flow"));
const DisenoWeb = lazy(() => import("./pages/DisenoWeb"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Routes>
        {/* 14/09/2026: a home passa a vender servicos; o portfolio para vagas vive em /cv */}
        <Route path="/" element={<Inicio />} />
        <Route path="/cv" element={<Home />} />
        <Route path="/cleaning-system" element={<CleaningSystem />} />
        <Route path="/system" element={<CleaningSystem />} />
        <Route path="/flow" element={<Flow />} />
        {/* Landing de Google Ads (Espanha), 14/09/2026 */}
        <Route path="/es/diseno-web" element={<DisenoWeb variante="web" />} />
        <Route path="/es/landing-page" element={<DisenoWeb variante="landing" />} />
        <Route path="/es/privacidad" element={<Privacidad />} />
      </Routes>
    </Suspense>
  );
}
