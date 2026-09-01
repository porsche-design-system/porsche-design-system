/**
 * The one deprecation contract every metadata-producing package shares: the marker, the shared
 * shape and the generated wording.
 *
 * Internal. `@porsche-design-system/shared` is never published — this contract and the
 * `<pkg>Deprecations` lists built from it are consumed by the storefront docs and the skills
 * generator only — no wrapper `dist/` contains them (see `docs/public-api.md`). The *declarations*
 * it marks — props, CSS variables, SCSS variables, style utilities, tokens — are public; the
 * metadata describing them is not.
 *
 * A node carrying a `deprecation` is deprecated — the mere presence of the marker says so, even when
 * both fields are omitted. How the marker is *produced* differs per package (authored beside the
 * declarations it generates, or read from the `@deprecated` annotation a hand-written declaration
 * already carries), but the shape and the sentence do not, so every source is generated and
 * rendered the same way.
 *
 * This is a deep entry point (`@porsche-design-system/shared/deprecation`) so the metadata bundles
 * that import it at runtime do not drag the package barrel along.
 */

export type Deprecation = {
  /** Extra guidance, appended to the generated sentence. Never replaces it. */
  note?: string;
  /** Canonical consumer-facing identifier of the replacement, e.g. `$radius-sm`. */
  replacement?: string;
};

export const USAGE_KINDS = [
  'component',
  'prop',
  'propValue',
  'event',
  'slot',
  'cssCustomProperty',
  'cssClass',
  'scssVariable',
  'scssMixin',
  'jsExport',
] as const;
export type UsageKind = (typeof USAGE_KINDS)[number];

/** A declaration's marker slot. Intersect it into a leaf type: `type ScssVariable = { … } & Deprecated`. */
export type Deprecated = { deprecation?: Deprecation };

/**
 * A package's deprecated surface: canonical identifiers and their markers, in the order they are
 * rendered. This is the whole read surface the deprecation index needs, so a collector adds only
 * audit vocabulary and re-spells nothing.
 */
export type Deprecations = { usageKind: UsageKind; identifier: string; deprecation: Deprecation }[];

/**
 * Whether a node carries the deprecation lifecycle marker.
 *
 * Narrows to the *required* form so a caller can read `node.deprecation` and build a
 * {@link Deprecations} entry from it. `Required<Deprecated>` derives that from the declaration above,
 * so the marker key is spelled in exactly one place.
 */
export const isDeprecated = <T>(node: T): node is T & Required<Deprecated> =>
  typeof node === 'object' && node !== null && 'deprecation' in node;

/**
 * The comment syntax of the artifact being generated. Named by syntax rather than by language, so a
 * new generated source picks the one that fits rather than growing this union.
 */
export type CommentStyle = 'line' | 'block' | 'jsdoc';

const WRAP: Record<CommentStyle, (text: string) => string> = {
  line: (text) => `// ${text}`,
  block: (text) => `/* ${text} */`,
  jsdoc: (text) => `/** ${text} */`,
};

/**
 * The lifecycle sentence. There is exactly one: a deprecation without a `replacement` can still
 * carry real guidance in its `note`, so claiming it "has no replacement" would contradict it. The
 * absence of a replacement is conveyed structurally instead — no `Use … instead.` sentence.
 */
const LIFECYCLE = 'This API will be removed with the next major release.';

/**
 * The `@deprecated` comment a generated artifact carries, in the target syntax:
 * `Use <replacement> instead. <lifecycle> <note>`, each part present only when it applies.
 *
 * Packages whose declarations are hand-written TypeScript write their annotation to match this
 * output and validate it against this function, so the wording stays identical everywhere.
 */
export const getDeprecationComment = ({ replacement, note }: Deprecation, style: CommentStyle): string =>
  WRAP[style](['@deprecated', replacement && `Use ${replacement} instead.`, LIFECYCLE, note].filter(Boolean).join(' '));
