import { useState, useEffect } from "react";
import { Users, RotateCcw, Flame } from "lucide-react";

export default function IceBreaker() {
  const [votes, setVotes] = useState({
    daily: 142,
    regularly: 98,
    rarely: 35,
    never: 12,
  });

  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [total, setTotal] = useState(287);

  useEffect(() => {
    setTotal(votes.daily + votes.regularly + votes.rarely + votes.never);
  }, [votes]);

  const handleVote = (key: "daily" | "regularly" | "rarely" | "never") => {
    if (hasVoted) return; // Only vote once
    setVotes((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
    setHasVoted(key);
  };

  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const handleSimulateAttendees = () => {
    const dailyAdd = Math.floor(Math.random() * 20) + 15;
    const regAdd = Math.floor(Math.random() * 15) + 10;
    const rareAdd = Math.floor(Math.random() * 10) + 2;
    const neverAdd = Math.floor(Math.random() * 3) + 1;

    setVotes((prev) => ({
      daily: prev.daily + dailyAdd,
      regularly: prev.regularly + regAdd,
      rarely: prev.rarely + rareAdd,
      never: prev.never + neverAdd,
    }));
  };

  const resetVotes = () => {
    setVotes({
      daily: 142,
      regularly: 98,
      rarely: 35,
      never: 12,
    });
    setHasVoted(null);
  };

  return (
    <section 
      id="icebreaker" 
      className="min-h-screen py-24 px-4 flex flex-col justify-center relative overflow-hidden bg-[#030712] border-t border-emerald-500/5 snap-start"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-widest uppercase">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sondage interactif en direct</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Ice Breaker : Brisons la glace !
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Sondons l'amphithéâtre pour comprendre notre relation actuelle avec l'intelligence artificielle générative.
          </p>
        </div>

        {/* Polling Question Card */}
        <div className="bg-[#0b1224] border border-emerald-500/10 rounded-3xl p-6 sm:p-10 shadow-xl shadow-black/35 relative overflow-hidden">
          <h3 className="text-lg sm:text-2xl font-bold font-display text-center text-slate-100 mb-8 leading-snug">
            "Qui utilise déjà régulièrement ChatGPT, Gemini, Claude ou Copilot ?"
          </h3>

          {/* Voting Options */}
          <div className="grid gap-3.5">
            {/* Option A: Daily */}
            <button
              id="ib-opt-a"
              onClick={() => handleVote("daily")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                hasVoted === "daily"
                  ? "bg-emerald-500/10 border-emerald-500/50"
                  : hasVoted
                  ? "bg-[#070c18]/50 border-slate-900/40 opacity-40 cursor-default"
                  : "bg-[#121c35]/50 hover:bg-[#162342]/70 border-emerald-500/5 hover:border-emerald-500/30 cursor-pointer"
              }`}
            >
              {/* Progress Background */}
              {hasVoted && (
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 transition-all duration-1000 ease-out" 
                  style={{ width: `${getPercentage(votes.daily)}%` }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/20">
                  A
                </span>
                <span className="text-slate-200 font-medium text-xs sm:text-sm">
                  Tous les jours ! (C'est mon bras droit, mon assistant clé)
                </span>
              </div>
              
              <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3 font-mono text-xs text-slate-400">
                <span>{votes.daily} votes</span>
                {hasVoted && (
                  <span className="text-emerald-400 font-extrabold font-display text-sm">
                    {getPercentage(votes.daily)}%
                  </span>
                )}
              </div>
            </button>

            {/* Option B: Regularly */}
            <button
              id="ib-opt-b"
              onClick={() => handleVote("regularly")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                hasVoted === "regularly"
                  ? "bg-emerald-500/10 border-emerald-500/50"
                  : hasVoted
                  ? "bg-[#070c18]/50 border-slate-900/40 opacity-40 cursor-default"
                  : "bg-[#121c35]/50 hover:bg-[#162342]/70 border-emerald-500/5 hover:border-emerald-500/30 cursor-pointer"
              }`}
            >
              {/* Progress Background */}
              {hasVoted && (
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 transition-all duration-1000 ease-out" 
                  style={{ width: `${getPercentage(votes.regularly)}%` }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/20">
                  B
                </span>
                <span className="text-slate-200 font-medium text-xs sm:text-sm">
                  Régulièrement (Pour réviser, traduire, ou coder)
                </span>
              </div>
              
              <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3 font-mono text-xs text-slate-400">
                <span>{votes.regularly} votes</span>
                {hasVoted && (
                  <span className="text-emerald-400 font-extrabold font-display text-sm">
                    {getPercentage(votes.regularly)}%
                  </span>
                )}
              </div>
            </button>

            {/* Option C: Rarely */}
            <button
              id="ib-opt-c"
              onClick={() => handleVote("rarely")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                hasVoted === "rarely"
                  ? "bg-emerald-500/10 border-emerald-500/50"
                  : hasVoted
                  ? "bg-[#070c18]/50 border-slate-900/40 opacity-40 cursor-default"
                  : "bg-[#121c35]/50 hover:bg-[#162342]/70 border-emerald-500/5 hover:border-emerald-500/30 cursor-pointer"
              }`}
            >
              {/* Progress Background */}
              {hasVoted && (
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 transition-all duration-1000 ease-out" 
                  style={{ width: `${getPercentage(votes.rarely)}%` }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/20">
                  C
                </span>
                <span className="text-slate-200 font-medium text-xs sm:text-sm">
                  Rarement (Juste occasionnellement pour expérimenter)
                </span>
              </div>
              
              <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3 font-mono text-xs text-slate-400">
                <span>{votes.rarely} votes</span>
                {hasVoted && (
                  <span className="text-emerald-400 font-extrabold font-display text-sm">
                    {getPercentage(votes.rarely)}%
                  </span>
                )}
              </div>
            </button>

            {/* Option D: Never */}
            <button
              id="ib-opt-d"
              onClick={() => handleVote("never")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                hasVoted === "never"
                  ? "bg-[#651c2f]/10 border-rose-500/40"
                  : hasVoted
                  ? "bg-[#070c18]/50 border-slate-900/40 opacity-40 cursor-default"
                  : "bg-[#121c35]/50 hover:bg-[#162342]/70 border-emerald-500/5 hover:border-rose-500/30 cursor-pointer"
              }`}
            >
              {/* Progress Background */}
              {hasVoted && (
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500/10 to-rose-500/5 transition-all duration-1000 ease-out" 
                  style={{ width: `${getPercentage(votes.never)}%` }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-rose-500/15 text-rose-300 text-xs font-mono font-bold border border-rose-500/20">
                  D
                </span>
                <span className="text-slate-200 font-medium text-xs sm:text-sm">
                  Jamais (Je préfère les moteurs de recherche traditionnels)
                </span>
              </div>
              
              <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3 font-mono text-xs text-slate-400">
                <span>{votes.never} votes</span>
                {hasVoted && (
                  <span className="text-rose-400 font-extrabold font-display text-sm">
                    {getPercentage(votes.never)}%
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-455">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Auditeurs totaux : <strong className="text-slate-200 font-bold">{total}</strong></span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                id="btn-simulate-votes"
                onClick={handleSimulateAttendees}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/25 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-900/10"
              >
                <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Simuler l'Amphi (+{Math.floor(Math.random() * 20) + 30} votes)</span>
              </button>

              <button
                id="btn-reset-votes"
                onClick={resetVotes}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-405 hover:text-slate-255 border border-slate-800/85 transition-all cursor-pointer"
                title="Réinitialiser le sondage"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic educational insight following vote */}
        {hasVoted && (
          <div className="mt-6 animate-fade-in bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4.5 text-center flex items-center justify-center gap-3.5 flex-col md:flex-row shadow-lg">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <span className="text-slate-100 font-bold block sm:inline">Analyse de la masterclass :</span> Presque tout le monde utilise l'IA. Pourtant, <span className="text-emerald-400 font-bold">92%</span> des utilisateurs exploitent moins de <span className="text-[#2dd4bf] font-bold">10%</span> des capacités réelles du modèle parce qu'ils n'en maîtrisent pas le langage. Commençons à soigner vos formulations !
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
