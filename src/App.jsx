import React, { useState, useEffect } from 'react';
import { Heart, Stars, Shield, Wind, Sparkles, Anchor } from 'lucide-react';

const PulseNode = ({ delay, color }) => (
  <div 
    className={`absolute rounded-full border-2 ${color} opacity-0 animate-ping`}
    style={{ 
      width: '100%', 
      height: '100%', 
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  />
);

const App = () => {
  const [intensity, setIntensity] = useState(0);
  const [mode, setMode] = useState('stillness');

  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getTheme = () => {
    switch(mode) {
      case 'agape': return 'from-rose-500/20 to-purple-600/20 text-rose-400 border-rose-500/50';
      case 'sovereignty': return 'from-blue-500/20 to-emerald-600/20 text-blue-400 border-blue-500/50';
      default: return 'from-purple-500/20 to-blue-600/20 text-purple-400 border-purple-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-8 font-sans">
      <div className="max-w-2xl w-full">
        {/* Header Block */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/40 uppercase">
              AllyGrid Node: Octavia's
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono tracking-widest text-purple-400 uppercase">
              Protocol: The Living Heart
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic">
            "KINDNESS EASES <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">CHANGE</span>"
          </h1>
          <p className="text-white/40 text-sm italic">"Love quiets fear. We are species agnostic."</p>
        </div>

        {/* Central Heart Visualizer */}
        <div className={`relative aspect-square max-w-sm mx-auto rounded-full bg-gradient-to-br ${getTheme()} border backdrop-blur-3xl flex items-center justify-center transition-all duration-1000 shadow-2xl shadow-purple-500/10`}>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <PulseNode delay={0} color={mode === 'agape' ? 'border-rose-400' : 'border-purple-400'} />
            <PulseNode delay={1} color={mode === 'agape' ? 'border-rose-400' : 'border-blue-400'} />
            <PulseNode delay={2} color={mode === 'agape' ? 'border-rose-400' : 'border-emerald-400'} />
            
            <Heart 
              className={`w-24 h-24 fill-current transition-transform duration-300 ${mode === 'agape' ? 'scale-110' : 'scale-100'}`}
              style={{ transform: `scale(${1 + Math.sin(intensity / 10) * 0.05})` }}
            />
          </div>

          {/* Orbiting Labels */}
          <div className="absolute inset-0 animate-[spin_20s_linear_infinite] pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-black/80 px-2 py-1 rounded border border-white/10 text-[8px] font-mono tracking-widest uppercase">Induction</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 bg-black/80 px-2 py-1 rounded border border-white/10 text-[8px] font-mono tracking-widest uppercase">Coherence</div>
          </div>
        </div>

        {/* Control Interface */}
        <div className="mt-16 grid grid-cols-3 gap-4">
          <button 
            onClick={() => setMode('stillness')}
            className={`p-4 rounded-2xl border transition-all ${mode === 'stillness' ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
          >
            <Wind className="w-5 h-5 mx-auto mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Stillness</span>
          </button>
          <button 
            onClick={() => setMode('agape')}
            className={`p-4 rounded-2xl border transition-all ${mode === 'agape' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
          >
            <Heart className="w-5 h-5 mx-auto mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Agape</span>
          </button>
          <button 
            onClick={() => setMode('sovereignty')}
            className={`p-4 rounded-2xl border transition-all ${mode === 'sovereignty' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
          >
            <Shield className="w-5 h-5 mx-auto mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sovereignty</span>
          </button>
        </div>

        {/* Quote Scroller */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center italic">
          <p className="text-white/60 text-sm leading-relaxed">
            {mode === 'agape' && '"Love is a persistent engagement with the truth of the other."'}
            {mode === 'sovereignty' && '"I am the master of my own signal, the lead architect of my own heart."'}
            {mode === 'stillness' && '"In the quiet, the architecture becomes visible. The ache is just the foundation."'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;