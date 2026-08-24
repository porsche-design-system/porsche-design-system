# Deprecation contract design

## Summary

`@porsche-design-system/shared/deprecation` is the one contract every metadata-producing package shares. It shrinks to
**three types and two functions**, and becomes reusable for any package that _generates_ a declaration rather than
hand-annotating one:

```ts
/** The lifecycle marker. Its presence — `{}` included — means the declaration is deprecated. */
export type Deprecation = {
  /** Extra guidance, appended to the generated sentence. Never replaces it. */
  note?: string;
  /** Canonical consumer-facing identifier of the replacement, e.g. `$radius-sm`. */
  replacement?: string;
};

/** A declaration's marker slot. Intersect it into a leaf type: `type ScssVariable = { … } & Deprecated`. */
export type Deprecated = { deprecation?: Deprecation };

/** A package's published deprecated surface, in rendered order. */
export type Deprecations = { identifier: string; deprecation: Deprecation }[];

/** Whether a node carries the marker. Narrows to the required form so `node.deprecation` is readable. */
export const isDeprecated: <T>(node: T) => node is T & Required<Deprecated>;

/** The `@deprecated` comment a generated artifact carries, in the target syntax. */
export const getDeprecationComment: (deprecation: Deprecation, style: CommentStyle) => string;
```

`deprecationMessage`, `deprecationText`, `publishDeprecations`, `flattenDeprecations`, `DeprecationsBranch`,
`DeprecationsMeta` and `PublishedDeprecation` are removed. The lifecycle wording ends up in exactly one place — inside
`getDeprecationComment` — instead of being spread across a message helper, a text helper and two per-package comment
generators.

The goal is that all four styling solutions **publish and render deprecations identically**, and that tokens — the fifth
metadata-producing source, and hand-written TypeScript like two of them — does the same. Today they do not: scss and
Tailwind carry a structured `replacement`, while emotion and vanilla-extract carry free prose and no replacement at all,
so the audit's remediation column is populated for two sources and empty for two.

## Architecture & approach

```text
Deprecation { note?, replacement? }
  ├─ getDeprecationComment ─→ generated artifacts   (scss partials, index.css, future generated TS)
  └─ Deprecations           ─→ knowledge-skill deprecation index
```

One rule decides where a marker comes from, unchanged from the per-source designs: **a package that generates its
declarations authors the marker; a package whose declarations are hand-written TypeScript reads it from the
`@deprecated` annotation those declarations already carry.** What changes is that the second kind now yields the _same
structured marker_ as the first.

### The generated sentence

```text
@deprecated Use <replacement> instead. This API will be removed with the next major release. <note>
```

