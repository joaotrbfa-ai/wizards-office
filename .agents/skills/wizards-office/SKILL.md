```markdown
# wizards-office Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you the core development patterns, coding conventions, and workflows used in the `wizards-office` TypeScript codebase. You'll learn how to structure files, write code that fits the project's style, and contribute effectively—especially when iterating on landing page sections and related content.

## Coding Conventions

### File Naming

- **PascalCase** is used for file names, especially for components and TypeScript files.
  - Example: `HeroSection.tsx`, `ManifestoBlock.tsx`

### Import Style

- **Alias imports** are used for modules.
  - Example:
    ```typescript
    import { HeroSection } from '@/components/home/HeroSection';
    ```

### Export Style

- **Named exports** are preferred.
  - Example:
    ```typescript
    export function HeroSection() { ... }
    ```

### Commit Messages

- **Conventional commits** are used, with the `feat` prefix for new features.
  - Example: `feat: add Manifesto section to landing page`

## Workflows

### Landing Page Section Iteration

**Trigger:** When you want to add, modify, or polish sections of the landing page (e.g., Hero, Manifesto, Pilares, Serviços, Galeria, Fecho).

**Command:** `/update-landing-section`

#### Step-by-Step Instructions

1. **Edit or Refactor Components**
   - Update or create React component files under `src/components/home/` to change section layout or content.
     ```typescript
     // src/components/home/ManifestoBlock.tsx
     export function ManifestoBlock() {
       return <section>Manifesto content here</section>;
     }
     ```

2. **Assemble or Reorder Sections**
   - Modify `src/app/(site)/page.tsx` to include, remove, or reorder section components.
     ```typescript
     import { HeroSection } from '@/components/home/HeroSection';
     import { ManifestoBlock } from '@/components/home/ManifestoBlock';

     export default function HomePage() {
       return (
         <>
           <HeroSection />
           <ManifestoBlock />
           {/* ...other sections */}
         </>
       );
     }
     ```

3. **Update Sanity Schema, Types, or Queries**
   - Edit files in `src/sanity/schemas/`, `src/sanity/types.ts`, or `src/sanity/queries.ts` to support new or changed content.
     ```typescript
     // src/sanity/types.ts
     export type Manifesto = {
       title: string;
       content: string;
     };
     ```

4. **Adjust Data Population Scripts**
   - If needed, update scripts like `scripts/seed-*.mjs` to seed new data for the updated sections.

5. **Update Tasks**
   - Reflect pending or completed work in `tasks/todo.md`.

**Files Involved:**
- `src/app/(site)/page.tsx`
- `src/components/home/*.tsx`
- `src/sanity/queries.ts`
- `src/sanity/types.ts`
- `src/sanity/schemas/**/*`
- `scripts/seed-*.mjs`
- `tasks/todo.md`

**Frequency:** ~2x/month

## Testing Patterns

- **Test Framework:** Unknown (not detected)
- **Test File Pattern:** Files are named with `.test.` in the filename, e.g., `HeroSection.test.tsx`.
- **Location:** Test files are typically located alongside the code they test.

**Example:**
```typescript
// src/components/home/HeroSection.test.tsx
import { render } from '@testing-library/react';
import { HeroSection } from './HeroSection';

test('renders hero section', () => {
  const { getByText } = render(<HeroSection />);
  expect(getByText(/welcome/i)).toBeInTheDocument();
});
```

## Commands

| Command                | Purpose                                                      |
|------------------------|--------------------------------------------------------------|
| /update-landing-section| Start or document a landing page section iteration workflow. |
```
