import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Info } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-charcoal mb-1">{product.name}</h3>
          <p className="text-sm text-warm-gray">{product.brand}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-accent mr-1 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-warm-gray">{product.reviewCount.toLocaleString()} reviews</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {(product.benefits as string[]).map((benefit, index) => (
          <div key={index} className="flex items-center">
            <div className="w-2 h-2 bg-secondary rounded-full mr-2" />
            <span className="text-sm text-warm-gray">{benefit}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-charcoal">{product.price}</div>
        <Button
          asChild
          className="bg-accent text-white hover:bg-accent/90"
        >
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            View Product
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>

      {/* Affiliate Disclosure */}
      <p className="text-xs text-warm-gray mt-3 text-center flex items-center justify-center">
        <Info className="w-3 h-3 mr-1" />
        Affiliate link - we earn a small commission at no cost to you
      </p>
    </div>
  );
}