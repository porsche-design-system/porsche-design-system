// The design lines and the patterns the Slack builder reads them with, in one module; the workflow greps `design: `.
// No imports: the Slack builder runs under bare `node`.

/** Every error line starts with this marker. */
export const printed = (line: string): string => `✖ ${line}`;

/** One change, as design reads it: a rename is `"old" → "new"`. */
export const change = {
  rename: (from: string, to: string): string => `"${from}" → "${to}"`,
  renameOption: (property: string, from: string, to: string): string => `"${from}" → "${to}" in "${property}"`,
  addProperty: (type: string, name: string, options: string[] = []): string =>
    `add a ${type} property named "${name}"${options.length ? ` with the options ${options.join(', ')}` : ''}`,
  addOption: (property: string, value: string): string => `add the option "${value}" to "${property}"`,
  addComponentSet: (name: string): string => `add a component set named "${name}"`,
  addIcon: (name: string): string => `add an icon component named "${name}"`,
  delete: (name: string): string => `delete "${name}"`,
  deleteOption: (property: string, value: string): string => `delete the option "${value}" from "${property}"`,
};

/** A change to one Figma component: `design: accordion (<node id>) → p-accordion: "summary" → "slot-summary"` */
export const changeLine = (component: string, id: string, tag: string, text: string): string =>
  `design: ${component} (${id}) → ${tag}: ${text}`;

/** A set or an icon to add to the library: `design: p-sheet: add a component set named "sheet"` */
export const libraryChangeLine = (tag: string, text: string): string => `design: ${tag}: ${text}`;

/** Groups: component, node id, change. */
export const CHANGE = /^design: (.+?) \((\d+:\d+)\) → p-[\w-]+: (.+)$/;
/** Groups: PDS tag, change. */
export const LIBRARY_CHANGE = /^design: (p-[\w-]+): (.+)$/;

/** A baseline entry that is no longer a gap; the workflow greps the `baseline: ` prefix. */
export const baselineCleanupLine = (tag: string, entry: string): string =>
  `baseline: ${tag} "${entry}" is no longer a gap — remove it from figma/coverage-baseline.json`;
