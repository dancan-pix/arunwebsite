import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-background py-20 px-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl border shadow-sm text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Checkout Cancelled</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Your payment was cancelled. No charges were made to your account.
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
