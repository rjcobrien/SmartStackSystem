import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Moon, Leaf, CheckCircle } from "lucide-react";

export default function StackGuides() {
  const guides = [
    {
      id: "hormone-balance",
      title: "Hormone Balance Stack",
      description: "For perimenopause, mood swings, and hormonal fluctuations",
      icon: Heart,
      color: "accent",
      benefits: ["Vitex & Black Cohosh", "Adaptogenic herbs", "Essential vitamins & minerals"],
      bgClass: "from-accent/10 to-accent/5"
    },
    {
      id: "deep-sleep",
      title: "Deep Sleep Stack",
      description: "For better sleep quality and cortisol regulation",
      icon: Moon,
      color: "primary",
      benefits: ["Magnesium & L-Theanine", "Natural sleep aids", "Stress-reducing compounds"],
      bgClass: "from-primary/10 to-primary/5"
    },
    {
      id: "simplifier",
      title: "Simplifier Stack",
      description: "The minimalist approach - maximum results with fewer pills",
      icon: Leaf,
      color: "secondary",
      benefits: ["Multi-nutrient formulas", "High-impact essentials", "Budget-friendly options"],
      bgClass: "from-secondary/10 to-secondary/5"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
              Targeted Stack Guides
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Dive deep into specialized supplement stacks designed for your specific health goals and challenges.
            </p>
          </div>

          {/* Stack Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <Card key={guide.id} className={`bg-gradient-to-br ${guide.bgClass} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <IconComponent className={`text-${guide.color} text-4xl mb-4 mx-auto w-10 h-10`} />
                      <h3 className="text-xl font-bold text-charcoal mb-2 font-serif">
                        {guide.title}
                      </h3>
                      <p className="text-warm-gray">{guide.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {guide.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="text-secondary mr-2 w-4 h-4" />
                          <span className="text-sm text-warm-gray">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full bg-${guide.color} text-white hover:bg-${guide.color}/90`}
                    >
                      View {guide.title.split(' ')[0]} Guide
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Guide Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">
              How to Choose Your Stack
            </h2>
            <p className="text-xl text-warm-gray">
              Not sure which stack is right for you? Here's how to decide.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Step 1: Identify Your Primary Concern</h3>
                <p className="text-warm-gray mb-4">
                  Start by focusing on your most pressing health issue. While many symptoms can overlap, addressing your primary concern first often leads to improvements in other areas.
                </p>
                <ul className="space-y-2 text-warm-gray">
                  <li>• <strong>Hormonal issues:</strong> Hot flashes, mood swings, irregular periods</li>
                  <li>• <strong>Sleep problems:</strong> Trouble falling asleep, staying asleep, or feeling rested</li>
                  <li>• <strong>Energy concerns:</strong> Fatigue, brain fog, afternoon crashes</li>
                  <li>• <strong>Supplement overwhelm:</strong> Taking too many pills without clear results</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Step 2: Consider Your Lifestyle</h3>
                <p className="text-warm-gray mb-4">
                  Your daily routine, budget, and preferences matter. Choose a stack that fits your life:
                </p>
                <ul className="space-y-2 text-warm-gray">
                  <li>• <strong>Busy schedule:</strong> Consider the Simplifier Stack with fewer pills</li>
                  <li>• <strong>Budget conscious:</strong> Start with essentials and build gradually</li>
                  <li>• <strong>Natural preference:</strong> Look for herb-based options in our recommendations</li>
                  <li>• <strong>Sensitive to supplements:</strong> Begin with lower doses and single ingredients</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Step 3: Start Small and Track Results</h3>
                <p className="text-warm-gray mb-4">
                  No matter which stack you choose, start with 1-2 supplements and add others gradually. This helps you:
                </p>
                <ul className="space-y-2 text-warm-gray">
                  <li>• Identify which supplements are actually helping</li>
                  <li>• Avoid overwhelming your system</li>
                  <li>• Manage your budget effectively</li>
                  <li>• Adjust dosages based on your response</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-warm-gray mb-6">
              Still not sure? Take our personalized quiz to get specific recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Link href="/quiz">
                  Take the Stack Builder Quiz
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/stack-audit">
                  Get a Personal Stack Audit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
