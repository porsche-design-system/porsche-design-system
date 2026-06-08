# Writing `*.meta.ts` files

Each `*.meta.ts` file describes a group of style tokens. A build script (`scripts/generateEmotionStyles.ts`, run via
`npm run generate:styles`) reads every meta file and writes one standalone `.ts` file per entry into a `generated/`
folder, plus the barrel `index.ts` files.

You almost never need to read the generator. You just need to follow one rule.

---

## The golden rule

> **A `value` must be self-contained: build it only from string/number literals, imported identifiers, and inline
> objects/templates of those. Never reference a `const` declared elsewhere in the same meta file from inside a
> `value`.**

The generator copies a `value` expression into a new file _verbatim_. If the value mentions a helper that only exists in
the meta file, that helper won't exist in the generated file — so the generator can't use it. Keeping values
self-contained is what makes the generator simple and predictable.

### ✅ Allowed inside `value`

```ts
import { spacingFluidMd } from '@porsche-design-system/tokens';
import { _cssVariableGridBasicSpanOneHalf } from './gridShared';

// a literal
value: 'full-start',

// an imported identifier (design token or a shared-module export)
value: spacingFluidMd,

// a template literal made of literals + imports
value: `var(${_cssVariableGridBasicSpanOneHalf})`,

// an inline object/array of the above (`as const` is preserved)
value: { columnStart: 'full-start', columnEnd: 'full-end' } as const,
```

### ❌ Not allowed inside `value`

```ts
const gridGap = spacingFluidMd;        // local helper
const fullStart = 'full-start';        // local helper

value: gridGap,        // ❌ generated file would reference a name that doesn't exist there
value: fullStart,      // ❌ same problem
```

**Fix:** inline it, or import a real export instead of a local const.

```ts
value: spacingFluidMd,   // ✅ use the import directly
value: 'full-start',     // ✅ inline the literal
```

> If two entries share the same value and you want to avoid repeating a literal, put the shared value in a **real
> importable module** (like `gridShared.ts`) and `import` it. An import is fine; a local `const` in the meta file is
> not.

---

## Descriptions

`description` must be a plain string or a template literal — **no references to local consts**. (It ends up verbatim in
the generated JSDoc comment.)

```ts
// ✅ fine
description: 'Holds a **medium** `border-radius`.',
description: `Holds the [light-dark()](https://…) **canvas** color.`,

// ❌ not allowed
const mdLink = '[light-dark()](https://…)';
description: `Holds the ${mdLink} **canvas** color.`,   // inline the text instead
```

---

## When the value genuinely needs logic — `handWritten: true`

Some entries can't be expressed as a self-contained literal: they call a helper function, compute something, or
reference a large shared object. For those, set `handWritten: true` and write the file yourself.

```ts
gridBasicOffsetS: {
  name: 'gridBasicOffsetS',
  value: getOffsetS('basic'),   // calls a local helper — can't be generated
  description: 'Holds a **small** offset within the `basic` area.',
  handWritten: true,            // generator SKIPS this entry
},
```

What you must do for a hand-written entry:

1. **Create the file yourself** at the category root (next to the meta file), e.g. `grid/gridBasicOffsetS.ts`, exporting
   `export const gridBasicOffsetS = …`. (Hand-written files live _outside_ the `generated/` folder so the generator's
   wipe-and-rewrite of `generated/` never touches them.)
2. **Wire it into the category `index.ts`** by hand:
   ```ts
   export * from './generated';
   export { gridBasicOffsetS } from './gridBasicOffsetS';
   ```

The `value` you write in the meta file for a hand-written entry is effectively documentation — the generator ignores it
— but keep it accurate so the meta file still reads as the source of truth.

---

## Grouping & deprecated entries (these are fine — they're about structure, not values)

- **Nested groups** become sub-folders. The object key is the folder name (camelCase → kebab-case):
  `fluid: { spacingFluidXs: { … } }` → `generated/fluid/spacingFluidXs.ts`.
- **Deprecated entries** go in an export named `deprecatedXxxMeta` and land in `generated/deprecated/`. It's idiomatic
  to define each one as a `const deprecatedFooMeta: MetaEntry = { … }` and reference it by name in the export map:

  ```ts
  const deprecatedBorderRadiusSmall: MetaEntry = { name: 'borderRadiusSmall', value: radiusSm, description: '…' };

  export const deprecatedBorderMeta: Meta = {
    borderRadiusSmall: deprecatedBorderRadiusSmall, // ✅ referencing an ENTRY by name is fine
  };
  ```

  This is allowed because it's about _organizing entries_, not about the content of a `value`. The golden rule only
  restricts what goes **inside** `value`.

---

## Before you commit

Always regenerate and sanity-check:

```bash
npm run generate:styles                  # rewrites every generated/ folder
npm run test:unit                         # 199 snapshot/contract tests
npx biome check src/<your-file>.meta.ts   # lint/format the meta file
```

If a generated file ends up referencing an undefined name, or a snapshot test fails, you almost certainly broke the
golden rule — find the local-const reference inside a `value` and inline it (or mark the entry `handWritten`).

### One gotcha: very long inlined values

If inlining makes a `value` object longer than Biome's 120-char line limit, Biome will want to wrap it across lines —
which would change the generated file. Keep it on one line and add a suppression comment so the generated output stays
stable:

```ts
// biome-ignore format: kept on one line so the generated file matches byte-for-byte
value: { columnStart: 'extended-start', columnEnd: 'extended-end', spanOneHalf: `var(${_cssVariableGridExtendedSpanOneHalf})` } as const,
```

(Long **template literals** and **strings** don't need this — Biome can't reflow them, so it leaves them alone.)
