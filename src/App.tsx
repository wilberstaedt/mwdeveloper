import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CleaningSystem from "./pages/CleaningSystem";
import AgendaCheia from "./pages/AgendaCheia";
import Mwflow from "./pages/Mwflow";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaning-system" element={<CleaningSystem />} />
      <Route path="/system" element={<CleaningSystem />} />
      <Route path="/agenda-cheia" element={<AgendaCheia />} />
      <Route path="/mwflow" element={<Mwflow />} />
    </Routes>
  );
}
