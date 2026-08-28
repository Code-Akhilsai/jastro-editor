# AI Template Editor

A browser-based website builder prototype built for the AI Frontend Developer assignment.

## Features

- Visual website template editor
- Element selection and multi-selection
- Manual content, font-size, text-color and background editing
- Desktop, tablet and mobile previews
- Viewport-specific editing: All, Desktop, Tablet, Mobile
- JSON code editor with invalid-code protection
- Deterministic AI demo
- AI before/after proposal review
- Accept / Reject AI changes
- Element history and recovery
- LocalStorage persistence
- Reset editor state
- Basic keyboard focus support

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Browser LocalStorage

## Getting Started

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## How to Use

Select elements from the Elements panel or directly on the canvas. Use the Inspector to edit content and styles.

Use Desktop, Tablet, and Mobile to preview responsive layouts. Editing can be scoped to All Views or one viewport.

The AI Assistant uses deterministic predefined scenarios such as `Rewrite the text`, `Change color`, `Make bigger`, and `Make responsive`. AI changes appear as Before/After proposals and are applied only after Accept.

The Code Editor exposes the canonical template JSON. Valid JSON updates the template; invalid JSON is rejected and the previous valid template is preserved.

History allows recovery of the selected element without changing unrelated elements.

The current template and history are persisted in LocalStorage and survive refresh. Reset restores the initial template.

## UI / UX Decisions

The editor uses an Elements panel, Canvas, and Inspector so selection, visual editing, and property editing remain easy to access.

Responsive controls are placed in the header for quick viewport switching.

AI changes are presented as proposals instead of being applied automatically, giving the user control over AI-assisted edits.

Element-level recovery allows a previous state to be restored without unnecessarily changing unrelated elements.

## Project Structure

```text
src/
├── components/
│   ├── AIPanel.tsx
│   ├── Canvas.tsx
│   ├── CodeEditor.tsx
│   ├── EditorHeader.tsx
│   ├── ElementsPanel.tsx
│   ├── HistoryPanel.tsx
│   ├── Inspector.tsx
│   └── ProposalPanel.tsx
├── data/
│   └── template.ts
├── engine/
│   └── aiDemo.ts
├── types/
│   └── template.ts
├── App.tsx
├── App.css
└── main.tsx

PRODUCT_NOTES.md
AI_USAGE.md
README.md
```

## Template Model

The editor uses a typed, JSON-serializable template model with stable element IDs, element types, editable properties, viewport overrides, and versions. The same template state is used by the visual editor, code editor, and deterministic AI demo.

## AI Implementation

No live AI API is required for the demo. Predefined deterministic scenarios are implemented in:

```text
src/engine/aiDemo.ts
```

See `AI_USAGE.md` for details.

## Screenshots

Add screenshots of the editor, responsive preview, AI proposal, and history/recovery flow here.

Example:

```md
![Editor](docs/editor.png)
```

## Documentation

- `PRODUCT_NOTES.md` — product and UX decisions
- `AI_USAGE.md` — AI assistance and deterministic demo details

## Assignment

This project is a focused browser-based website builder prototype demonstrating responsive editing, manual controls, deterministic AI assistance, proposal review, history/recovery, and persistence.
