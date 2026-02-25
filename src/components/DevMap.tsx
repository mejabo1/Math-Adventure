
import React from 'react';
import { motion } from 'motion/react';
import { X, Map as MapIcon, GitBranch, Shuffle } from 'lucide-react';
import { SCENARIOS } from '../lib/storyEngine';

interface DevMapProps {
  onClose: () => void;
}

export function DevMap({ onClose }: DevMapProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
            <MapIcon size={24} />
          </div>
          <div>
            <h2 className="font-bold text-xl text-white">Scenario Map</h2>
            <p className="text-xs text-slate-400 font-mono">DEV_MODE :: VIEWING_ALL_NODES</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Map Content */}
      <div className="flex-1 overflow-auto p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex items-center gap-4 text-indigo-300">
            <GitBranch size={20} />
            <p className="text-sm">
              <span className="font-bold">Branching Logic:</span> The story now follows a deterministic graph. 
              Each choice leads to a specific next scenario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(SCENARIOS).map((scenario) => (
              <motion.div 
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-colors group"
              >
                {/* Node Header */}
                <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center group-hover:bg-slate-800 transition-colors">
                  <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
                    ID: {scenario.id}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>

                {/* Node Body */}
                <div className="p-4 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3 italic">
                    "{scenario.text}"
                  </p>

                  {/* Branches */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      <GitBranch size={12} />
                      <span>Branches To</span>
                    </div>
                    <div className="space-y-1">
                      {scenario.choices.map((choice, idx) => (
                        <div 
                          key={idx}
                          className="text-xs bg-slate-950/50 p-2 rounded border border-slate-800 text-slate-400 flex flex-col gap-1 hover:text-indigo-300 hover:border-indigo-500/30 transition-colors"
                        >
                          <span className="font-medium text-slate-300">{choice.text}</span>
                          <div className="flex items-center gap-1 text-indigo-400/70">
                            <span className="text-[10px]">➜</span>
                            <span className="font-mono text-[10px]">{choice.nextId}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
