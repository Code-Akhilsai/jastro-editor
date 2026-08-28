import type { TemplateElement, Viewport } from "../types/template";

type InspectorProps = {
  element: TemplateElement | null;
  viewport: Viewport;
  scope: "all" | Viewport;
  onScopeChange: (scope: "all" | Viewport) => void;
  onChange: (
    property: "content" | "color" | "backgroundColor" | "fontSize",
    value: string | number,
  ) => void;
};

export default function Inspector({
  element,
  viewport,
  scope,
  onScopeChange,
  onChange,
}: InspectorProps) {
  if (!element) {
    return (
      <aside className="w-72 shrink-0 border-l border-slate-800 bg-slate-900 p-5">
        <h2 className="text-sm font-bold text-white">Inspector</h2>

        <p className="text-xs text-slate-500 mt-5">
          Select an element to edit it.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-72 shrink-0 border-l border-slate-800 bg-slate-900 p-5 overflow-y-auto">
      <h2 className="text-sm font-bold text-white">Inspector</h2>

      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Element</label>

          <div className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-indigo-400">
            {element.type}
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">
            Edit Scope
          </label>

          <select
            value={scope}
            onChange={(e) => onScopeChange(e.target.value as "all" | Viewport)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Views</option>
            <option value="desktop">Desktop Only</option>
            <option value="tablet">Tablet Only</option>
            <option value="mobile">Mobile Only</option>
          </select>

          <p className="text-[11px] text-slate-500 mt-2">
            Current preview: {viewport}
          </p>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Content</label>

          <input
            value={String(
              scope === "all"
                ? (element.properties.content ?? "")
                : (element.overrides[scope].content ??
                    element.properties.content ??
                    ""),
            )}
            onChange={(e) => onChange("content", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Font Size</label>

          <input
            type="number"
            value={Number(
              scope === "all"
                ? (element.properties.fontSize ?? 16)
                : (element.overrides[scope].fontSize ??
                    element.properties.fontSize ??
                    16),
            )}
            onChange={(e) => onChange("fontSize", Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">
            Text Color
          </label>

          <input
            type="color"
            value={String(
              scope === "all"
                ? (element.properties.color ?? "#0f172a")
                : (element.overrides[scope].color ??
                    element.properties.color ??
                    "#0f172a"),
            )}
            onChange={(e) => onChange("color", e.target.value)}
            className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
          />
        </div>

        {(element.type === "button" ||
          element.type === "navbar" ||
          element.type === "card") && (
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Background
            </label>

            <input
              type="color"
              value={String(
                scope === "all"
                  ? (element.properties.backgroundColor ?? "#ffffff")
                  : (element.overrides[scope].backgroundColor ??
                      element.properties.backgroundColor ??
                      "#ffffff"),
              )}
              onChange={(e) => onChange("backgroundColor", e.target.value)}
              className="w-full h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
