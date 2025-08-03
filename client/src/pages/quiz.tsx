import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { QuizQuestion as QuizQuestionType } from "@shared/schema";
import QuizQuestionComponent from "@/components/quiz-question";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Download } from "lucide-react";

export default function Quiz() {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  const { data: questions, isLoading } = useQuery<QuizQuestionType[]>({
    queryKey: ["/api/quiz/questions"],
  });

  const saveResponseMutation = useMutation({
    mutationFn: async (data: { leadId: string; questionId: string; answer: string }) => {
      const response = await apiRequest("POST", "/api/quiz/responses", data);
      return response.json();
    },
  });

  const getResultsMutation = useMutation({
    mutationFn: async (leadId: string) => {
      const response = await apiRequest("GET", `/api/quiz/results/${leadId}`);
      return response.json();
    },
    onSuccess: (data) => {
      setRecommendations(data.recommendations);
      setIsCompleted(true);
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (!questions || !currentQuestion || !selectedAnswer) return;

    // Save response if we have a leadId
    if (leadId) {
      saveResponseMutation.mutate({
        leadId,
        questionId: currentQuestion.id,
        answer: selectedAnswer
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed, generate results
      if (leadId) {
        getResultsMutation.mutate(leadId);
      } else {
        // For demo purposes, show results anyway
        setRecommendations({
          stackType: "hormone-balance",
          title: "Your Hormone Balance Stack",
          supplements: [
            {
              name: "Vitex (Chasteberry)",
              dosage: "400mg daily",
              purpose: "supports hormone regulation",
              priority: "Priority"
            },
            {
              name: "Vitamin D3",
              dosage: "2000 IU daily",
              purpose: "hormone synthesis support",
              priority: "Essential"
            }
          ]
        });
        setIsCompleted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Create a temporary lead ID for demo purposes
  useEffect(() => {
    if (!leadId) {
      setLeadId("demo-lead-" + Date.now());
    }
  }, [leadId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-warm-gray">Loading your personalized quiz...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <p className="text-warm-gray">Quiz questions are not available at this time.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted && recommendations) {
    return (
      <div className="min-h-screen bg-neutral py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <CheckCircle className="text-secondary text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-charcoal mb-4 font-serif">
              Your Personalized Stack is Ready!
            </h1>
            <p className="text-warm-gray">
              Based on your responses, we've created a custom supplement stack designed for your needs.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                {recommendations.title}
              </h2>
              <div className="space-y-4">
                {recommendations.supplements.map((supplement: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-3" />
                      <div>
                        <p className="font-medium text-charcoal">{supplement.name}</p>
                        <p className="text-sm text-warm-gray">
                          {supplement.dosage} - {supplement.purpose}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      supplement.priority === "Priority" 
                        ? "bg-accent text-white" 
                        : "bg-primary text-white"
                    }`}>
                      {supplement.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
            >
              <Download className="w-4 h-4 mr-2" />
              Get Your Complete Stack Guide + Blueprint
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-serif">
            Your Personalized Stack Starts Here
          </h1>
          <p className="text-xl text-warm-gray mb-8">
            Take our 2-minute quiz to discover your optimal supplement stack based on your unique needs and goals.
          </p>
        </div>

        {currentQuestion && (
          <QuizQuestionComponent
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={!!selectedAnswer}
            canGoPrevious={currentQuestionIndex > 0}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        )}
      </div>
    </div>
  );
}
