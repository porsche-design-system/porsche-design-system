/**
 * The vocabulary of the deprecation index — the inverse of the knowledge skill's per-component
 * references: every deprecated Porsche Design System API in the installed version, in one place, so
 * an audit can scan a project in a single pass instead of reconstructing the catalog from ~63
 * reference files.
 *
 * Nothing here parses a deprecation message. Messages are carried verbatim (see
 * {@link DeprecationEntry.message}) because their wording is inconsistent across the codebase
 * (`Has no effect anymore.` versus `has no effect anymore`) and a consumer that branched on the prose
 * would break the day a maintainer rewords a comment.
 */

/**
 * What kind of API a deprecated entry names. This is the only axis the index classifies on, and it
 * drives {@link BASELINE_EFFORT} and how the audit searches for the entry.
 *
 * The split that matters for detection is identifier-vs-value: every kind except `value` is
 * statically present in source no matter what data flows through it (`<PAccordion heading={x}>`
 * already proves the deprecated prop is used), while a deprecated `value` is a plain string that can
 * arrive from a variable, a constant or a spread.
 */
export const ENTRY_KINDS = ['component', 'prop', 'value', 'event', 'slot', 'cssVariable', 'styleAlias'] as const;
export type EntryKind = (typeof ENTRY_KINDS)[number];

/** Ordinal remediation effort, cheapest first. */
export const EFFORTS = ['trivial', 'small', 'medium', 'large'] as const;
export type Effort = (typeof EFFORTS)[number];

/**
 * Baseline remediation effort per entry kind — a deterministic default so the action plan has a
 * stable order. With severity flat at `medium` for every deprecation and confidence usually `high`,
 * effort is the only thing left ordering the plan; deriving it from the kind keeps two runs of the
 * same audit in agreement, which a per-finding judgement call would not.
 *
 * It is a baseline, not a verdict: a project can implement a deprecated API in a way that changes the
 * real cost, so the audit may deviate on concrete project evidence as long as it records the observed
 * effort and the reason. Because the baseline is known, the deviation stays auditable.
 *
 * It lives here as a mapping rather than on each entry because it is fully determined by the kind —
 * the audit skill states the table once instead of the index repeating a constant on ~400 rows.
 */
export const BASELINE_EFFORT: Record<EntryKind, Effort> = {
  value: 'trivial',
  styleAlias: 'trivial',
  prop: 'small',
  slot: 'small',
  event: 'small',
  cssVariable: 'small',
  component: 'medium',
};

/**
 * Every source the index is derived from. Categories are enumerated even when they currently hold no
 * deprecations, so a reader can tell "checked, nothing deprecated" apart from "never checked" — the
 * distinction an audit needs to claim coverage honestly.
 */
export const SOURCE_CATEGORIES = [
  'components',
  'scss',
  'emotion',
  'vanillaExtract',
  'tailwindcss',
  'tokens',
  'icons',
  'stylesheets',
  'partials',
] as const;
export type SourceCategory = (typeof SOURCE_CATEGORIES)[number];

/** One deprecated API. */
export type DeprecationEntry = {
  /**
   * Stable rule id, e.g. `prop/p-accordion/heading`. Part of the report contract: findings are
   * compared across runs and releases by this, so it must not change when unrelated content does.
   */
  id: string;
  kind: EntryKind;
  source: SourceCategory;
  /** Owning component tag, for `prop` / `value` / `event` / `slot` / `cssVariable`. */
  owner?: string;
  /** The deprecated name itself — `heading`, `semi-bold`, `$pds-border-radius-small`. */
  identifier: string;
  /** For `value`: the prop the deprecated value belongs to. */
  prop?: string;
  /** The deprecation message exactly as the source states it; empty when the source carries none. */
  message: string;
  /** What to use instead, when the source states it. */
  replacement?: string;
  /** Skill-root-relative link to the reference documenting the replacement. */
  reference?: string;
};

/**
 * One source category's contribution. `expectedEmpty` marks a category that legitimately has no
 * deprecations in this release; the completeness gate fails a category that is empty *without* the
 * declaration, so the day tokens or icons gain their first deprecation someone has to decide about it
 * rather than the index silently staying short.
 */
export type DeprecationSource = {
  category: SourceCategory;
  /** Human-readable origin, rendered into the index so a reader can verify the claim. */
  origin: string;
  entries: DeprecationEntry[];
  expectedEmpty?: true;
};
