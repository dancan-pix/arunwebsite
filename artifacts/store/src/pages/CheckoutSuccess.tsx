import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-background py-20 px-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl border shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Order Successful!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for your purchase. We've sent a receipt and access instructions to your email address.
          </p>
          <div className="space-y-4">
            <Link href="/shop">
              <Button className="w-full" size="lg">Return to Shop</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
