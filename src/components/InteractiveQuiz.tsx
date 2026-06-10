import { useState } from "react";
import { quizQuestions } from "../data/promptData";
import { HelpCircle, Check, X, RotateCcw, Award } from "lucide-react";

export default function InteractiveQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Answer locked
    setSelectedOption(index);
    if (index === quizQuestions[currentIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizComplete(false);
  };

  const getCurrentLevel = () => {
    if (score === quizQuestions.length) return "Maître Absolu du Prompt Engineering 🧠";
    if (score >= quizQuestions.length / 2) return "Ingénieur Apprenti de l'IA ⚡";
    return "Padawan des LLM 🌱";
  };

  const question = quizQuestions[currentIndex];

  return (
    <section 
      id="quiz" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Vérification des connaissances</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Êtes-vous un Pro du Prompt ?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Testez vos nouvelles compétences en direct à l'aide de ce petit questionnaire interactif.
          </p>
        </div>

        {/* Quiz Area Card */}
        <div className="bg-[#0b1224] border border-emerald-500/10 rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/45">
          
          {!quizComplete ? (
            <div className="space-y-6">
              
              {/* Question Index & Progress Tracker bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Question {currentIndex + 1} sur {quizQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">Score actuel : {score}</span>
              </div>
              
              {/* Micro-meter */}
              <div className="h-[3px] bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question text */}
              <h3 className="text-base sm:text-xl font-bold font-display text-white leading-relaxed select-none">
                {question.question}
              </h3>

              {/* Options list */}
              <div className="grid gap-3 pt-2">
                {question.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === question.correctIndex;
                  const isIncorrect = isSelected && !isCorrect;
                  
                  let optionStyle = "bg-[#070c18] border-slate-850 text-slate-300 hover:bg-[#121c35]/40 hover:border-emerald-500/30 cursor-pointer";
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 pointer-events-none font-bold";
                    } else if (isIncorrect) {
                      optionStyle = "bg-rose-500/15 border-rose-500/40 text-rose-300 pointer-events-none font-bold";
                    } else {
                      optionStyle = "bg-slate-900/30 border-slate-900/40 text-slate-500 pointer-events-none opacity-45";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold font-mono transition-colors ${
                          isSelected ? "bg-emerald-605 text-white" : "bg-[#0a1224] text-slate-400 border border-slate-800"
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>
                      
                      {selectedOption !== null && isCorrect && (
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedOption !== null && isIncorrect && (
                        <X className="w-5 h-5 text-rose-450 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation card */}
              {selectedOption !== null && (
                <div className="p-5 rounded-2xl bg-[#070c18] border border-slate-850 animate-fade-in space-y-2.5 mt-4">
                  <div className="flex items-center gap-2">
                    {selectedOption === question.correctIndex ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        ✔️ BRAVO ! BONNE RÉPONSE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-rose-405 uppercase tracking-widest flex items-center gap-1">
                        ❌ OUPS... PAS TOUT À FAIT
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light font-sans">
                    {question.explanation}
                  </p>
                  
                  <div className="pt-3 flex justify-end">
                    <button
                      id="quiz-btn-next"
                      onClick={handleNext}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                      <span>
                        {currentIndex < quizQuestions.length - 1 ? "Suivant" : "Voir mon Score final"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Completed screen */
            <div className="text-center space-y-6 py-6 animate-fade-in relative">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Quiz Validé !
              </h3>
              
              <div className="space-y-2 max-w-md mx-auto bg-[#070c18] py-6 px-4 rounded-2xl border border-slate-850 shadow-inner">
                <p className="text-slate-500 text-xs sm:text-sm font-light uppercase tracking-wider font-bold">Votre score final est de :</p>
                <div className="text-5xl font-display font-black text-emerald-400">
                  {score} / {quizQuestions.length}
                </div>
                <p className="text-sm sm:text-base font-bold text-teal-400 mt-2 font-display uppercase tracking-wide">
                  {getCurrentLevel()}
                </p>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto font-light leading-relaxed font-sans">
                Le Prompting est un art pragmatique d’itérations. Expérimentez différents profils et formats pour aiguiser votre style d’instructions !
              </p>

              <div className="pt-4">
                <button
                  id="quiz-btn-restart"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#070c18] hover:bg-[#121c35] border border-slate-800 hover:border-emerald-500/30 transition-all text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white cursor-pointer active:scale-95 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 text-emerald-450" />
                  <span>Recommencer le Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
