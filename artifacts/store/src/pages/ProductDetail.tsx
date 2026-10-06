import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useGetProduct, useCreateCheckoutSession } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { Check, AlertCircle, ShieldCheck, RefreshCw, Clock, Lock, FileText, FileType } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProductIllustration } from "@/components/product/ProductIllustration";
import { Link } from "wouter";

export default function ProductDetail({ params }: { params: { productId: string } }) {
  const productId = params.productId;
  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: { enabled: !!productId }
  });

  const createCheckout = useCreateCheckoutSession();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Separate active prices into PDF and Word
  const activePrices = useMemo(() => {
    return (product?.prices || []).filter((p) => p.active);
  }, [product]);

  const pdfPrice = useMemo(() => {
    return activePrices.find((p) => (p.metadata as any)?.format === 'pdf') || 
           (activePrices.length === 1 ? activePrices[0] : null);
  }, [activePrices]);

  const wordPrice = useMemo(() => {
    return activePrices.find((p) => (p.metadata as any)?.format === 'word') || null;
  }, [activePrices]);

  const hasFormatChoice = !!pdfPrice && !!wordPrice;
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'word'>('pdf');

  const selectedPrice = hasFormatChoice
    ? (selectedFormat === 'word' ? wordPrice : pdfPrice)
    : (pdfPrice || activePrices[0] || null);

  const formatPrice = (price: typeof pdfPrice) =>
    price?.unit_amount
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency }).format(price.unit_amount / 100)
      : 'Free';

  const imageUrl = product?.images?.[0];

  const handleCheckout = () => {
    if (!selectedPrice) return;
    setIsCheckingOut(true);
    setCheckoutError(null);
    createCheckout.mutate({
      data: {
        priceId: selectedPrice.id,
        successUrl: window.location.origin + import.meta.env.BASE_URL + "checkout/success",
        cancelUrl: window.location.origin + import.meta.env.BASE_URL + "checkout/cancel"
      }
    }, {
      onSuccess: (data) => { window.location.href = data.url; },
      onError: (error: any) => {
        setIsCheckingOut(false);
        setCheckoutError(error?.response?.data?.error || "An error occurred during checkout");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-[4/3] rounded-xl" />
            <div className="space-y-5 pt-4">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">This item doesn't exist or is no longer available.</p>
          <Link href="/shop"><Button>Browse All Products</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Illustration + Description */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-muted aspect-[16/10]">
                {imageUrl ? (
                  <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ProductIllustration productName={product.name} />
                )}
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4">About this template</h2>
                <div
                  className="prose prose-sm prose-slate max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }}
                />
              </div>
            </div>

            {/* Right: Checkout panel */}
            <div className="lg:sticky lg:top-24 space-y-5">
              {product.metadata?.category && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/8 px-3 py-1.5 rounded-full">
                  {product.metadata.category}
                </span>
              )}

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {product.metadata?.shortDescription && (
                <p className="text-muted-foreground text-base leading-relaxed">
                  {product.metadata.shortDescription}
                </p>
              )}

              {/* Format selector */}
              {hasFormatChoice && (
                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-foreground">Choose your format:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedFormat('pdf')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedFormat === 'pdf'
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border bg-white hover:border-primary/40 hover:bg-muted/50'
                      }`}
                    >
                      {selectedFormat === 'pdf' && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3}/>
                        </span>
                      )}
                      <FileText className={`h-6 w-6 ${selectedFormat === 'pdf' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">PDF</p>
                        <p className="text-xs text-muted-foreground">Read-only · Print-ready</p>
                      </div>
                      <span className={`text-base font-bold ${selectedFormat === 'pdf' ? 'text-primary' : 'text-foreground'}`}>
                        {formatPrice(pdfPrice)}
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedFormat('word')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedFormat === 'word'
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border bg-white hover:border-primary/40 hover:bg-muted/50'
                      }`}
                    >
                      {selectedFormat === 'word' && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3}/>
                        </span>
                      )}
                      <FileType className={`h-6 w-6 ${selectedFormat === 'word' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">Word (.docx)</p>
                        <p className="text-xs text-muted-foreground">Fully editable</p>
                      </div>
                      <span className={`text-base font-bold ${selectedFormat === 'word' ? 'text-primary' : 'text-foreground'}`}>
                        {formatPrice(wordPrice)}
                      </span>
                    </button>
                  </div>
                  {selectedFormat === 'word' && (
                    <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2 border border-border">
                      Word version lets you fill in your own details directly in Microsoft Word or Google Docs.
                    </p>
                  )}
                </div>
              )}

              {/* Price + CTA */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-4xl text-foreground">{formatPrice(selectedPrice)}</span>
                  <span className="text-sm text-muted-foreground">one-time · instant download</span>
                </div>

                {checkoutError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{checkoutError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold rounded-xl shadow-sm"
                  onClick={handleCheckout}
                  disabled={!selectedPrice || isCheckingOut}
                  data-testid="button-checkout"
                >
                  {isCheckingOut
                    ? "Preparing checkout..."
                    : `Buy ${hasFormatChoice ? (selectedFormat === 'word' ? 'Word' : 'PDF') + ' Version' : ''} — ${formatPrice(selectedPrice)}`}
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Secure checkout powered by Stripe
                </div>

                <div className="border-t border-border pt-5 space-y-3">
                  {[
                    { icon: <Check className="h-4 w-4 text-primary shrink-0" />, text: "Instant download after payment" },
                    { icon: <Clock className="h-4 w-4 text-primary shrink-0" />, text: "Lifetime access — yours to keep forever" },
                    { icon: <RefreshCw className="h-4 w-4 text-primary shrink-0" />, text: "Free updates when the template is improved" },
                    { icon: <ShieldCheck className="h-4 w-4 text-primary shrink-0" />, text: "30-day money-back guarantee" },
                  ].map(item => (
                    <div key={item.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author trust strip */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow flex-shrink-0">
                  <img src="/arun-asif.png" alt="Arun Asif" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Created by Arun Asif, PhD</p>
                  <p className="text-xs text-muted-foreground">NIW-approved scientist · These are his actual petition documents</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
