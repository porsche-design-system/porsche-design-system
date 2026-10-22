/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// Bundled into every record at publish; each read looks a property up by name when the snippet renders.
// A property the instance lacks is absent from `properties`, so Dev Mode shows no "Property not found" pill.
const properties = figma.selectedInstance.properties as Record<string, unknown>;

/** `{ value, type }` at runtime; Figma's docs show the bare value, which reads the same. */
const entry = (name: string): { value: unknown; type?: unknown } | undefined => {
  if (!(name in properties)) return undefined;
  const raw = properties[name];
  return raw !== null && typeof raw === 'object' && 'value' in raw
    ? (raw as { value: unknown; type?: unknown })
    : { value: raw };
};

/** A value an attribute can carry: an instance swap's node id and a slot are none. */
const scalar = (name: string): unknown => {
  const found = entry(name);
  return found && found.type !== 'INSTANCE_SWAP' && found.type !== 'SLOT' ? found.value : undefined;
};

export const read = {
  has: (name: string): boolean => name in properties,
  /** A BOOLEAN (`true`) or a `false`/`true` VARIANT (`'true'`). */
  flag: (name: string): boolean => {
    const value = scalar(name);
    return value === true || value === 'true';
  },
  /** A BOOLEAN (`false`) or a `false`/`true` VARIANT (`'false'`): turned off, as opposed to not drawn. */
  off: (name: string): boolean => {
    const value = scalar(name);
    return value === false || value === 'false';
  },
  /** A TEXT value or a VARIANT option; empty text is no value. */
  text: (name: string): string | undefined => {
    const value = scalar(name);
    return typeof value === 'string' && value ? value : undefined;
  },
  /** A value PDS allows; an option it does not allow is no value. */
  oneOf: (name: string, allowed: readonly string[]): string | undefined => {
    const value = read.text(name);
    return value !== undefined && allowed.includes(value) ? value : undefined;
  },
  /** Text that is a number. */
  number: (name: string): string | undefined => {
    const value = read.text(name);
    return value !== undefined && /^-?\d+(\.\d+)?$/.test(value) ? value : undefined;
  },
  /** `hideLabel`, or Figma's `showLabel` inverted: a Figma boolean can show a layer but not hide it. */
  hideLabel: (): boolean =>
    read.has('hideLabel') ? read.flag('hideLabel') : read.has('showLabel') && !read.flag('showLabel'),
  /** A SLOT property, as opposed to a TEXT property of the same name. */
  isSlot: (name: string): boolean => {
    const found = entry(name);
    return (
      found !== undefined && (found.type === 'SLOT' || (found.type === undefined && typeof found.value === 'object'))
    );
  },
};
