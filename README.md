# Mini Clinical Note & Coding Assistant (Node.js full-stack)

A small web app that turns a short primary-care consultation transcript into:

SOAP note (Subjective, Objective, Assessment, Plan)

Problem list with brief rationales + up to 3 ICD-10 suggestions

Billing hint (likely E/M level or short CPT list)

Compliance banner + simple guardrails (emergency keywords → require user acknowledgement)

Stack: React + Vite + TypeScript (frontend), Express.js (server), OpenAI API (server-side only)

# Time Spend

~14 hours

# Trade-offs

- **Time limit:** Focused on an end-to-end MVP (paste → format → analyze → results) over extra features.
- **Learning curve:** I’m new to parts of the stack and OpenAI Structured Outputs, so I prioritized a simple, reliable path.
- **Not yet implemented (due to time):**
  - Trace tab (exact prompts, redacted secrets, step log)
  - Session/history persistence
  - Unit tests and more robust error states

# Demo

see demo1.gif demo2.gif

# Prepare

Node Version: v22.1.0
OpenAI API key

## Setup environment variables for local env

```
cp .env.example .env
```

Note you need to get [OPEN_AI_API_KEY](https://platform.openai.com/api-keys)

# Commands

| name                 | commands      |
| -------------------- | ------------- |
| install dependencies | `npm install` |
| run locally          | `npm run dev` |
