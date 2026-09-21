import { Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/legalxpress-logo.png";

const footerLinks = {
  services: [
    { name: "Incorporations", href: "/services#incorporations" },
    { name: "Shareholder Agreements", href: "/services#shareholder" },
    { name: "Procurement Law", href: "/services#procurement" },
    { name: "SR&ED Tax Credit Support", href: "/services#sred" },
    { name: "Real Estate", href: "/services#real-estate" },
    { name: "Corporate Litigation", href: "/services#litigation" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contract Library", href: "/contracts" },
    { name: "Case Analysis", href: "/case-analysis" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
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
              Modern legal solutions for businesses and individuals across Canada. 
              Technology-driven, client-focused.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="tel:+16472009104" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                (647) 200-9104
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Toronto, ON — serving clients across Canada
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
          <p className="text-xs leading-relaxed text-primary-foreground/60 font-body max-w-4xl">
            <span className="font-semibold text-primary-foreground/80">Legal notice: </span>
            LegalXpress is a Canadian corporate law practice. Legal services described as
            in-house are provided by our licensed Canadian legal team. Our value-added
            services — the AI Case Analysis, the Contract Library and our affiliate partner
            network — are informational or independent third-party services. They are not
            legal advice, do not create a lawyer-client relationship, and LegalXpress accepts
            no responsibility or liability for them. Always have your matter reviewed by a
            licensed lawyer or paralegal in your jurisdiction.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} LegalXpress Law. All rights reserved.
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
