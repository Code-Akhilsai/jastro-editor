import type { TemplateElement, Viewport } from "../types/template";

type CanvasProps = {
  elements: TemplateElement[];
  selectedIds: string[];
  viewport: Viewport;
  onSelect: (event: React.MouseEvent, id: string) => void;
};

export default function Canvas({
  elements,
  selectedIds,
  viewport,
  onSelect,
}: CanvasProps) {
  const canvasWidth =
    viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  const getValue = (
    element: TemplateElement,
    property: keyof TemplateElement["properties"],
  ) => {
    return (
      element.overrides[viewport][property] ?? element.properties[property]
    );
  };

  return (
    <section className="flex-1 bg-slate-950 p-8 overflow-auto">
      <div className="flex justify-center min-w-fit">
        <div
          className="bg-white text-slate-900 min-h-175 shadow-2xl transition-all duration-300 overflow-hidden"
          style={{
            width: canvasWidth,
            maxWidth: "100%",
          }}
        >
          {/* Navbar */}
          {elements
            .filter((element) => element.type === "navbar")
            .map((element) => (
              <div
                key={element.id}
                tabIndex={0}
                onClick={(event) => onSelect(event, element.id)}
                className={`px-8 py-5 border-b border-slate-200 flex justify-between items-center cursor-pointer outline-none ${
                  selectedIds.includes(element.id)
                    ? "ring-2 ring-indigo-500 ring-inset"
                    : ""
                }`}
                style={{
                  color: getValue(element, "color") as string,
                  backgroundColor: getValue(
                    element,
                    "backgroundColor",
                  ) as string,
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: `${getValue(element, "fontSize")}px`,
                  }}
                >
                  {getValue(element, "content") as string}
                </div>

                <div className="text-sm text-slate-500">
                  Home &nbsp; About &nbsp; Contact
                </div>
              </div>
            ))}

          {/* Hero */}
          <div className="px-8 py-20 text-center">
            {elements
              .filter((element) => element.type === "heading")
              .map((element) => (
                <h2
                  key={element.id}
                  tabIndex={0}
                  onClick={(event) => onSelect(event, element.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSelect(
                        event as unknown as React.MouseEvent,
                        element.id,
                      );
                    }
                  }}
                  className={`font-bold cursor-pointer outline-none ${
                    selectedIds.includes(element.id)
                      ? "ring-2 ring-indigo-500 ring-offset-4"
                      : ""
                  }`}
                  style={{
                    color: getValue(element, "color") as string,
                    fontSize: `${getValue(element, "fontSize")}px`,
                    transform: `translateY(${getValue(element, "y") ?? 0}px)`,
                  }}
                >
                  {getValue(element, "content") as string}
                </h2>
              ))}

            {elements
              .filter((element) => element.type === "text")
              .map((element) => (
                <p
                  key={element.id}
                  tabIndex={0}
                  onClick={(event) => onSelect(event, element.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSelect(
                        event as unknown as React.MouseEvent,
                        element.id,
                      );
                    }
                  }}
                  className={`max-w-xl mx-auto mt-6 cursor-pointer outline-none ${
                    selectedIds.includes(element.id)
                      ? "ring-2 ring-indigo-500 ring-offset-4"
                      : ""
                  }`}
                  style={{
                    color: getValue(element, "color") as string,
                    fontSize: `${getValue(element, "fontSize")}px`,
                  }}
                >
                  {getValue(element, "content") as string}
                </p>
              ))}

            {elements
              .filter((element) => element.type === "button")
              .map((element) => (
                <button
                  key={element.id}
                  onClick={(event) => onSelect(event, element.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSelect(
                        event as unknown as React.MouseEvent,
                        element.id,
                      );
                    }
                  }}
                  className={`mt-8 px-6 py-3 rounded-lg font-semibold cursor-pointer ${
                    selectedIds.includes(element.id)
                      ? "ring-2 ring-indigo-400 ring-offset-4"
                      : ""
                  }`}
                  style={{
                    color: getValue(element, "color") as string,
                    backgroundColor: getValue(
                      element,
                      "backgroundColor",
                    ) as string,
                    fontSize: `${getValue(element, "fontSize")}px`,
                  }}
                >
                  {getValue(element, "content") as string}
                </button>
              ))}
          </div>

          {/* Features */}
          <div className="px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {elements
              .filter((element) => element.type === "card")
              .map((element) => (
                <div
                  key={element.id}
                  tabIndex={0}
                  onClick={(event) => onSelect(event, element.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSelect(
                        event as unknown as React.MouseEvent,
                        element.id,
                      );
                    }
                  }}
                  className={`p-6 border border-slate-200 rounded-xl cursor-pointer outline-none ${
                    selectedIds.includes(element.id)
                      ? "ring-2 ring-indigo-500"
                      : ""
                  }`}
                  style={{
                    color: getValue(element, "color") as string,
                    backgroundColor: getValue(
                      element,
                      "backgroundColor",
                    ) as string,
                  }}
                >
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: `${getValue(element, "fontSize")}px`,
                    }}
                  >
                    {getValue(element, "content") as string}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    A simple editable website element.
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
