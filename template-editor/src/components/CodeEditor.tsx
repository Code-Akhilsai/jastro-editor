import { useState } from "react";
import type { Template } from "../types/template";

type CodeEditorProps = {
  template: Template;
  onApply: (template: Template) => void;
};

export default function CodeEditor({ template, onApply }: CodeEditorProps) {
  const [code, setCode] = useState(JSON.stringify(template, null, 2));
  const [message, setMessage] = useState("");

  const handleApply = () => {
    try {
      const parsed = JSON.parse(code);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        !Array.isArray(parsed.elements)
      ) {
        throw new Error("Invalid template structure.");
      }

      onApply(parsed as Template);
      setMessage("Code applied successfully.");
    } catch {
      setMessage("Invalid code. Previous valid template was preserved.");
    }
  };

  const handleResetCode = () => {
    setCode(JSON.stringify(template, null, 2));
    setMessage("");
  };

  return (
    <section className="border-t border-slate-800 bg-slate-900 p-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-white">Code Editor</h2>
            <p className="text-xs text-slate-500">
              Edit the canonical template JSON.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleResetCode}
              className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
            >
              Reset Code
            </button>

            <button
              onClick={handleApply}
              className="px-3 py-2 rounded-lg bg-indigo-600 text-xs text-white font-semibold"
            >
              Apply Code
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-64 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500 resize-y"
        />

        {message && <p className="mt-2 text-xs text-slate-400">{message}</p>}
      </div>
    </section>
  );
}
