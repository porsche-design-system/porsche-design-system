// The lines scripts/figmaGenerate.ts prints for problems only design can fix, and the patterns the two readers match
// them with: scripts/figmaConnect.ts holds back the component sets they name, scripts/build-slack-figma-payload.ts
// turns them into one action per component for design. One module, so a reworded line cannot break a reader silently.
// No imports: the Slack builder runs under bare `node`.

/** Every problem line starts with this marker; the readers anchor on it. */
export const printed = (line: string): string => `✖ ${line}`;

/** Why no rule places a Figma property. Each has a matcher in `REASON` and one design action in the Slack builder. */
export const reasons = {
  slotMissing: 'is a slot PDS does not have',
  noProp: (figmaType: string): string => `(${figmaType}) has no PDS prop`,
  disallowedValues: (values: string[]): string => `has values PDS does not allow: ${values.join(', ')}`,
  typeMismatch: (figmaType: string, pdsType: string): string => `is ${figmaType} in Figma but ${pdsType} in PDS`,
};
export const REASON = {
  slotMissing: /^is a slot PDS does not have$/,
  /** Group: the Figma property type. */
  noProp: /^\((\w+)\) has no PDS prop$/,
  /** Group: the options, comma-separated. */
  disallowedValues: /^has values PDS does not allow: (.+)$/,
  /** Groups: the Figma type, the PDS type. */
  typeMismatch: /^is (.+) in Figma but (.+) in PDS$/,
};

/** A Figma property no rule and no exception places: `tag (106:261) → p-tag: "dense" (VARIANT) has no PDS prop — …` */
export const unplaceableLine = (component: string, id: string, tag: string, figma: string, reason: string): string =>
  `${component} (${id}) → ${tag}: "${figma}" ${reason} — fix it in Figma`;

/**
 * A PDS prop, slot or allowed value the Figma component has no property or option for, outside the baseline. `name` is
 * the property Figma needs, with the type (and a VARIANT's options) the rules place, or `prop=value` for a missing
 * variant option, with no `property`.
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

/** Groups: component, node id, Figma property, reason. */
export const UNPLACEABLE = /^✖ (.+?) \((\d+:\d+)\) → p-[\w-]+: "([^"]+)" (.+?) — fix it in Figma$/;
/** Groups: component, node id, name, then for a property its type and, for a VARIANT, its options; both empty for an option. */
export const COVERAGE_GAP =
  /^✖ (.+?) \((\d+:\d+)\) → p-[\w-]+: "([^"]+)" has no Figma (?:(\w+) property(?: with the options (.+?))?|option) — add it in Figma$/;
/** Either kind; group 1 is the component set's node id. */
export const WAITING_ON_DESIGN = /^✖ .+? \((\d+:\d+)\) → p-[\w-]+: "[^"]+" .+ — (?:fix|add) it in Figma$/;
