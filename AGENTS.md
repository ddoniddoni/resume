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

## Persistent engineering standards

These standards should be preserved and reused in future work unless explicitly changed.

### Performance optimization

#### Code splitting

- Use route-based code splitting where Next.js provides it automatically.
- Use dynamic imports when they improve loading behavior.
- Lazy load components when appropriate.

#### Image optimization

- Prefer the Next.js `Image` component when it fits the use case.
- Prefer WebP where practical.
- Use responsive images.
- Use lazy loading where appropriate.

#### Rendering optimization

- Use `React.memo` only when it is genuinely helpful.
- Use `useMemo` and `useCallback` only when needed.
- Consider virtual scrolling such as `react-virtuoso` for large lists.
- Consider deferred rendering patterns such as `useDeferredValue` when useful.

#### Asset caching

- Treat static asset caching as an explicit concern.
- Default guidance:
  - fonts: 1 day
  - images: 10 minutes
  - videos: streaming strategy

### Testing strategy

#### Testing levels

- Unit testing: utility functions, state management, custom hooks.
- Component testing: isolated component development and verification, including Storybook when used.
- Integration testing: API integration, WebSocket communication, and state synchronization.
- E2E testing: critical user flows and any core workflows relevant to the project.

#### Test environment

- Storybook for component testing when present.
- Jest for unit testing when configured.
- Testing Library for React component tests when configured.
- Playwright or Cypress for E2E when configured.

### CSS logical properties enforcement

- Physical CSS properties are not allowed when a logical property equivalent exists.
- Prefer:
  - `width` -> `inline-size`
  - `height` -> `block-size`
  - `margin-top` -> `margin-block-start`
  - `padding-right` -> `padding-inline-end`
  - `top` -> `inset-block-start`
- Run `npm run stylelint:clear` before build steps when stylelint is part of the workflow.
- Treat warnings as failures where the project is configured to enforce `--max-warnings 0`.

### Deployment checklist

- Environment variables configured
- Stylelint check passed
- ESLint check passed
- Build successful
- API endpoints verified
- WebSocket endpoints verified
- Translation files up to date
- Static assets uploaded
- SSL certificate valid
- Performance tested
- Security headers configured

### Ongoing technical improvements

- Server-side rendering optimization
- GraphQL API when appropriate
- Micro-frontend architecture when justified
- Progressive Web App support
- Offline mode support
- Advanced caching strategies

### Ongoing UX improvements

- Gesture-based controls where relevant
- Voice commands where relevant
- Customizable UI themes
- Accessibility improvements aligned with WCAG
- Tutorial mode
- AI-powered recommendations or assistance where appropriate

### Development resources

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Jotai Docs: https://jotai.org
- TanStack Query Docs: https://tanstack.com/query
- next-intl Docs: https://next-intl-docs.vercel.app

### Additional code style guide

- TypeScript: strict mode
- Components: prefer named exports such as `export function ComponentName`
- Hooks: prefer `use-kebab-case.ts`
- Atoms: prefer `kebab-case.ts` and use the `*Atom` suffix in code
- SCSS: CSS logical properties only
- Formatting: Prettier with 2 spaces and single quotes

## Before finishing

- Check for obvious TypeScript errors.
- Check for obvious import/path mistakes.
- Make sure the change is consistent with existing patterns.
- Summarize changed files and key decisions.
