import type { AIDemoResult } from "../engine/demo.ts";
import type { TemplateElement } from "../types/template.ts";

type ProposalPanelProps = {
  proposals: AIDemoResult[];
  elements: TemplateElement[];
  onAccept: () => void;
  onReject: () => void;
};

export default function ProposalPanel({
  proposals,
  elements,
  onAccept,
  onReject,
}: ProposalPanelProps) {
  if (proposals.length === 0) return null;

  return (
    <div className="mt-4 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10">
      <h3 className="text-sm font-bold text-white">AI Proposal</h3>

      <p className="text-xs text-slate-400 mt-1">
        Review the changes before applying them.
      </p>

      <div className="mt-4 space-y-3">
        {proposals.map((proposal) => {
          const element = elements.find(
            (item) => item.id === proposal.elementId,
          );

          if (!element) return null;

          const before = element.properties[proposal.property];

          return (
            <div
              key={`${proposal.elementId}-${proposal.property}`}
              className="rounded-lg bg-slate-950 border border-slate-800 p-3"
            >
              <p className="text-xs text-indigo-400 font-semibold">
                {element.type} · {proposal.property}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <p className="text-[10px] uppercase text-slate-500">Before</p>

                  <p className="text-sm text-slate-300 mt-1 wrap-break-word">
                    {String(before ?? "")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-slate-500">After</p>

                  <p className="text-sm text-emerald-400 mt-1 wrap-break-word">
                    {String(proposal.value)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onAccept}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
        >
          Accept
        </button>

        <button
          onClick={onReject}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white text-xs font-semibold hover:bg-slate-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
