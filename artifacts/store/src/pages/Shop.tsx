import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useListProducts, useGetStoreStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: stats } = useGetStoreStats();
  const { data: productsData, isLoading } = useListProducts(
    activeCategory ? { category: activeCategory } : undefined
  );

  const products = productsData?.data || [];
  const categories = stats?.categories || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">

        {/* Page header */}
        <div className="bg-primary text-white py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Arun Asif NIW</p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3">Documents & Templates</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Real petition documents used in an approved EB-2 NIW application — download and adapt them for your own self-petition.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Sidebar */}
            {categories.length > 0 && (
              <div className="w-full md:w-52 flex-shrink-0">
                <div className="sticky top-24">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Filter</p>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === null
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      All Documents
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === cat.name
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="capitalize">{cat.name}</span>
                        <span className={`text-xs rounded-full px-2 py-0.5 font-semibold ${activeCategory === cat.name ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Product grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2].map(i => (
                    <div key={i} className="flex flex-col gap-3">
                      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 rounded-xl border border-dashed bg-white">
                  <h3 className="text-lg font-semibold text-foreground mb-2">No documents found</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {activeCategory ? `No documents in "${activeCategory}".` : "No documents available right now."}
                  </p>
                  {activeCategory && (
                    <Button onClick={() => setActiveCategory(null)} variant="outline" size="sm">
                      Clear filter
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
