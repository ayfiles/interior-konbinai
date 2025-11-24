import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ArrowLeft, Upload, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { texts } from "@/lib/texts";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { privacyDeHtml, privacyEnHtml } from "@/lib/privacy";


const ProjectInquiry = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    projectType: "",
    details: "",
    timeline: "",
    budget: "",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedFiles: Array<{ name: string; url: string }> = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('project-references')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-references')
          .getPublicUrl(filePath);

        newUploadedFiles.push({ name: file.name, url: publicUrl });
      }

      setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPrivacy) {
      toast.error(currentLang === 'DE' ? 'Bitte stimmen Sie der Datenschutzerklärung zu.' : 'Please accept the privacy policy.');
      return;
    }
    
    try {
      await supabase.functions.invoke("send-notification", {
        body: {
          type: "project_inquiry",
          ...formData,
          uploadedFiles,
        },
      });
      
      setIsSubmitted(true);
      toast.success("Your inquiry has been submitted!");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F2F0EF] dark:bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-[600px] text-center space-y-6 animate-fade-in">
            <h1 
              className="font-bold text-black dark:text-white text-[48px] lg:text-[64px] leading-[1.1]"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Perfect. Lets create something Great!
            </h1>
            <p className="font-body text-black/85 dark:text-white/85 text-[18px] lg:text-[20px]">
              We'll reply within 24–48 hours.
            </p>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[15px] px-10 mt-8"
            >
              Return Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 py-20 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto space-y-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors font-body text-[15px]"
        >
          <ArrowLeft size={18} />
          {texts[currentLang].back_home}
        </button>

        {/* Header */}
        <div className="space-y-4">
          <h1
            className="font-bold text-white text-[48px] lg:text-[64px] leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            {texts[currentLang].project_inquiry_title}
          </h1>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px]">
            {texts[currentLang].project_inquiry_subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body text-black/90 dark:text-white/90 text-[15px]">
                {texts[currentLang].form_name} *
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
                {texts[currentLang].form_email} *
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_brand} *
            </Label>
            <Input
              id="brand"
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_project_type} *
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              required
            >
              <SelectTrigger className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white rounded-xl h-12">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign">{texts[currentLang].project_type_campaign}</SelectItem>
                <SelectItem value="product">{texts[currentLang].project_type_product}</SelectItem>
                <SelectItem value="motion">{texts[currentLang].project_type_motion}</SelectItem>
                <SelectItem value="direction">{texts[currentLang].project_type_direction}</SelectItem>
                <SelectItem value="retainer">{texts[currentLang].project_type_retainer}</SelectItem>
                <SelectItem value="custom">{texts[currentLang].project_type_custom}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="font-body text-black/90 dark:text-white/90 text-[15px]">
              {texts[currentLang].form_project_details} *
            </Label>
            <Textarea
              id="details"
              required
              rows={6}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us about your brand, target audience, creative vision, and goals..."
              className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 rounded-xl resize-none"
            />
          </div>

          {/* Upload References Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body text-black/90 dark:text-white/90 text-[15px]">
                {texts[currentLang].upload_references}
              </Label>
              <p className="font-body text-black/60 dark:text-white/60 text-[14px]">
                {texts[currentLang].upload_references_description}
              </p>
            </div>

            <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl p-8 text-center hover:border-black/40 dark:hover:border-white/40 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <Upload className="w-10 h-10 text-black/60 dark:text-white/60" />
                <div>
                  <p className="font-body text-black/90 dark:text-white/90 text-[15px]">
                    {isUploading ? "Uploading..." : "Click to upload files"}
                  </p>
                  <p className="font-body text-black/50 dark:text-white/50 text-[13px] mt-1">
                    {texts[currentLang].upload_references_file_types}
                  </p>
                </div>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3"
                  >
                    <span className="font-body text-black/90 dark:text-white/90 text-[14px] truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors ml-3"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timeline" className="font-body text-black/90 dark:text-white/90 text-[15px]">
                {texts[currentLang].form_timeline} *
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                required
              >
                <SelectTrigger className="bg-black/8 dark:bg-white/10 border-black/15 dark:border-white/20 text-black dark:text-white rounded-xl h-12">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">{texts[currentLang].timeline_urgent}</SelectItem>
                  <SelectItem value="standard">{texts[currentLang].timeline_standard}</SelectItem>
                  <SelectItem value="flexible">{texts[currentLang].timeline_flexible}</SelectItem>
                  <SelectItem value="ongoing">{texts[currentLang].timeline_ongoing}</SelectItem>
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
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under1k">{texts[currentLang].budget_under1k}</SelectItem>
                  <SelectItem value="1k-3k">{texts[currentLang].budget_1k_3k}</SelectItem>
                  <SelectItem value="3k-5k">{texts[currentLang].budget_3k_5k}</SelectItem>
                  <SelectItem value="5k-10k">{texts[currentLang].budget_5k_10k}</SelectItem>
                  <SelectItem value="10k+">{texts[currentLang].budget_10k}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6">
            {/* Privacy consent */}
            <div className="flex items-start gap-3 mb-5">
              <Checkbox id="privacy" checked={acceptPrivacy} onCheckedChange={(v) => setAcceptPrivacy(Boolean(v))} className="mt-1" />
              <div className="font-body text-black/80 dark:text-white/80 text-[14px] leading-6">
                <label htmlFor="privacy" className="select-none cursor-pointer">
                  {currentLang === 'DE'
                    ? 'Ich habe die Datenschutzerklärung gelesen und stimme ihr zu.'
                    : 'I have read and agree to the privacy policy.'}
                </label>{" "}
                <button type="button" onClick={() => setPrivacyOpen(true)} className="underline hover:text-black dark:hover:text-white">
                  {currentLang === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-pill bg-black/10 dark:bg-white/20 border border-black/20 dark:border-white/30 ring-1 ring-black/20 dark:ring-white/40 shadow-xl backdrop-blur-frosted text-black dark:text-white font-label text-[15px] h-14 transition-all duration-300 hover:bg-black/15 dark:hover:bg-white/10 hover:ring-black/30 dark:hover:ring-white/60"
            >
              {texts[currentLang].submit_project}
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
      </div>
      <Footer />
    </div>
  );
};

export default ProjectInquiry;
