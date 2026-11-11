// The design lines and the patterns the Slack builder reads them with, in one module; the workflow greps `design: `.
// No imports: the Slack builder runs under bare `node`.

/** Every error line starts with this marker. */
export const printed = (line: string): string => `✖ ${line}`;

/** Each property type as Figma's UI names it, with its article. */
const typed: Record<string, string> = {
  BOOLEAN: 'a boolean property',
  TEXT: 'a text property',
  VARIANT: 'a variant property',
  INSTANCE_SWAP: 'an instance swap property',
  SLOT: 'a slot property',
};
/** `a`, `a and b`, `a, b and c` */
const listed = (items: string[]): string =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items.join('');
const quoted = (names: string[]): string => listed(names.map((name) => `"${name}"`));
const withOptions = (options: string[]): string => (options.length ? ` with the options ${listed(options)}` : '');

/** Why a property or an option goes. */
export const because = {
  deprecated: 'PDS deprecated it',
  notAllowed: 'PDS has no such value',
  hideLabel: '"hideLabel" replaces it',
};

/** One change, as design reads it: an instruction naming the property, and the type and options of an add. */
export const change = {
  rename: (from: string, to: string): string => `Rename "${from}" to "${to}"`,
  /** history showed the property under its PDS name */
  renameBack: (from: string, to: string): string => `Rename "${from}" back to "${to}"`,
  renameOption: (property: string, from: string, to: string): string =>
    `Rename the option "${from}" to "${to}" in "${property}"`,
  /** properties with the same options that moved in one version step, which history cannot pair */
  replaced: (appeared: string[], vanished: string[]): string => {
    const moved = `${quoted(appeared)} replaced ${quoted(vanished)}`;
    const extra = appeared.length - vanished.length;
    if (extra > 0) {
      const back = vanished.length === 1 ? 'whichever stands' : 'the ones that stand';
      const rest =
        extra === 1 ? 'the other to its fig… name or delete it' : 'the others to their fig… names or delete them';
      return `${moved}: rename back ${back} for ${quoted(vanished)}, and ${rest}`;
    }
    if (extra < 0) {
      const back = appeared.length === 1 ? 'it' : 'each';
      return `${moved}: rename ${back} back to whichever it stands for, and add the ${extra === -1 ? 'other' : 'others'} again`;
    }
    return `${moved}: rename each back to the PDS name it stands for`;
  },
  /** a property no PDS name stands for; `fig` is its design-only name */
  unknown: (name: string, fig: string): string =>
    `"${name}" is not a PDS property: rename it to "${fig}" if it is only for Figma, or delete it`,
  /** a property out of history's reach, next to the one PDS prop of its type Figma lacks */
  maybeRenamed: (name: string, to: string, fig: string, type: string, options: string[] = []): string =>
    `Rename "${name}" to "${to}" if it is the same property; otherwise rename it to "${fig}" or delete it, and add ${typed[type]} "${to}"${withOptions(options)}`,
  /** a property of the wrong type whose PDS name a rename gives to another property */
  displaced: (name: string, fig: string, by: string): string =>
    `Rename "${name}" to "${fig}" or delete it: "${by}" is the PDS "${name}"`,
  addProperty: (type: string, name: string, options: string[] = []): string =>
    `Add ${typed[type]} "${name}"${withOptions(options)}`,
  addOption: (property: string, value: string): string => `Add the option "${value}" to "${property}"`,
  addComponentSet: (name: string): string => `Add a component set "${name}"`,
  addIcon: (name: string): string => `Add an icon component "${name}"`,
  delete: (name: string, reason: string): string => `Delete "${name}": ${reason}`,
  deleteOption: (property: string, value: string, reason: string): string =>
    `Delete the option "${value}" from "${property}": ${reason}`,
  redraw: (name: string, type: string, options: string[], current: string): string =>
    `Redraw "${name}" as ${typed[type]}${withOptions(options)}, not ${typed[current]}`,
};

/** A change to one Figma component: `design: accordion (<node id>) → p-accordion: Rename "summary" to "slot-summary"` */
export const changeLine = (component: string, id: string, tag: string, text: string): string =>
  `design: ${component} (${id}) → ${tag}: ${text}`;

/** A set or an icon to add to the library: `design: p-sheet: Add a component set "sheet"` */
export const libraryChangeLine = (tag: string, text: string): string => `design: ${tag}: ${text}`;

/** Groups: component, node id, change. */
export const CHANGE = /^design: (.+?) \((\d+:\d+)\) → p-[\w-]+: (.+)$/;
/** Groups: PDS tag, change. */
export const LIBRARY_CHANGE = /^design: (p-[\w-]+): (.+)$/;

/** An accepted gap that is no longer a gap; the workflow greps the `accepted-gap: ` prefix. */
export const acceptedGapCleanupLine = (tag: string, entry: string): string =>
  `accepted-gap: ${tag} "${entry}" is no longer a gap — remove it from figma/accepted-gaps.json`;
