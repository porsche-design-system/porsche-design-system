/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// Bundled into every record at publish; each read looks a property up by name when the snippet renders, with Figma's
// getter. A getter returns a truthy "Property not found" section for a property the instance lacks, so each read checks
// `properties` first.
const instance = figma.selectedInstance;

/** The property's Figma type, which `properties` carries at runtime though Figma's typings leave it out. */
const typeOf = (name: string): unknown => (instance.properties[name] as { type?: unknown } | undefined)?.type;

/** `getBoolean` maps `true`/`'true'` and `false`/`'false'`, and any other value to `undefined`. */
const toggle = (name: string): 'on' | 'off' | undefined =>
  read.has(name) ? instance.getBoolean(name, { true: 'on', false: 'off' } as const) : undefined;

export const read = {
  has: (name: string): boolean => name in instance.properties,
  /** A BOOLEAN (`true`) or a `false`/`true` VARIANT (`'true'`). */
  flag: (name: string): boolean => toggle(name) === 'on',
  /** A BOOLEAN (`false`) or a `false`/`true` VARIANT (`'false'`): turned off, as opposed to not drawn. */
  off: (name: string): boolean => toggle(name) === 'off',
  /** A TEXT value or a VARIANT option; empty text is no value, and neither is an instance swap's node id or a slot. */
  text: (name: string): string | undefined => {
    if (!read.has(name) || typeOf(name) === 'INSTANCE_SWAP' || typeOf(name) === 'SLOT') return undefined;
    const value: unknown = instance.getString(name);
    return typeof value === 'string' && value ? value : undefined;
  },
  /** A value PDS allows; `getEnum` reads any other option, and a BOOLEAN, as `undefined`. */
  oneOf: (name: string, allowed: readonly string[]): string | undefined =>
    read.has(name) ? instance.getEnum(name, Object.fromEntries(allowed.map((value) => [value, value]))) : undefined,
  /** Text that is a number. */
  number: (name: string): string | undefined => {
    const value = read.text(name);
    return value !== undefined && /^-?\d+(\.\d+)?$/.test(value) ? value : undefined;
  },
  /** `hideLabel`, or Figma's `showLabel` inverted: a Figma boolean can show a layer but not hide it. */
  hideLabel: (): boolean =>
    read.has('hideLabel') ? read.flag('hideLabel') : read.has('showLabel') && !read.flag('showLabel'),
  /** A SLOT property, as opposed to a TEXT property of the same name. */
  isSlot: (name: string): boolean => typeOf(name) === 'SLOT',
};
