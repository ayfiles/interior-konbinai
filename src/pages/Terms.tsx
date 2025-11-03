import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="px-6 lg:px-12 pt-28 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-frosted shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-6 md:p-10">
            <h1 className="text-white font-bold text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-4" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>Allgemeine Geschäftsbedingungen</h1>
            <p className="text-white/80 font-body text-[16px] lg:text-[18px] mb-8">Stand: {new Date().getFullYear()}</p>

            <div className="space-y-6 text-white/85 font-body text-[15px] lg:text-[16px] leading-relaxed">
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">1. Geltungsbereich</h2>
                <p>Diese AGB gelten für alle Angebote, Verträge und Leistungen von konbinai im Bereich Konzeption, Kreation und Produktion visueller Inhalte.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">2. Angebote & Leistungen</h2>
                <p>Unsere Angebote sind freibleibend. Leistungsumfang, Timings und Vergütung ergeben sich aus dem individuellen Angebot bzw. der Auftragsbestätigung.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">3. Vergütung & Zahlungsbedingungen</h2>
                <p>Sofern nicht anders vereinbart, sind 50% bei Beauftragung und 50% bei Lieferung fällig. Preise verstehen sich zuzüglich gesetzlicher Steuern.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">4. Rechte & Nutzung</h2>
                <p>Alle Nutzungsrechte werden erst nach vollständiger Bezahlung übertragen. Die konkreten Nutzungsarten und -umfänge ergeben sich aus dem Angebot.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">5. Mitwirkungspflichten</h2>
                <p>Der Auftraggeber stellt notwendige Informationen, Assets und Freigaben rechtzeitig bereit. Verzögerungen verschieben vereinbarte Termine entsprechend.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">6. Haftung</h2>
                <p>Wir haften für Vorsatz und grobe Fahrlässigkeit. Für mittelbare Schäden und entgangenen Gewinn ist die Haftung ausgeschlossen.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">7. Schlussbestimmungen</h2>
                <p>Änderungen bedürfen der Schriftform. Gerichtsstand ist – soweit zulässig – der Sitz von konbinai. Es gilt deutsches Recht.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;