The replacement sentence appears only when there is a `replacement`; the note only when there is a `note`. There is one
default sentence, not two. The previous "…and has no replacement." variant is dropped: a deprecation can have no symbol
replacement and still have real guidance (emotion's _"Use variables directly instead."_), and asserting "has no
replacement" beside that guidance contradicts it. Absence of a replacement is conveyed structurally — no
`Use … instead.` prefix, and `—` in the audit's remediation column.

### Comment styles

`CommentStyle` is `'line' | 'block' | 'jsdoc'`, named by syntax rather than by language so any future generated source
picks the one that fits:

| style   | output                 | used by                       |
| ------- | ---------------------- | ----------------------------- |
| `line`  | `// @deprecated …`     | scss partials (Sass silent)   |
| `block` | `/* @deprecated … */`  | Tailwind `index.css`          |
| `jsdoc` | `/** @deprecated … */` | generated TypeScript (future) |

The returned string carries no trailing newline; callers compose that.

## Components

### `note`, and why it is not `message`

`message` used to _replace_ the default sentence. `note` _appends_ to it, so the lifecycle wording can never be
overridden by a package and can never drift. Only one authored message exists across the styling packages today
(Tailwind's `--border-width-regular`), and it becomes `note: 'The default border width is now 1px.'`.

### `Deprecated` is a non-generic marker slot

`Deprecated = { deprecation?: Deprecation }`. It is not a wrapper that transforms a declaration — the earlier
`Deprecated<T> = T & { deprecation: Deprecation }` was generic and **required**, which suited neither of the two shapes
that actually exist: a catalog leaf that _may_ carry the marker, and the narrowed node `isDeprecated` produces. It was
used nowhere as a declared node type.

The non-generic slot is intersected into a leaf type instead — `type ScssVariable = { … } & Deprecated` — so the marker
key is declared once and spelled identically by every source. `isDeprecated` narrows to `Required<Deprecated>`, which
derives the required form from the same declaration, so a caller can read `node.deprecation` and build a `Deprecations`
entry without a non-null assertion.

The distributive `Omit<T, 'description'>` the generic once carried is gone, so `description` is required wherever the
leaf type has one (scss, Tailwind, stylesheets) and simply absent where the node never had one. `tokens-meta` was the
only package relying on the strip, and it no longer needs it either: emotion, vanilla-extract and tokens publish
`{ identifier, deprecation }` entries, which carry no description to strip.

### Annotation convention for emotion, vanilla-extract and tokens

Their `@deprecated` annotations name the replacement as a `{@link …}` reference, so the extractor recovers a structured
`replacement` instead of prose:

```ts
/** @deprecated Use {@link colorFrostedLight} instead. This API will be removed with the next major release. */
```

The annotation is written to read exactly as `getDeprecationComment` would render it. That is deliberate: these packages
are hand-maintained today because their `src/` is the shipped library rather than generated output, and when they do
become meta-generated the annotation will be produced by that function. Until then the text is a hand-written stand-in
for it.

The extractor therefore **validates** rather than guesses. It recovers `replacement` from the link, reconstructs the
sentence the shared API would generate, and compares:

- text equals the generated sentence → `{ replacement }`, no note;
- text starts with it → the remainder is the `note`;
- anything else → **the build fails**, naming the export and printing the expected form.

Roughly 21 of emotion's 107 annotations name no symbol (_"Use individual variables instead."_, `'normal'`, a
`linear-gradient(…)` snippet, two with no remediation). Those carry no `replacement` and keep their guidance as a
`note`.

Each of the three packages runs its own copy of this extractor over its own `src`. The wording is what must not drift,
and that lives in `getDeprecationComment`, which every copy validates against; the plumbing around it is a package's own
business, so nothing is shared beyond the contract.

### Knowledge-skill adapter

`styleAliasSource` stops calling a message helper and reads the published marker directly: `replacement` feeds the
remediation column, `note` feeds the message. The per-row lifecycle sentence disappears because the reference's intro
already states it once for the whole table — _"Deprecated APIs still work in this version. Each will be removed in the
next major release…"_ — so repeating it on ~370 rows was redundant.

Component deprecations are unaffected: their message is docblock prose that carries information the intro cannot ("Has
no effect anymore"), and it is still rendered verbatim.

## Data & state

Build-time data only. A package owns its declarations, their identity spelling and their markers; the knowledge skill
owns rule IDs, categories, reference paths and rendering. `Deprecations` is the whole read surface between them.

## Trade-offs

### Restructuring the annotations versus keeping prose

**Chosen:** restructure all 214.

Keeping prose costs nothing up front but leaves the stated goal — four solutions behaving identically — permanently out
of reach, because two of them would have no `replacement` to render. The restructure is a one-time codemod plus a
build-time validator that keeps it true.

### Tailwind adopting the full comment

**Chosen:** adopt it.

Tailwind previously emitted a terse `/* alias (deprecated) */` because CSS has no silent comment, so every byte ships to
consumers. Measured, the full comments cost **831 bytes on a 37 KB file** (+2.2%, before minification) across its 9
deprecations — the terse marker was sized against scss's 127 declarations, an order of magnitude it never had. In
exchange the guidance reaches anyone reading `index.css`, and one generator owns every marker.

### One shared type for the published object

**Chosen:** `Deprecations` describes the whole exported array rather than a single entry.

An array, not a record, because order is the rendered contract of the deprecation index. Per-entry types and the walkers
that built them are package business; the three packages that still keep a separate deprecated catalog write their own
three-line flatten.

### Dropping the second default sentence

Covered above: it asserted something that a deprecation with a `note` can contradict.

## Risks & mitigations

| Risk                                                                 | Mitigation                                                                                                                      |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| The 214-annotation codemod mangles or drops guidance.                | The extractor fails the build on any annotation it cannot structure, so a bad rewrite cannot land silently; snapshots reviewed. |
| A `{@link X}` names something that is not a real export.             | The extractor checks the name against what the package publishes — its public barrel, or the documented tokens.                 |
| The audit's rendered rows change for every styling source.           | Intentional and reviewed through the drift snapshot; component rows are untouched.                                              |
| A package hand-writes a different sentence into an annotation later. | The round-trip comparison is the validator — a divergent sentence is a build error, not a silent note.                          |
| `index.css` grows for every Tailwind consumer.                       | Measured at 831 bytes (+2.2%) before minification, on 9 declarations.                                                           |

## Testing strategy

1. `shared` — `getDeprecationComment` renders each style; the replacement sentence appears only with a `replacement`;
   the note is appended, never substituted; an empty `{}` still yields the lifecycle sentence.
2. Each styling package — its published `Deprecations` is spelled canonically, ordered, and carries markers by
   reference; generated artifacts contain the comment for every deprecated declaration.
3. emotion / vanilla-extract / tokens — every annotation round-trips: extracting and re-rendering reproduces it exactly.
   This is the test that keeps the hand-maintained annotations honest until they are generated.
4. skills — the rendered remediation column shows the replacement and any note, and no longer repeats the lifecycle
   sentence.

## Rollout

1. Rewrite `shared/src/deprecation` and its spec.
2. scss and Tailwind: call `getDeprecationComment`, retype the published export, rename Tailwind's authored message to a
   `note`.
3. tokens-meta: `note` instead of `message`.
4. emotion and vanilla-extract: codemod the annotations, teach both extractors the `{@link}` recovery and the strict
   validation, replace `publishDeprecations` with a local flatten.
5. tokens: adopt the same annotation convention and the same extraction, so the fifth source collects its deprecations
   like the two it structurally is.
6. skills: read `replacement` / `note` directly; update the drift snapshot.
7. Update the per-source design docs, `packages/styles/AGENTS.md` and `packages/tokens/AGENTS.md` to point at this
   contract.

## Open questions

None.

Open for later: emotion and vanilla-extract becoming meta-generated, at which point their annotations are produced by
`getDeprecationComment(deprecation, 'jsdoc')` and the validator becomes unnecessary.
