import { QuizQuestion } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizQuestionProps {
  question: QuizQuestion;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentIndex: number;
  totalQuestions: number;
}

export default function QuizQuestionComponent({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  currentIndex,
  totalQuestions,
}: QuizQuestionProps) {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-br from-neutral to-secondary/5 rounded-2xl p-8 shadow-lg">
      {/* Quiz Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-warm-gray">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Quiz Question */}
      <div>
        <h3 className="text-2xl font-semibold text-charcoal mb-6 font-serif">
          {question.question}
        </h3>

        {/* Quiz Options */}
        <div className="grid md:grid-cols-2 gap-4">
          {(question.options as any[]).map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(option.value)}
              className={`text-left p-6 bg-white border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 ${
                selectedAnswer === option.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <i className={`${option.icon || "fas fa-check"} text-accent text-xl mr-4 mt-1`} />
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">{option.label}</h4>
                  {option.description && (
                    <p className="text-sm text-warm-gray">{option.description}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="px-6 py-3 bg-primary text-white hover:bg-primary/90"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}