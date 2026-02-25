
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, AlertTriangle, RefreshCw, School, Moon, Star, Terminal, Lock, Trophy } from 'lucide-react';
import { getInitialStory, getNextStorySegment, StorySegment } from './lib/storyEngine';
import { generateMathProblem, MathProblem } from './lib/mathGenerator';
import { MathModal } from './components/MathModal';
import { DevMap } from './components/DevMap';
import { EndingsModal, ALL_ENDINGS } from './components/EndingsModal';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [story, setStory] = useState<StorySegment | null>(null);
  const [loading, setLoading] = useState(false);
  const [mathProblem, setMathProblem] = useState<MathProblem | null>(null);
  const [pendingChoice, setPendingChoice] = useState<{text: string, index: number} | null>(null);
  const [detentionMeter, setDetentionMeter] = useState(0);
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>([]);
  const [showEndings, setShowEndings] = useState(false);
  
  // Dev Mode State
  const [showDevLogin, setShowDevLogin] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const [showDevMap, setShowDevMap] = useState(false);
  const [devError, setDevError] = useState(false);

  // Load unlocked endings from localStorage
  useEffect(() => {
    const savedEndings = localStorage.getItem('mathAdventureEndings');
    if (savedEndings) {
      try {
        setUnlockedEndings(JSON.parse(savedEndings));
      } catch (e) {
        console.error("Failed to parse endings", e);
      }
    }
  }, []);

  // Initialize game
  const startGame = () => {
    setLoading(true);
    setGameState('playing');
    setDetentionMeter(0);
    
    // Simulate a brief "loading" for effect, though it's instant now
    setTimeout(() => {
      const segment = getInitialStory();
      setStory(segment);
      setLoading(false);
    }, 600);
  };

  // Handle user choice selection
  const handleChoice = (choiceText: string, index: number) => {
    setPendingChoice({ text: choiceText, index });
    // Generate a math problem
    const problem = generateMathProblem();
    setMathProblem(problem);
  };

  // Handle math answer
  const handleMathResult = (isCorrect: boolean) => {
    setMathProblem(null); // Close modal
    setLoading(true);

    // Update detention meter if wrong
    let newDetentionLevel = detentionMeter;
    if (!isCorrect) {
      newDetentionLevel = Math.min(detentionMeter + 34, 100);
      setDetentionMeter(newDetentionLevel); // 3 strikes and you're out roughly
    }

    setTimeout(() => {
      if (story && pendingChoice) {
        const newSegment = getNextStorySegment(
          story.id,
          pendingChoice.index,
          isCorrect
        );

        setStory(newSegment);

        // Check for ending unlock
        if (newSegment.ending) {
          setUnlockedEndings(prev => {
            if (!prev.includes(newSegment.ending!.id)) {
              const newEndings = [...prev, newSegment.ending!.id];
              localStorage.setItem('mathAdventureEndings', JSON.stringify(newEndings));
              return newEndings;
            }
            return prev;
          });
        }

        if (newSegment.isGameOver || (!isCorrect && newDetentionLevel >= 100)) {
          setGameState('gameover');
        }
      }
      setLoading(false);
      setPendingChoice(null);
    }, 600);
  };

  const handleDevLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (devPassword === 'sivart') {
      setShowDevLogin(false);
      setShowDevMap(true);
      setDevPassword('');
      setDevError(false);
    } else {
      setDevError(true);
      setTimeout(() => setDevError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Dev Map Overlay */}
      {showDevMap && <DevMap onClose={() => setShowDevMap(false)} />}

      {/* Endings Modal */}
      {showEndings && <EndingsModal unlockedEndings={unlockedEndings} onClose={() => setShowEndings(false)} />}

      {/* Dev Login Modal */}
      <AnimatePresence>
        {showDevLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl w-full max-w-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
                  <Terminal size={18} /> Developer Access
                </h3>
                <button onClick={() => setShowDevLogin(false)} className="text-slate-500 hover:text-white">
                  <div className="sr-only">Close</div>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleDevLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      value={devPassword}
                      onChange={(e) => setDevPassword(e.target.value)}
                      className={`w-full bg-slate-950 border ${devError ? 'border-red-500' : 'border-slate-700'} rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono`}
                      placeholder="Enter access code"
                      autoFocus
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Unlock Map
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-9xl text-slate-700">∑</div>
        <div className="absolute bottom-20 right-20 text-9xl text-slate-700">π</div>
        <div className="absolute top-1/2 left-1/4 text-8xl text-slate-700">x</div>
        <Star className="absolute top-20 right-1/3 text-slate-800 w-12 h-12" />
        <Moon className="absolute bottom-1/3 left-10 text-slate-800 w-16 h-16" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        
        {/* Header */}
        <header className="mb-8 text-center relative">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 flex items-center justify-center gap-3">
            <School className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Math Adventure
            </span>
          </h1>
          <p className="text-slate-400 font-medium">Survive class. Solve for x. Don't get detention.</p>
        </header>

        {/* Game Container */}
        <div className="bg-slate-900 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden min-h-[500px] flex flex-col relative border border-slate-800 ring-1 ring-white/10">
          
          {/* Detention Meter */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-800">
              <motion.div 
                className={`h-full ${detentionMeter > 60 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}
                initial={{ width: 0 }}
                animate={{ width: `${detentionMeter}%` }}
              />
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 relative">
              {/* Dev Mode Button */}
              <button 
                onClick={() => setShowDevLogin(true)}
                className="absolute top-4 right-4 p-2 text-slate-700 hover:text-indigo-400 transition-colors rounded-full hover:bg-slate-800"
                title="Developer Access"
              >
                <Terminal size={20} />
              </button>

              {/* Endings Button */}
              <button 
                onClick={() => setShowEndings(true)}
                className="absolute top-4 left-4 p-2 text-slate-700 hover:text-yellow-400 transition-colors rounded-full hover:bg-slate-800 flex items-center gap-2"
                title="View Endings"
              >
                <Trophy size={20} />
                <span className="text-xs font-bold">Endings Unlocked: {unlockedEndings.length}/{ALL_ENDINGS.length}</span>
              </button>

              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-indigo-400 mb-4 ring-4 ring-slate-800 shadow-lg">
                <BookOpen size={48} />
              </div>
              <div className="space-y-4 max-w-md">
                <p className="text-lg text-slate-300">
                  You are a 6th grader in algebra class. 
                  Every choice you make requires a quick calculation. 
                  Get it wrong, and things might get awkward...
                </p>
                <div className="bg-amber-900/20 border border-amber-900/50 p-4 rounded-xl text-sm text-amber-200 flex items-start gap-3 text-left">
                  <AlertTriangle className="shrink-0 w-5 h-5 text-amber-500" />
                  <p>Warning: Contains combining like terms and distributive property. Calculators strictly prohibited!</p>
                </div>
              </div>
              <button 
                onClick={startGame}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-lg shadow-indigo-900/20 hover:shadow-indigo-600/40 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading Class...' : 'Enter Classroom'}
              </button>
            </div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && story && (
            <div className="flex-1 flex flex-col p-6 md:p-10">
              
              {/* Story Text */}
              <div className="flex-1 mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={story.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="prose prose-lg prose-invert max-w-none"
                  >
                    <p className="text-xl md:text-2xl leading-relaxed font-medium text-slate-200 whitespace-pre-line">
                      {story.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Choices */}
              <div className="space-y-3 mt-auto">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">What do you do?</p>
                {story.choices && story.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(choice.text, idx)}
                    disabled={loading}
                    className="w-full text-left p-5 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-indigo-500 transition-all group flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-300 group-hover:text-indigo-300 text-lg">{choice.text}</span>
                    <Calculator className="w-5 h-5 text-slate-600 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Game Over */}
          {gameState === 'gameover' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ring-4 shadow-lg ${
                story?.ending?.type === 'good' ? 'bg-green-900/20 text-green-500 ring-green-900/10' :
                story?.ending?.type === 'secret' ? 'bg-purple-900/20 text-purple-500 ring-purple-900/10' :
                story?.ending?.type === 'neutral' ? 'bg-slate-800 text-slate-400 ring-slate-700' :
                'bg-red-900/20 text-red-500 ring-red-900/10'
              }`}>
                {story?.ending?.type === 'good' ? <Trophy size={48} /> : 
                 story?.ending?.type === 'secret' ? <Star size={48} /> :
                 <AlertTriangle size={48} />}
              </div>
              
              <h2 className="text-3xl font-bold text-white">
                {story?.ending ? story.ending.title : "Class Dismissed"}
              </h2>
              
              <div className="text-lg text-slate-400 max-w-md">
                {detentionMeter >= 100 
                  ? "You accumulated too much detention time. See you in summer school!" 
                  : story?.text || "The adventure has ended."}
              </div>

              {story?.ending && (
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Ending Unlocked</p>
                  <p className="text-indigo-300 font-medium">{story.ending.description}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowEndings(true)}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  <Trophy size={20} />
                  Endings
                </button>
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-indigo-900/20"
                >
                  <RefreshCw size={20} />
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-indigo-400 font-medium animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <MathModal 
        isOpen={!!mathProblem} 
        problem={mathProblem} 
        onAnswer={handleMathResult} 
      />
    </div>
  );
}
