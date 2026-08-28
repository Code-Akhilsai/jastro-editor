import type { TemplateElement } from "../types/template";

type ElementsPanelProps = {
  elements: TemplateElement[];
  selectedIds: string[];
  onSelect: (id: string) => void;
};

export default function ElementsPanel({
  elements,
  selectedIds,
  onSelect,
}: ElementsPanelProps) {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-800 bg-slate-900 p-5">
      <h2 className="text-sm font-bold text-white mb-4">Elements</h2>

      <div className="space-y-2">
        {elements.map((element) => (
          <button
            key={element.id}
            onClick={() => onSelect(element.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
              selectedIds.includes(element.id)
                ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {element.properties.content || element.type}
          </button>
        ))}
      </div>
    </aside>
  );
}
