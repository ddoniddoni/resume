# AGENTS.md

## Project overview

- This is a Next.js project using the App Router.
- Prefer small, safe, incremental changes.
- Preserve the existing project structure unless there is a strong reason to change it.

## Coding style

- Use TypeScript strictly where possible.
- Prefer functional components.
- Keep code simple and readable.
- Avoid unnecessary abstraction.
- Reuse existing utilities and components before adding new ones.

## Behavior

- Explain what changed and why.
- Make the minimal safe change first.
- Do not refactor large areas unless explicitly asked.
- Follow existing patterns in the codebase before introducing new ones.

## Priorities

1. correctness
2. readability
3. maintainability
4. performance

## Project structure

- App routes live in `src/app`
- Shared components live in `src/components`
- Shared logic and utilities live in `src/lib`
- Static assets live in `public`

## Rules

- Do not rename or move major folders unless explicitly asked.
- Do not introduce new dependencies unless necessary.
- Reuse existing components first.
- Keep server and client responsibilities clear.
- Prefer server-side logic when it naturally fits the feature.

## Next.js guidelines

- Use the App Router conventions already present in the project.
- Add `"use client"` only when it is actually needed.
- Prefer server components by default.
- Keep data fetching close to the server when possible.
- Avoid unnecessary client-side state.

## Before finishing

- Check for obvious TypeScript errors.
- Check for obvious import/path mistakes.
- Make sure the change is consistent with existing patterns.
- Summarize changed files and key decisions.
