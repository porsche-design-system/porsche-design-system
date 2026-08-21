/**
 * The one deprecation contract every metadata-producing package shares: the marker, the published
 * shape and the generated wording.
 *
 * A node carrying a `deprecation` is deprecated — the mere presence of the marker says so, even when
 * both fields are omitted. How the marker is *produced* differs per package (authored beside the
 * declarations it generates, or read from the `@deprecated` annotation a hand-written declaration
 * already carries), but the shape and the sentence do not, so every source publishes and renders the
 * same way.
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

/** A declaration plus the marker. */
export type Deprecated<T> = T & { deprecation: Deprecation };

/**
 * A package's published deprecated surface: canonical identifiers and their markers, in the order
 * they are rendered. This is the whole read surface the deprecation index needs, so a collector adds
 * only audit vocabulary and re-spells nothing.
 */
export type Deprecations = { identifier: string; deprecation: Deprecation }[];

/** Whether a node carries the deprecation lifecycle marker. */
export const isDeprecated = <T>(node: T): node is T & Deprecated<unknown> =>
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
