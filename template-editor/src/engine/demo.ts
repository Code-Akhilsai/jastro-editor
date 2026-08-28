import type { TemplateElement, Viewport } from "../types/template";

export type AIDemoResult = {
  elementId: string;
  property: keyof TemplateElement["properties"];
  value: string | number;
};

export function runAIDemo(
  instruction: string,
  selectedElements: TemplateElement[],
  viewport: Viewport,
): AIDemoResult[] {
  const text = instruction.toLowerCase().trim();

  if (selectedElements.length === 0) {
    throw new Error("Select at least one element first.");
  }

  if (text.includes("all selected") || text.includes("selected elements")) {
    return selectedElements.map((element) => ({
      elementId: element.id,
      property: "fontSize",
      value: Number(element.properties.fontSize ?? 16) + 4,
    }));
  }

  if (text.includes("rewrite") || text.includes("change text")) {
    return selectedElements
      .filter((element) =>
        ["heading", "text", "button", "card", "navbar"].includes(element.type),
      )
      .map((element) => ({
        elementId: element.id,
        property: "content",
        value:
          element.type === "heading"
            ? "Grow Your Business"
            : element.type === "button"
              ? "Start Now"
              : element.type === "navbar"
                ? "My Business"
                : "Designed for modern businesses",
      }));
  }

  if (
    text.includes("blue") ||
    text.includes("change color") ||
    text.includes("style")
  ) {
    return selectedElements.map((element) => ({
      elementId: element.id,
      property: "color",
      value: "#2563eb",
    }));
  }

  if (text.includes("bigger") || text.includes("increase size")) {
    return selectedElements.map((element) => ({
      elementId: element.id,
      property: "fontSize",
      value: Number(element.properties.fontSize ?? 16) + 8,
    }));
  }

  if (
    text.includes("mobile") ||
    text.includes("tablet") ||
    text.includes("responsive")
  ) {
    return selectedElements.map((element) => ({
      elementId: element.id,
      property: "fontSize",
      value:
        viewport === "mobile"
          ? 28
          : viewport === "tablet"
            ? 36
            : Number(element.properties.fontSize ?? 16),
    }));
  }

  if (text.includes("reorder") || text.includes("move")) {
    return selectedElements.map((element, index) => ({
      elementId: element.id,
      property: "y",
      value: (index + 1) * 40,
    }));
  }

  throw new Error(
    "Unsupported demo instruction. Try: rewrite, change color to blue, make bigger, or mobile responsive.",
  );
}
