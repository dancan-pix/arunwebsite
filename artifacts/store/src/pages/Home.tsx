import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useListProducts } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ArrowRight, GraduationCap, FileText } from "lucide-react";

export default function Home() {
  const { data: productsData, isLoading } = useListProducts({ featured: true });
  const products = productsData?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left: copy */}
            <div className="flex-1 space-y-7">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
                EB-2 NIW · Self-Petition Documents
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Your green card.<br />
                <span className="text-white/70">Your petition.</span><br />
                No attorney fees.
              </h1>
              <p className="text-white/75 text-lg leading-relaxed max-w-xl">
                I'm a PhD scientist who navigated the US green card process myself. These are my real petition documents — adapted and ready for you to use in your own NIW self-petition.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/shop">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md">
                    Browse Documents
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 font-medium">
                    Read the Blog
                  </Button>
                </Link>
              </div>
              <p className="text-white/40 text-xs">Not legal advice. Educational purposes only.</p>
            </div>

            {/* Right: photo + credential card */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src="/arun-asif.png"
                    alt="Arun Asif, PhD"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Credential badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="leading-none">
                    <div className="text-xs font-bold text-foreground">PhD Scientist</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">NIW Approved</div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="font-semibold text-white text-sm">Arun Asif, PhD</p>
                <p className="text-white/55 text-xs">Organ-on-a-chip · Microfluidics · Stem Cells</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ─────────────────────────────────────── */}
        <section className="bg-white border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { value: "2", label: "Documents Available" },
                { value: "$5K+", label: "Avg. Attorney Savings" },
                { value: "100%", label: "Instant Download" },
              ].map(stat => (
                <div key={stat.label} className="py-6 text-center">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Documents ────────────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Documents & Templates</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Real petition documents</h2>
              </div>
              <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map(i => (
                  <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No documents yet.</p>
              </div>
            )}

            <div className="mt-8 text-center md:hidden">
              <Link href="/shop">
                <Button variant="outline" className="w-full font-medium">View all documents</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why self-petition ─────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why DIY?</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
                Save thousands. Stay in control.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Immigration attorneys charge <strong>$5,000–$15,000+</strong> for an NIW petition. My real petition documents give you an approved blueprint at a fraction of that cost.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileText className="h-6 w-6 text-primary" />,
                  title: "I-140 Cover Letter",
                  desc: "The full petition cover letter addressing all three Dhanasar prongs — used in my own approved EB-2 NIW application. Available in PDF and editable Word format.",
                },
                {
                  icon: <GraduationCap className="h-6 w-6 text-primary" />,
                  title: "Curriculum Vitae",
                  desc: "The USCIS-aligned CV used in my approved NIW petition. Structured to highlight publications, peer reviews, presentations, and research impact the way USCIS expects.",
                },
              ].map(item => (
                <div key={item.title} className="bg-background rounded-xl border border-border p-7 flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About section ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-primary/5 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img src="/arun-asif.png" alt="Arun Asif" className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="space-y-5 flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">About Me</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  I'm a scientist, not a lawyer — and that's the point.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  I hold a PhD specializing in organ-on-a-chip, organoids, spheroids, stem cells, and microfluidic platforms. After navigating the EB-2 NIW process myself, I realized how accessible self-petitioning can be with the right documents. These are the actual files from my approved petition — shared so other skilled researchers and scientists don't have to overpay for legal help.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {["PhD Scientist", "NIW Approved", "Self-Petitioned"].map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-border text-foreground rounded-full px-3 py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/arun-asif-phd-2b4b0797/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="font-medium">
                      Connect on LinkedIn
                    </Button>
                  </a>
                  <a
                    href="https://www.youtube.com/@ArunAsif"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="font-medium">
                      Watch on YouTube
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
