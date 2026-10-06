import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center py-20 border border-dashed rounded-xl bg-card">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">NIW Insights & Guides</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Coming soon — in-depth articles on the EB-2 NIW and EB-1A petition process, petition writing tips, and case study breakdowns.
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground">
              Stay tuned
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
