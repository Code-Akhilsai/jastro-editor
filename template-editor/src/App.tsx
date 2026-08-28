import { useEffect, useState } from "react";
import "./App.css";
import EditorHeader from "./components/EditorHeader";
import ElementsPanel from "./components/ElementsPanel";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";
import { runAIDemo, type AIDemoResult } from "./engine/demo.ts";
import { initialTemplate } from "./data/template";
import type { Template, Viewport } from "./types/template";
import Aipanel from "./components/Aipanel.tsx";
import ProposalPanel from "./components/ProposalPanel";
import HistoryPanel from "./components/HistoryPanel";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [template, setTemplate] = useState<Template>(initialTemplate);

  const [viewport, setViewport] = useState<Viewport>("desktop");

  const [scope, setScope] = useState<"all" | Viewport>(viewport);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [aiProposal, setAiProposal] = useState<AIDemoResult[]>([]);

  const [aiMessage, setAiMessage] = useState("");

  const [history, setHistory] = useState<Template[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTemplate = localStorage.getItem("jastro-template");
    const savedHistory = localStorage.getItem("jastro-history");

    if (savedTemplate) {
      setTemplate(JSON.parse(savedTemplate));
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("jastro-template", JSON.stringify(template));

    localStorage.setItem("jastro-history", JSON.stringify(history));
  }, [template, history, isLoaded]);

  const handleSelect = (event: React.MouseEvent, id: string) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      setSelectedIds((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const saveHistory = () => {
    setHistory((current) => [...current, structuredClone(template)]);
  };

  const handleElementChange = (
    property: "content" | "color" | "backgroundColor" | "fontSize",
    value: string | number,
  ) => {
    if (selectedIds.length === 0) return;

    saveHistory();

    setTemplate((current) => ({
      ...current,
      elements: current.elements.map((element) => {
        if (!selectedIds.includes(element.id)) {
          return element;
        }

        if (scope === "all") {
          return {
            ...element,
            properties: {
              ...element.properties,
              [property]: value,
            },
            version: element.version + 1,
          };
        }

        return {
          ...element,
          overrides: {
            ...element.overrides,
            [scope]: {
              ...element.overrides[scope],
              [property]: value,
            },
          },
          version: element.version + 1,
        };
      }),
    }));
  };
  const selectedElement =
    selectedIds.length === 1
      ? (template.elements.find((element) => element.id === selectedIds[0]) ??
        null)
      : null;

  const handleAIRun = (instruction: string) => {
    try {
      const selectedElements = template.elements.filter((element) =>
        selectedIds.includes(element.id),
      );

      const proposal = runAIDemo(instruction, selectedElements, viewport);

      setAiProposal(proposal);
      setAiMessage(
        `${proposal.length} change${proposal.length === 1 ? "" : "s"} proposed.`,
      );
    } catch (error) {
      setAiProposal([]);
      setAiMessage(
        error instanceof Error ? error.message : "Unable to generate proposal.",
      );
    }
  };

  const acceptAIProposal = () => {
    if (aiProposal.length === 0) return;

    setHistory((current) => [...current, structuredClone(template)]);

    setTemplate((current) => ({
      ...current,
      elements: current.elements.map((element) => {
        const changes = aiProposal.filter(
          (proposal) => proposal.elementId === element.id,
        );

        if (changes.length === 0) {
          return element;
        }

        if (scope === "all") {
          const properties = {
            ...element.properties,
          };

          changes.forEach((change) => {
            const property = change.property;

            if (
              property === "content" ||
              property === "color" ||
              property === "backgroundColor" ||
              property === "fontSize"
            ) {
              properties[property] = change.value as never;
            }
          });

          return {
            ...element,
            properties,
            version: element.version + 1,
          };
        }

        const overrides = {
          ...element.overrides,
          [scope]: {
            ...element.overrides[scope],
          },
        };

        changes.forEach((change) => {
          const property = change.property;

          if (
            property === "content" ||
            property === "color" ||
            property === "backgroundColor" ||
            property === "fontSize"
          ) {
            overrides[scope][property] = change.value as never;
          }
        });

        return {
          ...element,
          overrides,
          version: element.version + 1,
        };
      }),
    }));

    setAiProposal([]);
    setAiMessage("AI changes accepted.");
  };

  const rejectAIProposal = () => {
    setAiProposal([]);
    setAiMessage("AI changes rejected.");
  };

  const handleRestore = (previousTemplate: Template) => {
    if (selectedIds.length !== 1) return;

    const selectedId = selectedIds[0];

    const previousElement = previousTemplate.elements.find(
      (element) => element.id === selectedId,
    );

    if (!previousElement) return;

    setTemplate((current) => ({
      ...current,
      elements: current.elements.map((element) =>
        element.id === selectedId ? structuredClone(previousElement) : element,
      ),
    }));
  };

  const handleCodeApply = (newTemplate: Template) => {
    setHistory((current) => [...current, structuredClone(template)]);

    setTemplate(newTemplate);
    setSelectedIds([]);
  };

  const handleReset = () => {
    localStorage.removeItem("jastro-template");
    localStorage.removeItem("jastro-history");

    setTemplate(structuredClone(initialTemplate));
    setHistory([]);
    setSelectedIds([]);
    setViewport("desktop");
    setScope("all");
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setSelectedIds([]);
        }
      }}
    >
      <EditorHeader
        viewport={viewport}
        onViewportChange={(newViewport) => {
          setViewport(newViewport);
          setScope(newViewport);
        }}
        onReset={handleReset}
      />

      <main className="flex min-h-[calc(100vh-4rem)]">
        <ElementsPanel
          elements={template.elements}
          selectedIds={selectedIds}
          onSelect={(id) => setSelectedIds([id])}
        />

        <Canvas
          elements={template.elements}
          selectedIds={selectedIds}
          viewport={viewport}
          onSelect={handleSelect}
        />
        <Inspector
          element={selectedElement}
          viewport={viewport}
          scope={scope}
          onScopeChange={setScope}
          onChange={handleElementChange}
        />
      </main>

      <CodeEditor template={template} onApply={handleCodeApply} />

      <Aipanel
        selectedCount={selectedIds.length}
        onRun={handleAIRun}
        message={aiMessage}
      />

      <ProposalPanel
        proposals={aiProposal}
        elements={template.elements}
        onAccept={acceptAIProposal}
        onReject={rejectAIProposal}
      />

      <HistoryPanel
        history={history}
        selectedId={selectedIds.length === 1 ? selectedIds[0] : null}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default App;
