/**
 * The one deprecation contract every metadata-producing package shares: the marker, the leaf wrapper
 * and the lifecycle wording.
 *
 * A node carrying a `deprecation` is deprecated — the mere presence of the marker says so, even when
 * both fields are omitted. How the marker is *produced* differs per package (authored beside the
 * declarations it generates, or read from the `@deprecated` annotation the declaration already
 * carries), but the published shape and the sentences do not, so the knowledge skill's deprecation
 * index reads every styling solution the same way.
 *
 * This is a deep entry point (`@porsche-design-system/shared/deprecation`) so the metadata bundles
 * that import it at runtime do not drag the package barrel along.
 */

export type Deprecation = {
  /** Optional note replacing the default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing identifier, such as `$radius-sm`, `--shadow-sm` or `focus-visible()`. */
  replacement?: string;
};

/**
 * The deprecated counterpart of a documented leaf: the same render input minus its `description`,
 * plus the required marker. Distributive, so a union of leaf kinds maps in one go
 * (`Deprecated<ScssVariable | ScssMixin>`).
 *
 * The requirement is what keeps a package's two catalogs apart at the type level — a documented node
 * cannot silently gain a marker, and a deprecated one cannot silently lose it. `description` is
 * dropped rather than made optional because a legacy alias is documented by its deprecation, not by
 * a docs row, and nothing renders one; extra prose belongs in {@link Deprecation.message}.
 */
export type Deprecated<T> = (T extends unknown ? Omit<T, 'description'> : never) & { deprecation: Deprecation };

/** Any branch of a deprecated catalog: a leaf, an array, or a nested record. Only leaves carry nodes. */
export type DeprecationsBranch<T> = T | DeprecationsBranch<T>[] | { [key: string]: DeprecationsBranch<T> };

/**
 * A package's deprecated surface, keyed by the same root domains as its documented catalog: every
 * domain is spelled out, empty ones included, so "checked, nothing deprecated" stays distinguishable
 * from "forgotten". Domain order is the rendered contract — the knowledge skill emits entries in it.
 */
export type DeprecationsMeta<TMeta, TNode> = Record<keyof TMeta, DeprecationsBranch<TNode>>;

/**
 * One deprecated API as a package publishes it: the canonical consumer-facing identifier plus the
 * marker. This is the whole read surface the deprecation index needs — render inputs stay in the
 * package's internal catalog — so a collector adds only audit vocabulary and re-spells nothing.
 */
export type PublishedDeprecation = { identifier: string; deprecation: Deprecation };

/**
 * A package's deprecated catalog as the ordered, flat list it publishes.
 *
 * Every styling package calls exactly this, differing only in how it spells an identifier — `$name`
 * versus `name()` versus `--custom-property` versus a bare export name — which is the one thing the
 * shared contract cannot know.
 */
export const publishDeprecations = <T extends Deprecated<unknown>>(
  catalog: DeprecationsBranch<T>,
  identifierOf: (node: T) => string
): PublishedDeprecation[] =>
  flattenDeprecations(catalog).map((node) => ({ identifier: identifierOf(node), deprecation: node.deprecation }));

/**
 * Walk a deprecated catalog into a flat list in source order; records and arrays only group. Exported
 * for the package tests that assert over whole nodes; consumers want {@link publishDeprecations}.
 */
export const flattenDeprecations = <T extends Deprecated<unknown>>(branch: DeprecationsBranch<T>): T[] =>
  Array.isArray(branch)
    ? branch.flatMap(flattenDeprecations)
    : isNode<T>(branch)
      ? [branch]
      : Object.values(branch).flatMap(flattenDeprecations);

/** A branch is a leaf exactly when it carries the marker. */
const isNode = <T extends Deprecated<unknown>>(branch: DeprecationsBranch<T>): branch is T => 'deprecation' in branch;

/** The lifecycle sentence used when a node authors no `message` of its own. */
const DEFAULT_MESSAGE = 'This API will be removed with the next major release.';
const DEFAULT_MESSAGE_WITHOUT_REPLACEMENT =
  'This API will be removed with the next major release and has no replacement.';

/**
 * The lifecycle sentence of a deprecated node: its authored `message`, or the default for its
 * replacement state. Annotation-derived catalogs always author one, so this returns their annotation
 * verbatim — which is why the audit's adapter can call it for every source alike.
 */
export const deprecationMessage = ({ deprecation }: Deprecated<unknown>): string =>
  deprecation.message ?? (deprecation.replacement ? DEFAULT_MESSAGE : DEFAULT_MESSAGE_WITHOUT_REPLACEMENT);

/**
 * The complete generated text: the replacement sentence, when there is one, followed by the lifecycle
 * message. Used for the comment a package generates into its shipped artifact; the audit renders the
 * replacement in its own column instead, so it uses {@link deprecationMessage}.
 */
export const deprecationText = (node: Deprecated<unknown>): string =>
  [node.deprecation.replacement && `Use ${node.deprecation.replacement} instead.`, deprecationMessage(node)]
    .filter(Boolean)
    .join(' ');

/** Whether a node carries the deprecation lifecycle marker. */
export const isDeprecated = <T>(node: T): node is T & Deprecated<unknown> =>
  typeof node === 'object' && node !== null && 'deprecation' in node;
