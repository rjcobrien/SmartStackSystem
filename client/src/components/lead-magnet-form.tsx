import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadMagnetForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/leads", {
        ...data,
        source: "blueprint",
      });
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Check your email for your free Smart Stack Blueprint",
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
      <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary/20 text-center">
        <div className="text-secondary text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-charcoal mb-2">Blueprint Sent!</h3>
        <p className="text-warm-gray text-sm">
          Check your email for your free Smart Stack Blueprint. Don't forget to check your spam folder!
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-lg border border-secondary/20">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Get Your Free Blueprint Now</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your first name"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
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
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            {mutation.isPending ? "Sending..." : "Download My Free Blueprint"}
          </Button>
        </div>
        <p className="text-xs text-warm-gray mt-3 text-center">
          No spam, ever. Unsubscribe anytime. We respect your privacy.
        </p>
      </form>
    </Form>
  );
}