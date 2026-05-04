import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const CleaningSystem = lazy(() => import("./pages/CleaningSystem"));
const Flow = lazy(() => import("./pages/Flow"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cleaning-system" element={<CleaningSystem />} />
        <Route path="/system" element={<CleaningSystem />} />
        <Route path="/flow" element={<Flow />} />
      </Routes>
    </Suspense>
  );
}
