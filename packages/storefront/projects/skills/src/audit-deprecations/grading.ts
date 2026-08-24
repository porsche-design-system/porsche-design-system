import { BASELINE_EFFORT, EFFORTS, type Effort, type EntryKind } from '../knowledge/deprecations/types';

/**
 * How a finding is graded: how certain it is, and how much the fix costs.
 *
 * Everything here is derived rather than judged. Confidence is a lookup from *how* a usage was
 * reached, and effort a lookup from what kind of API it is — so both are facts a reader can check
 * against the evidence beside them instead of assurances an agent asserted. The report schema takes
 * its enums from here and `SKILL.md` renders its tables from here, so the rule the agent is given and
 * the values the report may carry cannot drift apart.
 */

/** Confidence a finding can carry. Anything weaker than `medium` is a manual follow-up, never a finding. */
export type Confidence = 'high' | 'medium';

/**
 * How an evidence location was reached, and what that is worth.
 *
 * Recorded per location rather than per finding: one finding collects every use of the same
 * deprecated API, and those can be reached differently. A direct usage and a fallback-search hit in
 * the same finding are not equally certain, so grading the finding as a whole would misreport one of
 * them.
 */
export const DETECTIONS = {
  direct: {
    confidence: 'high',
    description: 'The deprecated API appears in the file itself.',
  },
  'wrapper-forwarded': {
    confidence: 'high',
    description: "Reached through the project's own wrapper(s), with forwarding explicit at every hop.",
  },
  'wrapper-transformed': {
    confidence: 'medium',
    description: 'Reached through a wrapper that renames, conditions or otherwise transforms it along the way.',
  },
  'fallback-search': {
    confidence: 'medium',
    description: 'Found by searching index spellings after the traversal ran out, then anchored to PDS.',
  },
} as const satisfies Record<string, { confidence: Confidence; description: string }>;

/**
 * How a deprecated *value* was resolved. Values are the one entry kind the source does not guarantee
 * statically — a plain string can arrive from anywhere — so they carry a second grade.
 */
export const VALUE_RESOLUTIONS = {
  literal: {
    confidence: 'high',
    description: 'Written in place, including inside a breakpoint object.',
  },
  'same-file-constant': {
    confidence: 'high',
    description: 'A constant declared in the same file.',
  },
  'imported-constant': {
    confidence: 'medium',
    description: 'A constant imported from another file, resolved one hop.',
  },
} as const satisfies Record<string, { confidence: Confidence; description: string }>;

export const DETECTION_IDS = Object.keys(DETECTIONS);
export const VALUE_RESOLUTION_IDS = Object.keys(VALUE_RESOLUTIONS);

/**
 * Baseline effort for one deprecation: its entry kind, raised one level when the index documents no
 * replacement.
 *
 * The kind alone is not enough. Swapping a deprecated component for its documented successor is
 * routine work; removing one with nothing to swap in means designing what replaces it, which is a
 * different job on the same row. `replacement` is optional on an index entry, so the audit can tell
 * the two apart without judging anything.
 */
export const baselineEffort = (entryKind: EntryKind, hasReplacement: boolean): Effort =>
  hasReplacement
    ? BASELINE_EFFORT[entryKind]
    : EFFORTS[Math.min(EFFORTS.indexOf(BASELINE_EFFORT[entryKind]) + 1, EFFORTS.length - 1)];
