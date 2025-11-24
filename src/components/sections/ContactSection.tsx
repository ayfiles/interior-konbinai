import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/texts";
import { privacyDeHtml, privacyEnHtml } from "@/lib/privacy";

const ContactSection = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    budget: "",
    package: "",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Check URL params for package selection
  useEffect(() => {
    const checkParams = () => {
      const params = new URLSearchParams(window.location.search);
      const packageParam = params.get('package');
      if (packageParam === 'project-based' || packageParam === 'creative-partnership') {
        setFormData((prev) => {
          if (prev.package !== packageParam) {
            return { ...prev, package: packageParam };
          }
          return prev;
        });
        // Clean URL after setting
        setTimeout(() => {
          window.history.replaceState({}, '', window.location.pathname);
        }, 100);
      }
    };
    
    checkParams();
    // Check periodically if we're on the contact section
    const interval = setInterval(checkParams, 200);
    window.addEventListener('popstate', checkParams);
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', checkParams);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPrivacy) {
      toast.error(currentLang === 'DE' ? 'Bitte stimmen Sie der Datenschutzerklärung zu.' : 'Please accept the privacy policy.');
      return;
    }
    try {
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "interest",
          ...formData,
        },
      });
      toast.success("Thanks! We'll be in touch soon.");
      setFormData({ name: "", email: "", interest: "", budget: "", package: "" });
      setAcceptPrivacy(false);
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative bg-[#F2F0EF] dark:bg-black py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 lg:-top-16 lg:h-16 bg-gradient-to-b from-white dark:from-black to-[#F2F0EF] dark:to-black z-10" />
      
      {/* Circles Overlay with fade out */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.15) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(0,0,0,0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          maskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          maskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 100%)',
        }}
      />
      
      <div className="max-w-[700px] mx-auto space-y-12 relative z-10">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2
            className="font-bold text-black dark:text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {texts[currentLang].contact_title}
          </h2>
          <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px]">
            {texts[currentLang].contact_subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_name}
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_email}
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_interest}
            </Label>
            <Select
              value={formData.interest}
              onValueChange={(value) => setFormData({ ...formData, interest: value })}
              required
            >
              <SelectTrigger className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white rounded-xl h-12">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury-estate-agents">{texts[currentLang].interest_estate}</SelectItem>
                <SelectItem value="airbnb-consultants">{texts[currentLang].interest_airbnb}</SelectItem>
                <SelectItem value="property-developers">{texts[currentLang].interest_developer}</SelectItem>
                <SelectItem value="interior-designers">{texts[currentLang].interest_designer}</SelectItem>
                <SelectItem value="other">{texts[currentLang].interest_other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_budget}
            </Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
              required
            >
              <SelectTrigger className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white rounded-xl h-12">
                <SelectValue placeholder="Select a budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-1k">{texts[currentLang].budget_under1k}</SelectItem>
                <SelectItem value="1k-3k">{texts[currentLang].budget_1k_3k}</SelectItem>
                <SelectItem value="3k-5k">{texts[currentLang].budget_3k_5k}</SelectItem>
                <SelectItem value="5k-10k">{texts[currentLang].budget_5k_10k}</SelectItem>
                <SelectItem value="10k-plus">{texts[currentLang].budget_10k}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_package}
            </Label>
            <Select
              value={formData.package}
              onValueChange={(value) => setFormData({ ...formData, package: value })}
            >
              <SelectTrigger className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white rounded-xl h-12">
                <SelectValue placeholder={texts[currentLang].package_select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-based">{texts[currentLang].package_project}</SelectItem>
                <SelectItem value="creative-partnership">{texts[currentLang].package_partnership}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy consent */}
          <div className="pt-2">
            <div className="flex items-start gap-3 mb-4">
              <Checkbox id="privacy-mini" checked={acceptPrivacy} onCheckedChange={(v) => setAcceptPrivacy(Boolean(v))} className="mt-1" />
              <div className="font-body text-black/80 dark:text-white/80 text-[14px] leading-6">
                <label htmlFor="privacy-mini" className="select-none cursor-pointer">
                  {currentLang === 'DE'
                    ? 'Ich habe die Datenschutzerklärung gelesen und stimme ihr zu.'
                    : 'I have read and agree to the privacy policy.'}
                </label>{" "}
                <button type="button" onClick={() => setPrivacyOpen(true)} className="underline hover:text-black dark:hover:text-white">
                  {currentLang === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
            >
              {texts[currentLang].submit}
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/project-inquiry")}
              size="lg"
              className="hidden w-full rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] h-12 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
            >
              {texts[currentLang].full_inquiry}
            </Button>
          </div>
        </form>
        {privacyOpen && (
          <div className="fixed inset-0 z-[100] bg-[#F2F0EF]/80 dark:bg-black/80 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={() => setPrivacyOpen(false)}>
            <div className="relative w-full max-w-[820px] max-h-[80vh] rounded-3xl bg-black/8 dark:bg-white/12 border border-black/15 dark:border-white/20 backdrop-blur-frosted shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
                <h3 className="text-black dark:text-white font-bold text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {currentLang === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </h3>
                <button onClick={() => setPrivacyOpen(false)} className="text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white font-body">✕</button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh] text-black/85 dark:text-white/85">
                <div className="prose prose-invert max-w-none font-body text-[15px]" dangerouslySetInnerHTML={{ __html: currentLang === 'DE' ? privacyDeHtml : privacyEnHtml }} />
              </div>
              <div className="px-6 py-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                <Button onClick={() => setPrivacyOpen(false)} className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[14px] px-6">
                  {currentLang === 'DE' ? 'Schließen' : 'Close'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
