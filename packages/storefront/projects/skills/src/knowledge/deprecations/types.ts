import { USAGE_KINDS, type UsageKind } from '@porsche-design-system/shared/deprecation';
import { getWrapperPackageName, type SkillFramework } from '../../registry';

/**
 * Shared deprecation-index vocabulary. Messages remain opaque source text; consumers must not derive
 * behavior from their wording.
 */

export type { UsageKind };
/**
 * Drives search behavior and baseline effort. Unlike identifiers, `propValue` requires resolving the
 * value's origin.
 */
export { USAGE_KINDS };

/** Ordinal remediation effort, cheapest first. */
export const EFFORTS = ['trivial', 'small', 'medium', 'large'] as const;
export type Effort = (typeof EFFORTS)[number];

/**
 * Deterministic remediation baseline per usage kind. Missing replacements and project evidence may
 * adjust it later.
 */
export const BASELINE_EFFORT: Record<UsageKind, Effort> = {
  propValue: 'trivial',
  cssClass: 'trivial',
  scssVariable: 'trivial',
  scssMixin: 'trivial',
  jsExport: 'trivial',
  prop: 'small',
  slot: 'small',
  event: 'small',
  cssCustomProperty: 'trivial',
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
] as const;
export type SourceCategory = (typeof SOURCE_CATEGORIES)[number];

export const publicWrapperExport = (framework: SkillFramework, subpath = ''): string =>
  `\`${getWrapperPackageName(framework)}${subpath}\``;

export type DeprecationEntry = {
  /**
   * Stable rule id, e.g. `prop/p-accordion/heading`. Part of the report contract: findings are
   * compared across runs and releases by this, so it must not change when unrelated content does.
   */
  id: string;
  usageKind: UsageKind;
  source: SourceCategory;
  /** Owning component tag, for `prop` / `propValue` / `event` / `slot` / `cssCustomProperty`. */
  owner?: string;
  /** The deprecated name itself — `heading`, `semi-bold`, `$pds-border-radius-small`. */
  identifier: string;
  /** For `propValue`: the prop the deprecated value belongs to. */
  prop?: string;
  /**
   * The deprecation message exactly as the source states it, omitted when it carries none. Styling
   * sources carry one only when the package authored extra guidance: their lifecycle sentence is
   * stated once in the reference's intro rather than repeated on every row.
   */
  message?: string;
  /** What to use instead, when the source states it. */
  replacement?: string;
  /** Skill-root-relative link to the reference documenting the replacement. */
  reference?: string;
};

/**
 * `expectedEmpty` distinguishes a checked empty source from a collector that silently returned no
 * entries.
 */
export type DeprecationSource = {
  category: SourceCategory;
  /** Human-readable origin, rendered into the index so a reader can verify the claim. */
  origin: (framework: SkillFramework) => string;
  entries: DeprecationEntry[];
  expectedEmpty?: true;
};
