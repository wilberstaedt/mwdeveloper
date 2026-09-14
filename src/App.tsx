import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const CleaningSystem = lazy(() => import("./pages/CleaningSystem"));
const Flow = lazy(() => import("./pages/Flow"));
const DisenoWeb = lazy(() => import("./pages/DisenoWeb"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cleaning-system" element={<CleaningSystem />} />
        <Route path="/system" element={<CleaningSystem />} />
        <Route path="/flow" element={<Flow />} />
        {/* Landing de Google Ads (Espanha), 14/09/2026 */}
        <Route path="/es/diseno-web" element={<DisenoWeb />} />
        <Route path="/es/privacidad" element={<Privacidad />} />
      </Routes>
    </Suspense>
  );
}
