# Product Notes

## Product Goal

The goal of this prototype is to provide a simple browser-based website builder where users can visually edit a template and preview responsive versions of the website.

## Main User Flow

1. Open the website builder.
2. Select an element from the canvas or elements panel.
3. Edit its content or styling using the Inspector.
4. Choose whether the change applies to all views or a specific viewport.
5. Preview the website at desktop, tablet, or mobile sizes.
6. Use the deterministic AI demo to generate an editable proposal.
7. Review the proposed before/after changes.
8. Accept or reject the proposal.
9. Use history to recover a previous version of an individual element.
10. Refresh the page and continue editing because the current state is persisted.

## UI / UX Decisions

### Three-panel editor

The editor uses an Elements panel, Canvas, and Inspector.

This keeps the main workflow visible and reduces unnecessary navigation.

### Responsive preview controls

Desktop, Tablet, and Mobile controls are placed in the main header so users can quickly switch between viewport previews.

### Inspector

The Inspector provides direct controls for the selected element instead of requiring users to edit raw data for common changes.

### AI proposals

AI changes are presented as proposals rather than being applied immediately. This gives users control over changes and allows them to accept or reject them.

### History and recovery

History is available for selected elements so users can recover previous changes without unnecessarily changing unrelated elements.

## Product Scope

This is a focused prototype rather than a complete production website builder. The implementation prioritizes:

- Responsive editing
- Element selection
- Manual editing
- Code editing
- Deterministic AI proposals
- Proposal review
- History and recovery
- Persistence
