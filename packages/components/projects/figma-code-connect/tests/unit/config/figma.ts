// Stands in for the `figma` module of Code Connect's template runtime; a test sets `globalThis.selectedInstance`.
// Tests import a helper fresh after setting it, because the helpers read the selected instance when they load.
declare global {
  var selectedInstance: {
    properties: Record<string, { value: unknown; type: string }>;
    getSlot?: (name: string) => unknown;
    getInstanceSwap?: (name: string) => unknown;
    findLayers?: (selector: (layer: unknown) => boolean) => unknown[];
  };
}

type Property = { value: unknown; type: string };
const notFound = (name: string) => [{ type: 'ERROR', message: `Property not found: ${name}` }];
/** `true`/`'true'` and `false`/`'false'` of any type as a boolean, any other value as `undefined`. */
const toggle = ({ value }: Property): boolean | undefined =>
  value === true || value === 'true' ? true : value === false || value === 'false' ? false : undefined;

// The getters as Figma's preview ran them on 2026-11-04, a property the instance lacks included.
const getters = (properties: Record<string, Property>) => ({
  getBoolean: (name: string, mapping?: Record<string, unknown>) => {
    if (!(name in properties)) return notFound(name);
    const on = toggle(properties[name]);
    return mapping ? (on === undefined ? undefined : mapping[String(on)]) : on === true;
  },
  getString: (name: string) => (name in properties ? properties[name].value : notFound(name)),
  getEnum: (name: string, mapping: Record<string, unknown>) => {
    if (!(name in properties)) return notFound(name);
    const { value, type } = properties[name];
    return type === 'VARIANT' || type === 'TEXT' ? mapping[String(value)] : undefined;
  },
});

const isCode = (value: unknown): value is { type: 'CODE'; code: string } =>
  typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'CODE';

/** A section as Dev Mode shows it: nested sections flattened into the text around them, a CODE section as its code. */
const shown = (value: unknown): string =>
  Array.isArray(value) ? value.map(shown).join('') : isCode(value) ? value.code : String(value ?? '');

export default {
  get selectedInstance() {
    return { ...getters(globalThis.selectedInstance.properties), ...globalThis.selectedInstance };
  },
  code: (strings: TemplateStringsArray, ...values: unknown[]): string =>
    strings.reduce((out, string, i) => out + string + (i < values.length ? shown(values[i]) : ''), ''),
};
