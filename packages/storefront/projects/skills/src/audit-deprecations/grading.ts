import { BASELINE_EFFORT, EFFORTS, type Effort, type UsageKind } from '../knowledge/deprecations/types';

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
 * Every value below describes the **route**, never where the API happens to sit. The two axes read
 * the same on most locations and disagree on exactly the interesting ones: a tag built as a string in
 * a file that also imports PDS *is* in an anchored file, but nothing reached it from that import — it
 * was found by searching for it. Keeping one axis makes that a lookup rather than a judgement call.
 *
 * Recorded per location rather than per finding: one finding collects every use of the same
 * deprecated API, and those can be reached differently. A direct usage and a fallback-search hit in
 * the same finding are not equally certain, so grading the finding as a whole would misreport one of
 * them.
 *
 * The two wrapper rows are about *what the location is*, not what file it sits in: they describe a
 * call site of a project wrapper. A location that is the PDS usage itself is `direct` even when the
 * component holding it is a wrapper, and even when the value it carries was selected by that
 * wrapper's own prop — the route from the file's PDS root to that line never leaves the file. Read
 * the other way, every wrapper's internals grade `wrapper-transformed` and confidence drops on
 * findings nothing was actually inferred about.
 */
export const DETECTIONS = {
  direct: {
    confidence: 'high',
    description: 'Reached from a root in this file, without leaving it.',
  },
  'wrapper-forwarded': {
    confidence: 'high',
    description:
      "Reached at a call site of one of the project's own wrappers, with forwarding explicit at every hop between it and PDS.",
  },
  'wrapper-transformed': {
    confidence: 'medium',
    description:
      "Reached at a call site of one of the project's own wrappers, one of which renames, conditions or transforms it on the way to PDS.",
  },
  'fallback-search': {
    confidence: 'medium',
    description: 'Reached by searching an index identifier after the traversal ran out, then anchored to PDS.',
  },
} as const satisfies Record<string, { confidence: Confidence; description: string }>;

/**
 * How a deprecated prop value was resolved. Values are the one usage kind the source does not guarantee
 * statically — a plain string can arrive from anywhere — so they carry a second grade.
 *
 * Each row names where the string was written, which is not the same question as which route reached
 * it. A literal handed to a project wrapper three hops from PDS is `literal` here and
 * `wrapper-forwarded` on the other axis; treating a wrapper as a *resolution* instead would leave
 * half the detection table unreachable.
 */
export const VALUE_RESOLUTIONS = {
  literal: {
    confidence: 'high',
    description: 'Written in place — at the PDS usage or at a wrapper call site, breakpoint objects included.',
  },
  'same-file-constant': {
    confidence: 'high',
    description: 'A constant declared in the same file as the location.',
  },
  'imported-constant': {
    confidence: 'medium',
    description: 'A constant imported from another file, resolved one hop.',
  },
} as const satisfies Record<string, { confidence: Confidence; description: string }>;

export const DETECTION_IDS = Object.keys(DETECTIONS);
export const VALUE_RESOLUTION_IDS = Object.keys(VALUE_RESOLUTIONS);

/**
 * Baseline effort for one deprecation: its usage kind, raised one level when the index documents no
 * replacement.
 *
 * The kind alone is not enough. Swapping a deprecated component for its documented successor is
 * routine work; removing one with nothing to swap in means designing what replaces it, which is a
 * different job on the same row. `replacement` is optional on an index entry, so the audit can tell
 * the two apart without judging anything.
 *
 * "Documented" means the index's dedicated **Replacement** column names one. The index answers the
 * question; the audit reads the answer.
 */
export const baselineEffort = (usageKind: UsageKind, hasReplacement: boolean): Effort =>
  hasReplacement
    ? BASELINE_EFFORT[usageKind]
    : EFFORTS[Math.min(EFFORTS.indexOf(BASELINE_EFFORT[usageKind]) + 1, EFFORTS.length - 1)];
