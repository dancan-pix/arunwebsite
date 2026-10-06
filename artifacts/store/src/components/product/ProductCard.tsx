import { Link } from "wouter";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { ProductIllustration } from "./ProductIllustration";
import { ArrowRight, FileText, FileType } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const activePrices = product.prices.filter(p => p.active);
  const pdfPrice = activePrices.find(p => (p.metadata as any)?.format === 'pdf') || activePrices[0];
  const wordPrice = activePrices.find(p => (p.metadata as any)?.format === 'word');
  const hasFormats = !!pdfPrice && !!wordPrice;

  const formatPrice = (p: typeof pdfPrice) =>
    p?.unit_amount
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: p.currency }).format(p.unit_amount / 100)
      : "Free";

  return (
    <Link href={`/product/${product.id}`} className="group block h-full" data-testid={`card-product-${product.id}`}>
      <div className="flex flex-col h-full overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        {/* Illustration */}
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <ProductIllustration productName={product.name} />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 gap-3">
          {product.metadata?.category && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/8 px-2.5 py-1 rounded-full w-fit">
              {product.metadata.category}
            </span>
          )}
          <h3 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.metadata?.shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
              {product.metadata.shortDescription}
            </p>
          )}

          {/* Format badges */}
          {hasFormats && (
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted border border-border rounded px-2 py-0.5">
                <FileText className="h-3 w-3" /> PDF
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted border border-border rounded px-2 py-0.5">
                <FileType className="h-3 w-3" /> Word
              </span>
            </div>
          )}

          <div className="mt-auto flex items-end justify-between pt-3 border-t border-border">
            <div>
              {hasFormats ? (
                <div>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">From</span>
                  <div className="font-bold text-xl text-foreground">{formatPrice(pdfPrice)}</div>
                </div>
              ) : (
                <span className="font-bold text-xl text-foreground">{formatPrice(pdfPrice)}</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              View <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
