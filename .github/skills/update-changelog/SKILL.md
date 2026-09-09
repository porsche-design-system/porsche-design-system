---
name: update-changelog
description:
  Update packages/components/CHANGELOG.md to match the current branch. Use when the user wants to write, update, sync or
  check the changelog for the branch or pull request they are working on.
---

Reconcile `packages/components/CHANGELOG.md` with everything this branch changes, so it documents exactly the
consumer-facing changes — no more, no less.

The editorial rules live in [`docs/changelog.md`](../../../docs/changelog.md). **Read that file first**; it decides what
belongs in the changelog, which section an entry goes in, and how entries are worded. This skill only describes the
procedure.

[`docs/public-api.md`](../../../docs/public-api.md) decides what "consumer-facing" means — which of the four published
packages' subpaths an export actually reaches, and which internal entry points only look public. Read it before deciding
on any entry about an export.

`packages/assets/CHANGELOG.md` is maintained manually and must not be touched.

## Steps

### 1. Resolve the pull request

Every entry needs a pull request link, and the pull request also supplies the base branch. Try in order:

```bash
gh pr view --json number,baseRefName,url,title,body
```

If `gh` is unavailable or unauthenticated, fall back to the public REST API — the repository is public, so this needs no
token:

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
curl -s "https://api.github.com/repos/porsche-design-system/porsche-design-system/pulls?head=porsche-design-system:${BRANCH}&state=open"
```

If both fail for technical reasons, ask the user for the pull request number and base branch.

**If there is genuinely no pull request yet, stop.** Tell the user a pull request is required before the changelog can
be written, and do not modify any file. Do not guess a number from the branch name — `issue/4644` is an _issue_ number
and does not match the pull request number.

If no base branch could be resolved, use `main`.

### 2. Collect the change set

Diff the whole branch against its merge-base with the base branch, **including uncommitted work**:

```bash
BASE=$(git merge-base origin/<baseRefName> HEAD)
git --no-pager diff "$BASE" --stat
git --no-pager diff "$BASE" -- <paths of interest>
```

Fetch the base branch first if `origin/<baseRefName>` is stale. Read the actual diff hunks, not just the file list — the
file list cannot tell you whether a change is consumer-facing.

### 3. Identify this branch's existing entries

Everything already in `[Unreleased]` on the base branch belongs to other people. Only lines this branch added are yours:

```bash
git --no-pager diff "$BASE" -- packages/components/CHANGELOG.md
```

Added lines here are this branch's entries — the only ones you may amend or remove. Never touch anything else in the
file, and never edit a released section.

### 4. Decide the entries

For every change in the diff, ask **"would a consumer notice this after upgrading?"** Apply the rules in
`docs/changelog.md`.

Judge by what the code does, not by which package it sits in. Consumer-facing code lives in unexpected places, and many
`packages/components` changes are invisible from the outside.

When a change touches an export, resolve whether it is published before writing anything about it. **The most reliable
and easiest way is to read the built wrapper `dist/` folders** — each one _is_ the npm package:

```
packages/components-js/dist/components-wrapper     → @porsche-design-system/components-js
packages/components-angular/dist/angular-wrapper   → @porsche-design-system/components-angular
packages/components-react/dist/react-wrapper       → @porsche-design-system/components-react
packages/components-vue/dist/vue-wrapper           → @porsche-design-system/components-vue
```

```bash
ls packages/components-js/dist/components-wrapper          # top-level folders = published subpaths
grep -rl "<exact-identifier>" packages/components-*/dist/*-wrapper/  # no hit = internal, no entry
```

Grep for the exact identifier, not a loose word: the generated skill markdown contains prose like "deprecations".

Never decide this from the workspace package's own `package.json`. If the folders are not built, fall back to
`grep -n "cp -r \.\./" packages/components-{js,angular,react,vue}/package.json` and
`npm view @porsche-design-system/components-js@latest exports --json`.

Most workspace packages are `"private": true` and only look published. The `meta/` output of `scss`, `tailwindcss`,
`emotion`, `vanilla-extract` and `stylesheets`, all of `@porsche-design-system/tokens-meta` and
`@porsche-design-system/shared`, and every `*Meta` / `*Deprecations` / `kindOf` / `flatten` export are internal and get
no entry. `…/scss` ships `.scss` only and `…/tailwindcss` ships `index.css` only.

When a change adds or modifies an API, check its JSDoc or `@css-variable` description for a `🧪Experimental` marker and
mirror it as `(🧪Experimental)`.

Then reconcile against what step 3 found:

- **Add** an entry for every consumer-facing change that is not documented yet
- **Amend** an entry that is inaccurate, in the wrong section, wrongly worded, or that no longer matches the code
- **Remove** an entry whose change is no longer in the branch diff, for example because it was reverted in a later
  commit

If nothing on the branch is consumer-facing, **leave the file untouched** and report why you concluded no entry is
needed. Do not write a placeholder entry.

### 5. Write

Edit `packages/components/CHANGELOG.md` directly. Create `###` sections inside `## [Unreleased]` only when they have
entries, keep them in Keep a Changelog order (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`), and append new
entries to the end of their section.

### 6. Format

```bash
npx prettier --write packages/components/CHANGELOG.md
```

`npm run format` runs Biome and does not cover Markdown, so this step is required.

### 7. Report

Summarise what you did, grouped as **Added**, **Amended** and **Removed**, quoting each entry. Then list the
consumer-facing-looking changes you deliberately left out and why, so the user can challenge your judgement.

## Rules

- Never touch `packages/assets/CHANGELOG.md`
- Never edit a released version section — only `## [Unreleased]`
- Never modify entries belonging to other branches
- Never invent a pull request number
- Never commit or push; leave the change in the working tree
