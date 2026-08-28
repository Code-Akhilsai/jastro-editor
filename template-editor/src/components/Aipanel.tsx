import { useState } from "react";

type AIPanelProps = {
  selectedCount: number;
  onRun: (instruction: string) => void;
  message: string;
  hasProposal: boolean;
  onAccept: () => void;
  onReject: () => void;
};

export default function Aipanel({
  selectedCount,
  onRun,
  message,
  hasProposal,
  onAccept,
  onReject,
}: AIPanelProps) {
  const [instruction, setInstruction] = useState("");

  const run = () => {
    if (!instruction.trim()) return;
    onRun(instruction);
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-white">AI Assistant</h2>
            <p className="text-xs text-slate-500">
              {selectedCount} element
              {selectedCount === 1 ? "" : "s"} selected
            </p>
          </div>

          <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 text-indigo-400">
            Demo Mode
          </span>
        </div>

        <div className="flex gap-2">
          <input
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run();
            }}
            placeholder="Try: rewrite, change color, make bigger..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={run}
            disabled={selectedCount === 0}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-500"
          >
            Generate
          </button>
        </div>

        {message && <p className="mt-3 text-xs text-slate-400">{message}</p>}

        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "Rewrite the text",
            "Change color",
            "Make bigger",
            "Make responsive",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInstruction(suggestion);
                onRun(suggestion);
              }}
              disabled={selectedCount === 0}
              className="px-3 py-1.5 rounded-md bg-slate-800 text-xs text-slate-400 hover:text-white disabled:opacity-40"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
