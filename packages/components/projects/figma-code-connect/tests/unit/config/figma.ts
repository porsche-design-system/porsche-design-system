// Stands in for the `figma` module of Code Connect's template runtime; a test sets `globalThis.selectedInstance`.
// Tests import a helper fresh after setting it, because the helpers read the selected instance when they load.
declare global {
  var selectedInstance: {
    properties: Record<string, unknown>;
    getSlot?: (name: string) => unknown;
    findLayers?: (selector: (layer: unknown) => boolean) => unknown[];
  };
}

const isCode = (value: unknown): value is { type: 'CODE'; code: string } =>
  typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'CODE';

/** A section as Dev Mode shows it: nested sections flattened into the text around them, a CODE section as its code. */
const shown = (value: unknown): string =>
  Array.isArray(value) ? value.map(shown).join('') : isCode(value) ? value.code : String(value ?? '');

export default {
  get selectedInstance() {
    return globalThis.selectedInstance;
  },
  code: (strings: TemplateStringsArray, ...values: unknown[]): string =>
    strings.reduce((out, string, i) => out + string + (i < values.length ? shown(values[i]) : ''), ''),
};
