import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CleaningSystem from "./pages/CleaningSystem";
import Flow from "./pages/Flow";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaning-system" element={<CleaningSystem />} />
      <Route path="/system" element={<CleaningSystem />} />
      <Route path="/flow" element={<Flow />} />
    </Routes>
  );
}
