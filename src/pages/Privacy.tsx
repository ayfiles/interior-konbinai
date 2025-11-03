import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="px-6 lg:px-12 pt-28 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-frosted shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-6 md:p-10">
            <h1 className="text-white font-bold text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-4" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>Privacy Policy</h1>
            <p className="text-white/80 font-body text-[16px] lg:text-[18px] mb-8">This is a simple placeholder policy for konbinai. Replace with your legal text.</p>

            <div className="space-y-6 text-white/85 font-body text-[15px] lg:text-[16px] leading-relaxed">
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">1. Controller</h2>
                <p>konbinai – visual convenience studio, Berlin, Germany. Contact: konbinai.visual@gmail.com</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">2. Purpose of Processing</h2>
                <p>We process contact data and project details to respond to inquiries and provide our services.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">3. Legal Basis</h2>
                <p>Art. 6(1)(b) GDPR (contract / pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interests).</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">4. Storage</h2>
                <p>We store your data only as long as necessary for the stated purposes and legal retention periods.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold text-[20px] mb-2">5. Your Rights</h2>
                <p>You have the right to access, rectify, delete, restrict processing, and object. You may contact us anytime.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


