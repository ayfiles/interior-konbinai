import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Imprint = () => {
  const { currentLang } = useLanguage();
  return (
    <div className="min-h-screen bg-[#F2F0EF] dark:bg-black">
      <Navbar />
      <main className="px-6 lg:px-12 pt-28 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[24px] bg-black/8 dark:bg-white/10 border border-black/15 dark:border-white/20 backdrop-blur-frosted shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-6 md:p-10">
            <h1 className="text-black dark:text-white font-bold text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-4" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              {currentLang === 'DE' ? 'Impressum' : 'Imprint'}
            </h1>
            <p className="text-black/80 dark:text-white/80 font-body text-[16px] lg:text-[18px] mb-8">
              {currentLang === 'DE' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG (German Telemedia Act)'}
            </p>

            <div className="space-y-8 text-black/85 dark:text-white/85 font-body text-[15px] lg:text-[16px] leading-relaxed">
              {currentLang === 'DE' ? (
                <>
                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">KONBINAI</h2>
                    <p>
                      Ahmet Aytac<br />
                      Kronprinzenstraße 18<br />
                      47229 Duisburg<br />
                      Deutschland
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Kontakt</h2>
                    <p>
                      E-Mail: <a href="mailto:konbinai.visual@gmail.com" className="underline hover:text-black dark:hover:text-white">konbinai.visual@gmail.com</a><br />
                      Telefon: ( folgt demnächst )
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Berufsbezeichnung</h2>
                    <p>Freelance Graphic & AI Designer</p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                    <p>Ahmet Aytac, Kronprinzenstraße 18, 47229 Duisburg</p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Haftung für Inhalte</h2>
                    <p>
                      Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                      übernehmen wir jedoch keine Gewähr.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Haftung für Links</h2>
                    <p>
                      Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                      fremden Inhalte keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Urheberrecht</h2>
                    <p>
                      Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung,
                      Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">KI-Hinweis</h2>
                    <p>
                      Ein Teil der visuellen Inhalte auf dieser Website wurde mithilfe von KI-gestützten Systemen (z. B. Midjourney, DALL·E 3 u. a.)
                      erstellt und anschließend manuell bearbeitet und kuratiert.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">KONBINAI</h2>
                    <p>
                      Ahmet Aytac<br />
                      Kronprinzenstraße 18<br />
                      47229 Duisburg<br />
                      Germany
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Contact</h2>
                    <p>
                      E-mail: <a href="mailto:konbinai.visual@gmail.com" className="underline hover:text-black dark:hover:text-white">konbinai.visual@gmail.com</a><br />
                      Phone: ( coming soon )
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Professional Title</h2>
                    <p>Freelance Graphic & AI Designer</p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Responsible for Content pursuant to § 18 (2) MStV</h2>
                    <p>Ahmet Aytac, Kronprinzenstraße 18, 47229 Duisburg</p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Liability for Content</h2>
                    <p>
                      The contents of this website were created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Liability for Links</h2>
                    <p>
                      This website contains links to external third-party websites, the content of which we have no influence on. Therefore, we cannot assume any liability for these external contents. The respective provider or operator is always responsible for the content of the linked pages.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">Copyright</h2>
                    <p>
                      The content and works created by the site operator on this website are subject to German copyright law. Duplication, processing, distribution or any kind of exploitation outside the limits of copyright require the written consent of the respective author.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-black dark:text-white font-semibold text-[20px] mb-2">AI Notice</h2>
                    <p>
                      Some of the visual content on this website was created using AI-powered systems (e.g., Midjourney, DALL·E 3, etc.) and subsequently edited and curated manually.
                    </p>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Imprint;


