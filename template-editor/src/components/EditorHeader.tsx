import type { Viewport } from "../types/template";

type EditorHeaderProps = {
  viewport: Viewport;
  onViewportChange: (viewport: Viewport) => void;
  onReset: () => void;
};

export default function EditorHeader({
  viewport,
  onViewportChange,
  onReset,
}: EditorHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-bold text-white">AI Template Editor</h1>
        <p className="text-xs text-slate-400">Scoped website builder</p>
      </div>

      <div className="flex items-center gap-2">
        {(["desktop", "tablet", "mobile"] as Viewport[]).map((item) => (
          <button
            key={item}
            onClick={() => onViewportChange(item)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize ${
              viewport === item
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={onReset}
          className="ml-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
    </header>
  );
}
