
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MathModalProps {
  isOpen: boolean;
  problem: {
    question: string;
    answer: string;
    options: string[];
  } | null;
  onAnswer: (isCorrect: boolean) => void;
}

export function MathModal({ isOpen, problem, onAnswer }: MathModalProps) {
  // Always render the container if open, use AnimatePresence for the inner part if desired, 
  // or just simple conditional rendering.
  if (!isOpen || !problem) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-indigo-500 shadow-indigo-500/20"
      >
        <div className="bg-indigo-600 p-4 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>🧮</span> Math Challenge!
          </h2>
          <p className="text-indigo-100 text-sm">Solve to proceed...</p>
        </div>
        
        <div className="p-6">
          <div className="text-2xl font-mono font-bold text-center mb-8 text-slate-100">
            {problem.question}
          </div>

          <div className="grid gap-3">
            {problem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option === problem.answer)}
                className="w-full p-4 text-left rounded-xl border-2 border-slate-700 hover:border-indigo-500 hover:bg-slate-800 transition-all font-mono text-lg font-medium text-slate-300 group hover:text-white active:scale-[0.98]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
