import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertStackAuditRequestSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, TrendingUp, Calendar, Star, CheckCircle, DollarSign } from "lucide-react";

const formSchema = insertStackAuditRequestSchema.extend({
  budget: z.string().min(1, "Please select your budget range"),
});

type FormData = z.infer<typeof formSchema>;

export default function StackAudit() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentSupplements: "",
      healthGoals: "",
      challenges: "",
      budget: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/stack-audit", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      toast({
        title: "Audit Request Submitted!",
        description: "We'll review your information and contact you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="text-secondary text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-charcoal mb-4 font-serif">
            Audit Request Submitted!
          </h1>
          <p className="text-xl text-warm-gray mb-8">
            Thank you for submitting your stack audit request. Our certified nutritionist will review your information and contact you within 24 hours to schedule your personalized consultation.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-charcoal mb-4">What Happens Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm mr-3">1</div>
                <span className="text-warm-gray">We review your current supplement routine and health goals</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-sm mr-3">2</div>
                <span className="text-warm-gray">Our nutritionist prepares your personalized optimization plan</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm mr-3">3</div>
                <span className="text-warm-gray">We schedule a call to discuss your recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charcoal to-charcoal/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Service Description */}
            <div className="mb-12 lg:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                Personal Stack Audit Service
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get personalized, expert guidance on your current supplement routine. Our certified nutritionists will review your stack and provide customized recommendations.
              </p>

              {/* Service Features */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <UserCheck className="text-accent w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Expert 1-on-1 Review</h4>
                    <p className="text-gray-300">Certified nutritionist analyzes your current supplements, health goals, and lifestyle</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="text-secondary w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Personalized Optimization Plan</h4>
                    <p className="text-gray-300">Detailed recommendations to improve effectiveness and reduce costs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="text-primary w-6 h-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Follow-up Support</h4>
                    <p className="text-gray-300">30-day email support for questions and adjustments</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <Card className="bg-white/10 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Complete Stack Audit</h3>
                      <p className="text-gray-300">Comprehensive review & optimization plan</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-accent">$97</div>
                      <div className="text-sm text-gray-300 line-through">$150 value</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="text-secondary mr-2 w-4 h-4" />
                      <span className="text-gray-300">Current stack analysis</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-secondary mr-2 w-4 h-4" />
                      <span className="text-gray-300">Personalized recommendations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-secondary mr-2 w-4 h-4" />
                      <span className="text-gray-300">Cost optimization suggestions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-secondary mr-2 w-4 h-4" />
                      <span className="text-gray-300">30-day follow-up support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Testimonial */}
            <div>
              <Card className="bg-white/10 backdrop-blur mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://pixabay.com/get/gb374ef2f772de0fc5c2ffae777b6f61a997196be1309c634d512afb7427291390cfde7a97d835cf5e13bc7e9ec28c00e665e00d1824ae7994e9712cdf4c81c4e_1280.jpg"
                      alt="Satisfied customer testimonial"
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-accent w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <h4 className="font-semibold text-white">Sarah M., 42</h4>
                      <p className="text-sm text-gray-300">Toronto, Canada</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic mb-4">
                    "I was taking 12 different supplements and spending $200/month with no clear results. After my stack audit, I'm down to 6 targeted supplements, spending 40% less, and actually feeling the difference!"
                  </p>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-6 font-serif">How It Works</h3>

                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Submit Your Info</h4>
                    <p className="text-gray-300 text-sm">Complete our detailed intake form about your current supplements and health goals</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Expert Analysis</h4>
                    <p className="text-gray-300 text-sm">Our nutritionist reviews your stack for effectiveness, interactions, and optimization</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Get Your Plan</h4>
                    <p className="text-gray-300 text-sm">Receive a detailed report with personalized recommendations and next steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Request Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">
              Book Your Stack Audit
            </h2>
            <p className="text-xl text-warm-gray">
              Tell us about your current supplement routine and health goals. We'll create a personalized optimization plan just for you.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Current Supplements */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Current Supplement Routine</h3>
                    <FormField
                      control={form.control}
                      name="currentSupplements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List all supplements you're currently taking</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please include brand names, dosages, and how often you take each supplement. For example: Nature's Way Vitex 400mg daily, Thorne Magnesium 200mg before bed, etc."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Health Goals */}
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Health Goals & Concerns</h3>
                    <FormField
                      control={form.control}
                      name="healthGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are your primary health goals?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you're hoping to achieve with your supplements. For example: better sleep, hormone balance, increased energy, mood support, etc."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Challenges */}
                  <div>
                    <FormField
                      control={form.control}
                      name="challenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What challenges are you facing with your current routine?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about any issues you're experiencing. For example: not seeing results, too many pills, side effects, cost concerns, confusion about timing, etc."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What's your monthly supplement budget?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-50">Under $50/month</SelectItem>
                              <SelectItem value="50-100">$50-100/month</SelectItem>
                              <SelectItem value="100-150">$100-150/month</SelectItem>
                              <SelectItem value="150-200">$150-200/month</SelectItem>
                              <SelectItem value="over-200">Over $200/month</SelectItem>
                              <SelectItem value="flexible">Budget is flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-accent text-white hover:bg-accent/90 text-lg py-6"
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      {mutation.isPending ? "Submitting Request..." : "Book My Stack Audit - $97"}
                    </Button>
                    <p className="text-sm text-warm-gray mt-4 text-center">
                      Secure payment will be processed after we review your information and confirm your audit appointment.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">How long does the audit process take?</h3>
                <p className="text-warm-gray">
                  The entire process typically takes 3-5 business days. Once you submit your information, our nutritionist will review your case within 24 hours and schedule a consultation call within 2-3 days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">What qualifications do your nutritionists have?</h3>
                <p className="text-warm-gray">
                  Our team consists of registered dietitians and certified nutrition specialists with advanced training in functional medicine and women's health. All have at least 5 years of experience in supplement optimization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">Do you provide specific product recommendations?</h3>
                <p className="text-warm-gray">
                  Yes, we provide specific brand and product recommendations based on quality, bioavailability, and value. We also suggest alternatives at different price points to fit your budget.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">What if I'm not satisfied with my audit?</h3>
                <p className="text-warm-gray">
                  We offer a 100% satisfaction guarantee. If you're not completely satisfied with your personalized recommendations, we'll provide a full refund within 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
