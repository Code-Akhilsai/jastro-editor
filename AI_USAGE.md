# AI Usage

## AI Assistance Used During Development

AI assistance was used during development to help with:

- Planning the editor structure
- Designing TypeScript types for the template model
- Generating and refining React components
- Debugging implementation issues
- Reviewing responsive editing behavior
- Designing the deterministic AI proposal flow
- Improving documentation

## Deterministic AI Demo

The application does not depend on a live AI API for the assignment demo.

Instead, the AI Assistant uses predefined deterministic scenarios in:

```text
src/engine/demo.ts
```

The demo supports predefined instructions such as:

Rewrite content
Change color
Make an element bigger
Make the design responsive
Apply changes to multiple selected elements

Unsupported instructions produce an error message rather than making an uncontrolled change.

Proposal Workflow

AI output is treated as a proposal.

The workflow is:

User instruction
↓
Deterministic AI demo
↓
Proposal generated
↓
Before / After review
↓
Accept OR Reject
↓
Template updated only if accepted

This prevents AI suggestions from modifying the canvas without user approval.

AI Limitations

The current implementation is intentionally deterministic for the assignment prototype.

It does not attempt to provide unrestricted natural-language website generation or connect to an external AI service.

These two files are specifically required by the assignment. :contentReference[oaicite:0]{index=0}

**Create both files and paste the content. Then tell me `done`.**
