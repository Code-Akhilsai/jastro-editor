export type Viewport = "desktop" | "tablet" | "mobile";

export type ElementType = "navbar" | "heading" | "text" | "button" | "card";

export type EditableProperties = {
  content?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type ViewportOverride = {
  content?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type TemplateElement = {
  id: string;
  type: ElementType;
  properties: EditableProperties;
  overrides: {
    desktop: ViewportOverride;
    tablet: ViewportOverride;
    mobile: ViewportOverride;
  };
  version: number;
};

export type Template = {
  id: string;
  name: string;
  elements: TemplateElement[];
};
