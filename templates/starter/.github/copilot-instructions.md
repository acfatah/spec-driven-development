## Quick orientation

This repository is a bun-powered monorepo containing `apps/` and `packages/`.
Use `bun` for installs and running scripts.

## Big picture and structure

- Monorepo layout: `apps/` (e.g. `apps/web`) and `packages/` (e.g. `packages/registry`).

```
.
├── README.md
├── apps
│   └── web			# Main landing page app built with Astro
├── package.json
├── packages
│   └── registry   	# The component registry
├── scripts
├── templates
│   └── starter		# Template for starting new projects
└── tsconfig.json
```

## Developer workflows (commands & conventions)

Need to `cd` into the specific app or package to run scripts.

Common scripts are:
  - `bun run dev` - start development server (if applicable)
  - `bun run build` - build the package/app
  - `bun run preview` - preview the built app (if applicable)
  - `bun run lint` - lint the codebase (if applicable)
  - `bun run format` - fix lint issues (if applicable)
  - `bun run typecheck` - run typecheck (if applicable)
  - `bun run test` - run tests (if applicable)

Prefer to inspect a package's own `package.json` for package-specific scripts.

## What an AI agent should do first when editing

1. Read `package.json`, `tsconfig.json`, and `README.md` at the repo root.
2. Inspect `packages/<package>/package.json` for package-local scripts and
   dependencies (example: `packages/registry/package.json`).
3. If TypeScript changes are needed, prefer adding minimal `extends`-based overrides
   in the package `tsconfig.json` rather than editing root compiler flags without requirement.
4. If a change touches workspace resolution or workspaces, verify and correct the
   `workspace` globs in the root `package.json`.

## Coding Style

- Always fix lint errors as the last task, only after all other tasks are completed.
- Use `bun run format [..file]` to format code or files.
- We are using ESLint: `@antfu/eslint-config` via `eslint.config.js`
  - two-space indent
  - single quotes
  - alphabetised imports with `perfectionist/sort-imports`
  - empty line before `return`
- Naming React components/Redux
  - slices use PascalCase
  - hooks/helpers/files use camelCase
  - config keys use UPPER_SNAKE_CASE

## Testing & Verification

- Do not merge Bun.env and process.env. Find where dotenv files are located,
  cd into that directory and run commands from there.
- Start with specific tests near changed code, then broaden.
- Don’t fix unrelated broken tests.

## Documentation or Comments

- Limit lines around 80 characters. Insert line breaks with correct indents so line
  stays between 80 characters.
- Be concise, use bullets.
- Use markdown formatting for code snippets and commands.
- Wrap commands, file paths, env vars, and code identifiers in backticks.
- Use tables in documentation whenever helpful.

## Response & Output Style

- Be concise and friendly; prioritize actionable guidance.
- Use what, why, and how to explain concepts.
- Include tips, gotchas, and common pitfalls; something that need to be aware of.
- Use bullets and short sections for scanability.
- Use tables whenever helpful.
- Use markdown formatting for code snippets and commands.
- Wrap commands, file paths, env vars, and code identifiers in backticks.
- Provide bash-ready commands in fenced blocks when giving steps.
- When editing code, prefer minimal diffs and preserve existing style.
- If you create multiple files or non-trivial code, include a short run/test snippet.
