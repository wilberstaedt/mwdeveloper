import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contact } from "@/data/contact";
import { guardarConsentimento, lerConsentimento, medicaoConfigurada } from "@/lib/ads";

/* Politica de privacidade e cookies da landing espanhola. Diz apenas o que o
   site faz de facto: contacto por WhatsApp/email e, com consentimento, a tag
   de conversao do Google Ads. Sem formulario, sem analytics, sem remarketing. */

export default function Privacidad() {
  const [estado, setEstado] = useState(lerConsentimento());

  useEffect(() => {
    document.title = "Privacidad y cookies | MW Dev";
    document.documentElement.lang = "es";
  }, []);

  const secao = "mt-10 font-display text-[22px] font-bold text-cloud";
  const par = "mt-3 text-[15px] leading-7 text-text";

  return (
    <div className="min-h-screen bg-void text-text">
      <main className="mx-auto max-w-2xl px-5 py-16">
        <Link to="/es/diseno-web" className="font-mono text-[13px] text-cyan">← Volver</Link>
        <h1 className="mt-6 font-display text-[34px] font-bold leading-tight text-cloud">Privacidad y cookies</h1>

        <h2 className={secao}>Quién es el responsable</h2>
        <p className={par}>Matheus Wilberstaedt (MW Dev). Contacto: <a className="text-cyan underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>.</p>

        <h2 className={secao}>Qué datos trato y para qué</h2>
        <p className={par}>
          Esta web no tiene formularios. Si me escribes por WhatsApp o email, uso lo que me envíes (tu nombre, tu contacto y lo que me cuentes de tu proyecto) solo para responderte y, si lo pides, prepararte un presupuesto. La base legal es tu solicitud y las medidas precontractuales que me pides.
        </p>
        <p className={par}>Guardo esas conversaciones mientras dure la relación comercial y, después, el tiempo que exija la ley. No las vendo ni las cedo a nadie.</p>

        <h2 className={secao}>Cookies</h2>
        <p className={par}>
          Solo si aceptas, se carga la etiqueta de Google Ads para medir qué anuncios terminan en un contacto (un clic en WhatsApp o en el email). No uso cookies de analítica ni publicidad personalizada. Si rechazas, la web funciona igual y no se carga nada de Google Ads.
        </p>
        <p className={par}>Google puede tratar esos datos según su propia política: <a className="text-cyan underline underline-offset-4" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.</p>

        {medicaoConfigurada && (
          <div className="mt-6 rounded-2xl border border-border-strong bg-card p-5">
            <p className="text-[15px] text-text-bright">
              Tu elección actual: <strong>{estado === "aceite" ? "aceptadas" : estado === "recusado" ? "rechazadas" : "sin elegir"}</strong>
            </p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => { guardarConsentimento("aceite"); setEstado("aceite"); }} className="min-h-11 flex-1 rounded-xl bg-blue px-4 text-[15px] font-semibold text-white">Aceptar</button>
              <button onClick={() => { guardarConsentimento("recusado"); setEstado("recusado"); location.reload(); }} className="min-h-11 flex-1 rounded-xl border border-border-strong px-4 text-[15px] font-semibold text-text-bright">Rechazar</button>
            </div>
          </div>
        )}

        <h2 className={secao}>Tus derechos</h2>
        <p className={par}>
          Puedes pedir acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a {contact.email}. Si crees que no los he tratado bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
        </p>
      </main>
    </div>
  );
}
