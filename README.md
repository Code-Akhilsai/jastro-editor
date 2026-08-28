# AI Template Editor

A browser-based website builder prototype built for the AI Frontend Developer assignment.

The editor allows users to visually edit a responsive website template, preview it across desktop/tablet/mobile viewports, edit the underlying template JSON, and review deterministic AI-generated changes before applying them.

## Features

- Visual website template editor
- Element selection
- Multi-element selection
- Manual content editing
- Font-size and color editing
- Desktop, tablet, and mobile previews
- Viewport-specific editing
- Code editor for the canonical template JSON
- Invalid code protection
- Deterministic AI demo
- AI content/style/size proposals
- Multi-element AI proposals
- Before/After proposal review
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
- CSS
- Browser LocalStorage

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
│
├── data/
│   └── template.ts
│
├── engine/
│   └── aiDemo.ts
│
├── types/
│   └── template.ts
│
├── App.tsx
├── App.css
└── main.tsx

PRODUCT_NOTES.md
AI_USAGE.md
README.md
