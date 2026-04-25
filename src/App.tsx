import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CleaningSystem from "./pages/CleaningSystem";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaning-system" element={<CleaningSystem />} />
    </Routes>
  );
}
