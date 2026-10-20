import { Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { PracticeNotice } from "@/components/legal/PracticeNotice";
import logo from "@/assets/legalxpress-logo.png";

const footerLinks = {
  services: [
    { name: "Incorporations", href: "/services#incorporations" },
    { name: "Shareholder Agreements", href: "/services#shareholder" },
    { name: "Procurement Law", href: "/services#procurement" },
    { name: "SR&ED Tax Credit Support", href: "/services#sred" },
    { name: "Real Estate Referrals", href: "/affiliates" },
    { name: "Corporate Litigation", href: "/services#litigation" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contract Library", href: "/contracts" },
    { name: "Case Law Research", href: "/case-analysis" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Rogers Partnership", href: "/partnerships/rogers" },
    { name: "Bell Partnership (Sample)", href: "/partnerships/bell" },
    { name: "TELUS Partnership (Sample)", href: "/partnerships/telus" },
    { name: "Bet99 Partnership", href: "/partnerships/bet99" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Lawyer Portal", href: "/lawyer-portal" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="LegalXpress logo" width={72} height={72} loading="lazy" className="h-14 w-14 object-contain" />
              <span className="font-display text-2xl font-semibold">
                LegalXpress
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm font-body">
              Membership-based legal services for individuals and small businesses, provided under Ontario licensing.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="tel:+16472009104" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                (647) 200-9104
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Toronto, Ontario
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors font-body cursor-pointer relative z-10"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors font-body cursor-pointer relative z-10"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors font-body cursor-pointer relative z-10"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Value-added services notice */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="text-primary-foreground/70 max-w-4xl"><PracticeNotice /></div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} LegalXpress. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
