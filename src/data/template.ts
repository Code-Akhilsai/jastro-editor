import type { Template } from "../types/template";

export const initialTemplate: Template = {
  id: "business-template-01",
  name: "Simple Business",
  elements: [
    {
      id: "navbar",
      type: "navbar",
      properties: {
        content: "BusinessSite",
        color: "#0f172a",
        backgroundColor: "#ffffff",
        fontSize: 18,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {},
      },
      version: 1,
    },
    {
      id: "hero-title",
      type: "heading",
      properties: {
        content: "Build Your Business",
        color: "#0f172a",
        fontSize: 48,
      },
      overrides: {
        desktop: {},
        tablet: {
          fontSize: 40,
        },
        mobile: {
          fontSize: 32,
        },
      },
      version: 1,
    },
    {
      id: "hero-text",
      type: "text",
      properties: {
        content: "Create a beautiful website without writing complicated code.",
        color: "#64748b",
        fontSize: 18,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {
          fontSize: 16,
        },
      },
      version: 1,
    },
    {
      id: "hero-button",
      type: "button",
      properties: {
        content: "Get Started",
        color: "#ffffff",
        backgroundColor: "#4f46e5",
        fontSize: 16,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {},
      },
      version: 1,
    },
    {
      id: "feature-one",
      type: "card",
      properties: {
        content: "Fast & Simple",
        color: "#0f172a",
        backgroundColor: "#f8fafc",
        fontSize: 18,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {},
      },
      version: 1,
    },
    {
      id: "feature-two",
      type: "card",
      properties: {
        content: "Responsive Design",
        color: "#0f172a",
        backgroundColor: "#f8fafc",
        fontSize: 18,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {},
      },
      version: 1,
    },
    {
      id: "feature-three",
      type: "card",
      properties: {
        content: "Easy to Customize",
        color: "#0f172a",
        backgroundColor: "#f8fafc",
        fontSize: 18,
      },
      overrides: {
        desktop: {},
        tablet: {},
        mobile: {},
      },
      version: 1,
    },
  ],
};
