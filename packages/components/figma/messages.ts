// The design lines: what scripts/figmaGenerate.ts prints for problems only design can fix, and the patterns
// scripts/build-slack-figma-payload.ts reads them with. One module, so a changed line cannot break the reader
// silently. No imports: the Slack builder runs under bare `node`.

/** Every problem line starts with this marker. The readers match on it. */
export const printed = (line: string): string => `✖ ${line}`;

/** Why no rule places a Figma property. Each reason has a pattern in `REASON` and one action in the Slack builder. */
export const reasons = {
  slotMissing: 'is a slot PDS does not have',
  noProp: (figmaType: string): string => `(${figmaType}) has no PDS prop`,
  disallowedValues: (values: string[]): string => `has values PDS does not allow: ${values.join(', ')}`,
  typeMismatch: (figmaType: string, pdsType: string): string => `is ${figmaType} in Figma but ${pdsType} in PDS`,
  deprecated: 'is deprecated in PDS',
  deprecatedValues: (values: string[]): string => `has values deprecated in PDS: ${values.join(', ')}`,
};
export const REASON = {
  slotMissing: /^is a slot PDS does not have$/,
  /** Group: the Figma property type. */
  noProp: /^\((\w+)\) has no PDS prop$/,
  /** Group: the options, comma-separated. */
  disallowedValues: /^has values PDS does not allow: (.+)$/,
  /** Groups: the Figma type, the PDS type. */
  typeMismatch: /^is (.+) in Figma but (.+) in PDS$/,
  deprecated: /^is deprecated in PDS$/,
  /** Group: the options, comma-separated. */
  deprecatedValues: /^has values deprecated in PDS: (.+)$/,
};

/** An unplaceable Figma property: `tag (106:261) → p-tag: "dense" (VARIANT) has no PDS prop — fix it in Figma` */
export const unplaceableLine = (component: string, id: string, tag: string, figma: string, reason: string): string =>
  `${component} (${id}) → ${tag}: "${figma}" ${reason} — fix it in Figma`;

/**
 * A coverage gap: a PDS prop, slot or allowed value with no Figma property or option, outside the baseline. `name` is
 * the property Figma needs, with its type and, for a VARIANT, its options. For a missing option, `name` is `prop=value`
 * and `property` is absent.
 */
export const coverageGapLine = (
  component: string,
  id: string,
  tag: string,
  name: string,
  property?: { type: string; options?: string[] }
): string => {
  const needed = property
    ? `${property.type} property${property.options?.length ? ` with the options ${property.options.join(', ')}` : ''}`
    : 'option';
  return `${component} (${id}) → ${tag}: "${name}" has no Figma ${needed} — add it in Figma`;
};

/** A coverage gap for a whole component: `p-sheet has no Figma component set — add it in Figma` */
export const componentGapLine = (tag: string): string => `${tag} has no Figma component set — add it in Figma`;

/** Groups: component, node id, Figma property, reason. */
export const UNPLACEABLE = /^✖ (.+?) \((\d+:\d+)\) → p-[\w-]+: "([^"]+)" (.+?) — fix it in Figma$/;
/** Groups: component, node id, name, type, options. Type and options are empty for a missing option. */
export const COVERAGE_GAP =
  /^✖ (.+?) \((\d+:\d+)\) → p-[\w-]+: "([^"]+)" has no Figma (?:(\w+) property(?: with the options (.+?))?|option) — add it in Figma$/;
/** Group: the PDS tag. */
export const COMPONENT_GAP = /^✖ (p-[\w-]+) has no Figma component set — add it in Figma$/;
