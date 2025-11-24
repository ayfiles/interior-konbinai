import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
        <div className="rounded-[24px] bg-black/8 dark:bg-white/10 border border-black/15 dark:border-white/20 backdrop-blur-frosted shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-5 lg:px-8 py-3">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-6 flex-wrap">
            {/* Left: legal */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-black/80 dark:text-white/80 font-body text-[13px]">
              <span className="whitespace-nowrap">©2025 konbinai. All rights reserved</span>
              <span className="hidden sm:inline text-black/30 dark:text-white/30">·</span>
              <span className="text-black/60 dark:text-white/60">
                Allgemeine Geschäftsbedingungen
              </span>
              <span className="hidden sm:inline text-black/30 dark:text-white/30">·</span>
              <a href="/impressum" className="hover:text-black dark:hover:text-white underline-offset-4 hover:underline">
                Impressum
              </a>
              <span className="hidden sm:inline text-black/30 dark:text-white/30">·</span>
              <a href="/privacy" className="hover:text-black dark:hover:text-white underline-offset-4 hover:underline">
                Privacy Policy
              </a>
            </div>

            {/* Right: socials */}
            <div className="flex items-center gap-2 ml-auto">
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/15 border border-black/20 dark:border-white/25 backdrop-blur-frosted text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/25 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/15 border border-black/20 dark:border-white/25 backdrop-blur-frosted text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/25 transition-all"
                title="TikTok"
              >
                {/* TikTok icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M16.5 3.5c.9 1.3 2.1 2.3 3.5 2.7v3.1c-1.3-.1-2.6-.5-3.8-1.2v5.7c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.1-.9-.1-2 0-3.6 1.6-3.6 3.6S7.2 18.1 9.2 18.1s3.6-1.6 3.6-3.6V2.5h3.7z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/yourhandle"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/15 border border-black/20 dark:border-white/25 backdrop-blur-frosted text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/25 transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


