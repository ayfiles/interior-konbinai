import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Imprint = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="px-6 lg:px-12 pt-28 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-frosted shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-6 md:p-10">
            <h1 className="text-white font-bold text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-4" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>Impressum</h1>
            <p className="text-white/80 font-body text-[16px] lg:text-[18px] mb-8">Angaben gemäß § 5 TMG (Beispielinhalte)</p>

            <div className="space-y-6 text-white/85 font-body text-[15px] lg:text-[16px] leading-relaxed">
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">Anbieter</h2>
                <p>
                  konbinai – visual convenience studio<br />
                  Musterstraße 1<br />
                  10115 Berlin, Deutschland
                </p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">Kontakt</h2>
                <p>
                  E-Mail: konbinai.visual@gmail.com<br />
                  Tel.: +49 (0) 000 000000
                </p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">Vertretungsberechtigt</h2>
                <p>Vor- und Nachname (Geschäftsführung)</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">Umsatzsteuer-ID</h2>
                <p>DE00 0000 000 (Beispiel)</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">Hinweis</h2>
                <p>Inhalte dienen als Platzhalter und werden später durch die echten Unternehmensdaten ersetzt.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Imprint;


