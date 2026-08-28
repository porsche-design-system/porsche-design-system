---
name: code-review-changelog
description: Code review check that verifies packages/components/CHANGELOG.md was updated correctly for the changes in a pull request. Use when reviewing a pull request to confirm consumer-facing changes are documented and that no unnecessary entries were added.
---

Review whether `packages/components/CHANGELOG.md` correctly documents this pull request.

The editorial rules live in [`docs/changelog.md`](../../../docs/changelog.md). **Read that file first**; it is the
standard you are reviewing against. This skill only describes what to check and how to report it.

`packages/assets/CHANGELOG.md` is maintained manually and is out of scope — never comment on it.

## Method

1. Read the full pull request diff and work out what actually changes for a consumer of
   `@porsche-design-system/components-{js|angular|react|vue}`.
2. Read the `[Unreleased]` section of `packages/components/CHANGELOG.md` on the head branch, and the diff of that file,
   so you know which entries this pull request added.
3. Compare the two.

Judge relevance by what the code does, not by which package it sits in. Consumer-facing code lives in unexpected places
— published sub-projects, wrappers, style packages, testing helpers — and many `packages/components` changes are
invisible from the outside.

## Checks

### 1. Missing entry

The pull request changes something a consumer can observe, but nothing in `[Unreleased]` describes it.

This is the most valuable check and the one most likely to be a false negative, because the changelog file is often not
in the diff at all. Do not skip it just because no changelog line was touched.

Also flag a pull request that documents _some_ of its consumer-facing changes but silently omits others.

### 2. Unnecessary entry

The pull request added an entry for something a consumer cannot observe — documentation, tests, internal refactoring,
tooling, build or CI. These bloat the changelog and should be removed.

### 3. Wrong section

The entry is in `Added`, `Changed`, `Deprecated`, `Removed` or `Fixed` when the rules in `docs/changelog.md` put it
somewhere else. Common cases:

- A fix for behaviour that never worked as intended filed under `Changed` instead of `Fixed`
- A rename with a deprecation path filed as `Removed` instead of `Deprecated` + `Added`
- A breaking change missing the `**Breaking Change**` prefix, or lacking the migration step it must state

### 4. Inaccurate or incomplete wording

- The entry does not match what the code actually does
- A `Fixed` entry describes the implementation of the fix instead of the symptom the consumer experienced
- A breaking change omits what breaks or how to migrate
- One entry summarises several distinct changes that should be separate entries
- The entry is padded with detail a consumer does not need
- `(🧪Experimental)` is missing although the API is marked experimental in its JSDoc or `@css-variable` description, or
  present although it is not

### 5. Format and placement

- The entry is outside `## [Unreleased]`, or an already-released section was modified
- The pull request link is missing, or points at a different pull request
- The prefix convention is broken — backticked Title Case for components, bold for cross-cutting topics
- Sections are out of Keep a Changelog order, or a duplicate section heading was introduced

## Reporting

- **Stay silent when the changelog is correct, or when the pull request genuinely needs no entry.** Most pull requests
  should produce no comment from this check. Do not post a comment to say things look fine.
- **Only comment on findings you are confident about.** If you are unsure whether a change is consumer-facing, say
  nothing. A false positive here is worse than a miss, because it trains reviewers to ignore the check.
- There is no opt-out label or phrase. Decide for yourself whether an entry is warranted.
- For a missing entry, attach the comment to the code that introduced the undocumented change and propose concrete entry
  text, including the section it belongs in and the pull request link.
- For a wrong or unnecessary entry, comment on the changelog line and propose the corrected text as a suggestion where
  possible.
- Keep each comment to the point: what is wrong, and the exact replacement.
