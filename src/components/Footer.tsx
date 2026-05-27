import { SocialLink } from "../types";

export interface FooterProps {
  socialLinks?: SocialLink[];
}

export default function Footer({ socialLinks = [] }: FooterProps) {
  const activeSocials = socialLinks.filter((link) => link.isEnabled);

  return (
    <footer 
      id="footer" 
      className="bg-[#FFFFFF] border-t border-[#E5E5E5] py-12"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Copyright */}
        <div className="text-left">
          <p className="font-mono text-[11px] text-[#6B6B6B] uppercase tracking-wider">
            © 2024 All rights reserved.
          </p>
        </div>

        {/* Right Side: Dynamic Social links */}
        <div className="flex items-center space-x-6 animate-fade-in" id="footer-social-links">
          {activeSocials.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank" 
              rel="noreferrer"
              className="font-sans text-xs font-normal text-[#6B6B6B] hover:text-[#0A0A0A] hover:underline transition-all duration-200"
              style={{ minWidth: "44px", minHeight: "44px", display: "inline-flex", alignItems: "center" }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

