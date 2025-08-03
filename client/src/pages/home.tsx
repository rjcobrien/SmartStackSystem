import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadMagnetForm from "@/components/lead-magnet-form";
import ProductCard from "@/components/product-card";
import BlogCard from "@/components/blog-card";
import { CheckCircle, Users, Star, Shield, Brain, Heart, Download, Calendar } from "lucide-react";

export default function Home() {
  const { data: featuredProducts } = useQuery({
    queryKey: ["/api/products/featured"],
  });

  const { data: featuredBlogPost } = useQuery({
    queryKey: ["/api/blog/featured"],
  });

  return (
    <div className="bg-neutral">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 font-serif leading-tight">
                Stop Guessing. <br />
                <span className="text-primary">Start Stacking</span> Smart.
              </h1>
              <p className="text-xl text-warm-gray mb-8 leading-relaxed">
                AI-powered supplement guidance designed specifically for women 35+ navigating hormonal changes, sleep issues, and supplement overwhelm.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="text-secondary mr-3 w-5 h-5" />
                  <span className="text-warm-gray">Personalized supplement stacks for your unique needs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-secondary mr-3 w-5 h-5" />
                  <span className="text-warm-gray">Cut through supplement noise and confusion</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-secondary mr-3 w-5 h-5" />
                  <span className="text-warm-gray">Evidence-based recommendations you can trust</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-200 shadow-lg h-auto"
                >
                  <a href="#blueprint">
                    <Download className="w-4 h-4 mr-2" />
                    Get Your Free Smart Stack Blueprint
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200 h-auto"
                >
                  <Link href="/quiz">
                    Take the Stack Builder Quiz
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-warm-gray">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-secondary" />
                  <span>10,000+ women helped</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-accent" />
                  <span>4.9/5 average rating</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  <span>Science-backed recommendations</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Confident woman holding supplements"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />

              {/* Floating Elements */}
              <Card className="absolute -top-4 -right-4 p-4 border border-secondary/20">
                <CardContent className="p-0 text-center">
                  <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-charcoal">AI-Powered</p>
                  <p className="text-xs text-warm-gray">Recommendations</p>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-4 -left-4 p-4 border border-accent/20">
                <CardContent className="p-0 text-center">
                  <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold text-charcoal">Women 35+</p>
                  <p className="text-xs text-warm-gray">Specialized</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Builder Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
            Your Personalized Stack Starts Here
          </h2>
          <p className="text-xl text-warm-gray mb-8">
            Take our 2-minute quiz to discover your optimal supplement stack based on your unique needs and goals.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Link href="/quiz">
              Start Your Stack Builder Quiz
            </Link>
          </Button>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section id="blueprint" className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Lead Magnet Preview */}
            <div className="mb-12 lg:mb-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Smart Stack Blueprint PDF preview"
                  className="rounded-lg shadow-2xl w-full h-auto transform rotate-3"
                />
                <div className="absolute -top-4 -right-4 bg-accent text-white p-4 rounded-full shadow-lg">
                  <span className="font-bold text-lg">FREE</span>
                </div>
              </div>
            </div>

            {/* Lead Magnet Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 font-serif">
                The Smart Stack Blueprint™
              </h2>
              <p className="text-xl text-warm-gray mb-6">
                Your complete guide to building an effective supplement routine that actually works for women 35+.
              </p>

              {/* What's Included */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-secondary mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-charcoal">Foundation Stack Framework</h4>
                    <p className="text-warm-gray">The 5 essential supplements every woman needs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-secondary mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-charcoal">Timing & Dosage Guide</h4>
                    <p className="text-warm-gray">When and how much to take for maximum absorption</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-secondary mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-charcoal">Quality Checklist</h4>
                    <p className="text-warm-gray">How to spot high-quality supplements and avoid duds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-secondary mr-3 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-charcoal">Common Mistakes to Avoid</h4>
                    <p className="text-warm-gray">Save money and time by avoiding these pitfalls</p>
                  </div>
                </div>
              </div>

              <LeadMagnetForm />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts && Array.isArray(featuredProducts) && featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
                Trusted Product Recommendations
              </h2>
              <p className="text-xl text-warm-gray max-w-3xl mx-auto">
                Hand-picked supplements from brands we trust, tested by real women.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(featuredProducts) ? featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              )) : null}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/products">
                  View Complete Product Database
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog Post */}
      {featuredBlogPost && typeof featuredBlogPost === 'object' && 'id' in featuredBlogPost && (
        <section className="py-20 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
                Knowledge Hub
              </h2>
              <p className="text-xl text-warm-gray max-w-3xl mx-auto">
                Evidence-based articles and insights to help you make informed decisions.
              </p>
            </div>
            <BlogCard post={featuredBlogPost} featured />
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Browse All Articles
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Stack Audit CTA */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Need Personalized Guidance?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get expert review of your current supplement routine with our Stack Audit service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
            >
              <Link href="/stack-audit">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Stack Audit
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Link href="/stack-guides">
                Learn More About Stacks
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
