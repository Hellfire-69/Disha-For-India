"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, CheckCircle2, User, Target, Clock, MapPin, Check } from "lucide-react";
import { calculateBestProgram, type QuizAnswers } from "@/lib/quizMap";
import type { Program } from "@/lib/types";

interface ProgramQuizProps {
  programs: Program[];
}

const QUESTIONS = [
  {
    id: "q1",
    title: "What best describes you?",
    icon: User,
    options: ["Student", "Working Professional", "Entrepreneur", "Homemaker"]
  },
  {
    id: "q2",
    title: "What's your primary goal?",
    icon: Target,
    options: ["Learn new skills", "Start a business", "Give back to community", "Improve health"]
  },
  {
    id: "q3",
    title: "How much time can you commit?",
    icon: Clock,
    options: ["A few hours/week", "Part time", "Full time", "Flexible"]
  },
  {
    id: "q4",
    title: "Where are you based?",
    icon: MapPin,
    options: ["Metro city", "Tier 2 city", "Rural area", "Open to relocation"]
  }
];

export default function ProgramQuiz({ programs }: ProgramQuizProps) {
  const [step, setStep] = useState(0); // 0 to 3 are questions, 4 is result
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [matchedProgram, setMatchedProgram] = useState<Program | null>(null);

  const handleSelect = (option: string) => {
    const currentQuestionId = QUESTIONS[step].id as keyof QuizAnswers;
    const newAnswers = { ...answers, [currentQuestionId]: option };
    setAnswers(newAnswers);

    if (step < 3) {
      setTimeout(() => setStep(step + 1), 300); // Small delay for UX
    } else {
      // Calculate Result
      const bestId = calculateBestProgram(newAnswers as QuizAnswers);
      const program = programs.find((p) => p.id === bestId) || programs[0]; // Fallback safety net
      setMatchedProgram(program);
      setTimeout(() => setStep(4), 300);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setMatchedProgram(null);
  };

  // Progress bar calculation (only for questions)
  const progressPercent = step < 4 ? ((step) / 4) * 100 : 100;

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-12 relative overflow-hidden">
      
      {/* Progress Bar (hidden on result screen) */}
      {step < 4 && (
        <div className="w-full max-w-2xl mx-auto px-6 mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="font-accent text-sm font-bold text-text-muted uppercase tracking-wider">
              Question {step + 1} of 4
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Slide Container */}
      <div className="relative w-full max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* QUESTIONS */}
          {step < 4 && (
            <motion.div
              key={`question-${step}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-8">
                {(() => {
                  const Icon = QUESTIONS[step].icon;
                  return <Icon className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-text mb-12">
                {QUESTIONS[step].title}
              </h2>

              {/* Semantic ARIA roles: radiogroup */}
              <div 
                role="radiogroup" 
                aria-labelledby={`question-${step}-title`}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              >
                <span id={`question-${step}-title`} className="sr-only">{QUESTIONS[step].title}</span>
                
                {QUESTIONS[step].options.map((option) => {
                  const isSelected = answers[QUESTIONS[step].id as keyof QuizAnswers] === option;
                  return (
                    <div
                      key={option}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => handleSelect(option)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelect(option);
                        }
                      }}
                      className={`relative flex items-center justify-between p-6 md:p-8 border-2 rounded-3xl cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4
                        ${isSelected 
                          ? "border-primary bg-primary text-white shadow-lg scale-[1.02]" 
                          : "border-border bg-white text-text hover:border-primary/50 hover:bg-primary-light/30 hover:shadow-md"
                        }`}
                    >
                      <span className="font-display font-bold text-xl md:text-2xl">{option}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                        ${isSelected ? "border-white bg-white" : "border-gray-300"}
                      `}>
                        {isSelected && <Check className="w-4 h-4 text-primary" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {step === 4 && matchedProgram && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-display font-bold text-4xl text-text mb-4">We Found Your Match!</h2>
                <p className="font-body text-text-muted text-xl">Based on your answers, this program is the perfect fit for you.</p>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row group">
                {/* Result Image */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                  <Image
                    src={matchedProgram.image}
                    alt={matchedProgram.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 md:bg-gradient-to-r md:from-black/40 to-transparent flex items-end p-8">
                    <span className="inline-block px-4 py-1.5 bg-primary rounded-full font-accent text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {matchedProgram.category.replace("-", " ")}
                    </span>
                  </div>
                </div>

                {/* Result Content */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
                    {matchedProgram.title}
                  </h3>
                  <p className="font-body text-text-muted text-lg leading-relaxed mb-8">
                    {matchedProgram.description}
                  </p>
                  
                  <div className="mb-10">
                    <h4 className="font-accent font-bold text-sm tracking-wider text-text uppercase mb-4">Key Outcomes</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchedProgram.outcomes.slice(0, 4).map((outcome, i) => (
                        <li key={i} className="flex items-start text-sm font-body text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mr-2 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                    <Link 
                      href="/volunteer" 
                      className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-body font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center text-center"
                    >
                      Apply Now
                    </Link>
                    <Link 
                      href={`/programs/${matchedProgram.id}`} 
                      className="w-full sm:w-auto px-8 py-3 bg-white border border-border text-text font-body font-bold rounded-xl hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors flex items-center justify-center text-center group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button 
                  onClick={resetQuiz}
                  className="inline-flex items-center text-text-muted hover:text-primary transition-colors font-body font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
