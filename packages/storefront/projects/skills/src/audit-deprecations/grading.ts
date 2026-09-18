import { BASELINE_EFFORT, EFFORTS, type Effort, type UsageKind } from '../knowledge/deprecations/types';

/**
 * Derives confidence and effort from auditable evidence. The schema and generated instructions share
 * these definitions to prevent drift.
 */

/** Confidence a finding can carry. Anything weaker than `medium` is a manual follow-up, never a finding. */
export type Confidence = 'high' | 'medium';

/**
 * Grades each location by the route used to reach it. Per-location grading preserves differences
 * between direct, wrapper, and fallback evidence within one finding.
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
 * Grades where a deprecated value was resolved, independently of the route that reached its usage.
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
 * Raises baseline effort by one level when the index documents no replacement.
 */
export const baselineEffort = (usageKind: UsageKind, hasReplacement: boolean): Effort =>
  hasReplacement
    ? BASELINE_EFFORT[usageKind]
    : EFFORTS[Math.min(EFFORTS.indexOf(BASELINE_EFFORT[usageKind]) + 1, EFFORTS.length - 1)];
