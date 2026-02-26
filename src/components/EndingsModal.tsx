
import React from 'react';
import { motion } from 'motion/react';
import { Trophy, X, Lock, Star } from 'lucide-react';

interface EndingsModalProps {
  unlockedEndings: string[];
  onClose: () => void;
}

export const ALL_ENDINGS = [
  { id: 'valedictorian', title: 'The Valedictorian', description: 'You outsmarted the system (and the teacher).', type: 'good' },
  { id: 'expelled', title: 'Legal Trouble', description: 'You fought the law and the law won.', type: 'bad' },
  { id: 'detention_regular', title: 'Detention Regular', description: 'You and the detention monitor are on a first-name basis.', type: 'neutral' },
  { id: 'secret_agent', title: 'The Phantom Student', description: 'You found the school\'s secrets and became one of them.', type: 'secret' },
  { id: 'comedian', title: 'Class Clown Legend', description: 'Worth it for the laughs.', type: 'good' },
  { id: 'artist', title: 'The Visionary', description: 'Math is temporary. Art is forever.', type: 'good' },
  { id: 'nap_champion', title: 'Nap Champion', description: 'You slept through middle school. Lucky you.', type: 'secret' },
  { id: 'math_champion', title: 'Math Duel Champion', description: 'You calculated your victory perfectly.', type: 'good' },
  { id: 'snitch', title: 'The Informant', description: 'You won the battle but lost the war.', type: 'neutral' },
  { id: 'revolutionary', title: 'The Revolutionary', description: 'You changed the system from the inside.', type: 'good' },
  { id: 'feral', title: 'Feral Child', description: 'Return to nature. Reject algebra.', type: 'secret' },
  { id: 'dropout', title: 'Early Retirement', description: 'You clocked out early.', type: 'bad' },
  { id: 'playground_monarch', title: 'King of the Slide', description: 'Heavy is the head that wears the paper crown.', type: 'neutral' },
  { id: 'scientist', title: 'The Scientist', description: 'Eureka!', type: 'good' },
  { id: 'explosion', title: 'Mad Chemist', description: 'You went out with a bang.', type: 'bad' },
  { id: 'athlete', title: 'The Olympian', description: 'Physical education is your true calling.', type: 'good' },
  { id: 'stuck', title: 'High Altitude Rescue', description: 'What goes up must come down... eventually.', type: 'bad' },
  { id: 'avenger', title: 'Honorary Avenger', description: 'Earth\'s Mightiest Math Student.', type: 'good' },
  { id: 'chaos', title: 'System Failure', description: 'You broke Iron Man.', type: 'bad' },
  { id: 'spidey_fail', title: 'With Great Power...', description: '...comes terrible math advice.', type: 'bad' },
  { id: 'ragnarok', title: 'School of Ragnarok', description: 'No school. Only rubble.', type: 'neutral' },
  { id: 'multiverse', title: 'Dimension Hopper', description: 'Math works differently here.', type: 'secret' },
  { id: 'sorcerer', title: 'Sorcerer Supreme', description: 'Magic > Algebra.', type: 'good' },
  { id: 'diabeetus', title: 'The Spokesperson', description: 'You checked your blood sugar, and you checked it often.', type: 'secret' },
  { id: 'all_star', title: 'All Star', description: 'You got your game on. You got paid.', type: 'good' },
  { id: 'save_america', title: 'The Art of the Deal', description: 'You made math great again.', type: 'good' },
  { id: 'fired', title: 'You\'re Fired', description: 'Sad!', type: 'bad' },
  { id: 'mars_colonist', title: 'CEO of Mars', description: 'Occupying Mars.', type: 'good' },
  { id: 'x_ban', title: 'Permanently Suspended', description: 'Comedy is now legal on X, but not for you.', type: 'bad' },
  { id: 'flamethrower', title: 'Not-A-Flamethrower', description: 'It\'s definitely a flamethrower.', type: 'bad' },
  { id: 'meme_lord', title: 'Doge Millionaire', description: 'Much wow. Very math.', type: 'secret' },
  { id: 'rapid_disassembly', title: 'Rapid Disassembly', description: 'It was just a test flight anyway.', type: 'bad' },
  { id: 'stranded_moon', title: 'Moon Resident', description: 'In space, no one can hear you fail math.', type: 'bad' },
];

export function EndingsModal({ unlockedEndings, onClose }: EndingsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-700 flex flex-col max-h-[80vh]"
      >
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            Unlocked Endings ({unlockedEndings.length}/{ALL_ENDINGS.length})
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid gap-4 grid-cols-1 sm:grid-cols-2">
          {ALL_ENDINGS.map((ending) => {
            const isUnlocked = unlockedEndings.includes(ending.id);
            return (
              <div 
                key={ending.id}
                className={`p-4 rounded-xl border ${isUnlocked ? 'bg-slate-800 border-slate-600' : 'bg-slate-900 border-slate-800 opacity-60'} relative overflow-hidden group`}
              >
                {isUnlocked ? (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">{ending.title}</h3>
                      {ending.type === 'good' && <Star size={16} className="text-yellow-400" />}
                      {ending.type === 'bad' && <span className="text-xs font-bold text-red-400 uppercase border border-red-400/30 px-1 rounded">Bad</span>}
                      {ending.type === 'secret' && <span className="text-xs font-bold text-purple-400 uppercase border border-purple-400/30 px-1 rounded">Secret</span>}
                    </div>
                    <p className="text-sm text-slate-400">{ending.description}</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-4 text-slate-600 gap-2">
                    <Lock size={24} />
                    <span className="text-xs font-mono uppercase tracking-widest">Locked</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
