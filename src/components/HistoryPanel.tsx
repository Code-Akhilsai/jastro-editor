import type { Template } from "../types/template";

type HistoryPanelProps = {
  history: Template[];
  selectedId: string | null;
  onRestore: (template: Template) => void;
};

export default function HistoryPanel({
  history,
  selectedId,
  onRestore,
}: HistoryPanelProps) {
  if (!selectedId) {
    return (
      <div className="border-t border-slate-800 bg-slate-900 p-4">
        <h2 className="text-sm font-bold text-white">History</h2>

        <p className="text-xs text-slate-500 mt-2">
          Select an element to view its history.
        </p>
      </div>
    );
  }

  const elementHistory = history.filter((template) =>
    template.elements.some((element) => element.id === selectedId),
  );

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white">Element History</h2>

        <span className="text-xs text-slate-500">
          {elementHistory.length} version
          {elementHistory.length === 1 ? "" : "s"}
        </span>
      </div>

      {elementHistory.length === 0 ? (
        <p className="text-xs text-slate-500 mt-3">
          No previous versions for this element.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-3">
          {elementHistory.map((template, index) => (
            <button
              key={index}
              onClick={() => onRestore(template)}
              className="px-3 py-1.5 rounded-md bg-slate-800 text-xs text-slate-400 hover:text-white"
            >
              Restore #{index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
