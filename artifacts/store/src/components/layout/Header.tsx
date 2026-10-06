import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Documents" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-xs">
      <div className="container mx-auto px-4 md:px-8 flex h-18 items-center justify-between" style={{ height: "68px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-serif font-bold text-lg select-none">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-foreground text-base tracking-tight">Arun Asif</span>
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">NIW Documents</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.youtube.com/@ArunAsif"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            YouTube
          </a>
          <a
            href="https://www.linkedin.com/in/arun-asif-phd-2b4b0797/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            LinkedIn
          </a>
          <Link href="/shop">
            <Button size="sm" className="font-medium px-5">
              Browse Documents
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t mt-2">
            <Link href="/shop" onClick={() => setMenuOpen(false)}>
              <Button className="w-full font-medium">Browse Documents</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
