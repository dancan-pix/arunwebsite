import { Link } from "wouter";
import { Linkedin, Youtube, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white font-serif font-bold text-lg">
                A
              </div>
              <div className="leading-none">
                <div className="font-semibold text-white text-base">Arun Asif</div>
                <div className="text-xs text-white/50 tracking-wider uppercase">NIW Documents</div>
              </div>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Real petition documents for highly skilled professionals. Download the actual I-140 cover letter and CV used in an approved EB-2 NIW self-petition.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/arun-asif-phd-2b4b0797/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@ArunAsif"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Pages</p>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Documents" },
                { href: "/blog", label: "Blog" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {["Terms of Service", "Privacy Policy", "Refund Policy"].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Arun Asif NIW. All rights reserved.</p>
          <p>Not legal advice. Arun Asif is a PhD scientist, not a lawyer. Educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
