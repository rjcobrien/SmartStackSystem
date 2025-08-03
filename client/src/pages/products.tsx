import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory],
  });

  const categories = [
    { value: "", label: "All Products" },
    { value: "hormones", label: "Hormones" },
    { value: "sleep", label: "Sleep" },
    { value: "energy", label: "Energy" },
    { value: "basics", label: "Basics" },
  ];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
              Trusted Product Recommendations
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Hand-picked supplements from brands we trust, tested by real women, with transparent affiliate partnerships.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-primary text-white" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="h-5 bg-gray-200 rounded mb-1 w-32" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded mb-1 w-12" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-10 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-warm-gray mx-auto mb-4" />
              <p className="text-warm-gray text-lg">
                {searchTerm || selectedCategory 
                  ? "No products found matching your criteria."
                  : "No products available at this time."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">
              Our Quality Standards
            </h2>
            <p className="text-xl text-warm-gray">
              Every product we recommend meets strict quality criteria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Third-Party Testing</h4>
                  <p className="text-warm-gray">All recommended supplements are independently tested for purity and potency.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Science-Backed Formulations</h4>
                  <p className="text-warm-gray">We only recommend supplements with proven ingredients and appropriate dosages.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Transparent Sourcing</h4>
                  <p className="text-warm-gray">Clear information about ingredient sources and manufacturing practices.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Reputable Brands</h4>
                  <p className="text-warm-gray">We partner only with established brands known for quality and integrity.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Value for Money</h4>
                  <p className="text-warm-gray">Each recommendation balances quality with affordability for sustainable supplementation.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Real User Reviews</h4>
                  <p className="text-warm-gray">Our ratings reflect authentic feedback from women who've used these products.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 mt-12">
            <h3 className="text-lg font-semibold text-charcoal mb-3">Affiliate Disclosure</h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              We may earn a small commission when you purchase through our affiliate links, at no additional cost to you. 
              This helps us maintain our platform and continue providing free resources. We only recommend products we 
              genuinely believe in and that meet our strict quality standards. Our recommendations are based on 
              scientific evidence and user feedback, not commission rates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
