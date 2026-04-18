import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Stack } from "./components/sections/Stack";
import { Process } from "./components/sections/Process";
import { Contact } from "./components/sections/Contact";
import { useDocumentMeta } from "./i18n/useDocumentMeta";

export default function App() {
  useDocumentMeta();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
