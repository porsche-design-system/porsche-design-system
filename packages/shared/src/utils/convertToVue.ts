// TODO: Change to latest change-case version once components/unit tests are migrated to vitest and can handle ESM
import { camelCase, pascalCase } from 'change-case-legacy';

export const transformEventsToVueSyntax = (markup: string): string =>
  markup.replace(/\son([a-z]+?)="(.*?)"/g, ' @$1="$2"');

export const transformVueAttributesWithObjectValues = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="{(.*?)}"/g, (_, $key, $value) => ` :${camelCase($key)}="{${$value}}"`);

export const transformVueAttributesWithNotDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="([^-\d].*?)"/g, (_, $key, $value) =>
    // handle aria attributes
    $key.startsWith('aria-') ? ` ${$key}="${$value}"` : ` :${camelCase($key)}="'${$value}'"`
  );

export const transformVueAttributesWithDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="(-?\d*)"/g, (_, $key, $value) =>
    $key === 'maxlength'
      ? ` :maxLength="${$value}"`
      : // surround numeric "name" and "model" prop values with single quotes
        $key === 'name' || $key === 'model' // TODO replace hardcoded values with more generic approach (Configurable Storefront Examples #3315)
        ? ` :${$key}="'${$value}'"`
        : ` :${camelCase($key)}="${$value}"`
  );

export const cleanVueBooleanAndUndefinedValues = (markup: string): string =>
  // remove single quotes from boolean values
  markup.replace(/\s(:[A-Za-z]+)="'(true|false|undefined)'"/g, ' $1="$2"');

export const unbindVueNativeAttributes = (markup: string): string =>
  // remove brackets from "id", "class", "style, "slot" and "title" attributes
  markup.replace(/\s:(id|class|style|slot|title)="'(.*?)'"/g, ' $1="$2"');

export const transformVueCustomElementTagName = (markup: string): string =>
  markup.replace(/<(\/?)(p-[\w-]+)/g, (_, $slash, $tag) => `<${$slash}${pascalCase($tag)}`);

export const transformVueInputs = (markup: string): string => markup.replace(/(<input(?:.[^/]*?))>/g, '$1 />');

export const transformVueToSelfClosingTags = (markup: string): string =>
  markup.replace(/(<([A-Za-z-]+)[^>]*?)>\s*<\/\2>/g, '$1 />');

export const convertToVue = (markup: string): string =>
  [
    transformEventsToVueSyntax,
    transformVueAttributesWithObjectValues,
    transformVueAttributesWithNotDigitValue,
    transformVueAttributesWithDigitValue,
    cleanVueBooleanAndUndefinedValues,
    unbindVueNativeAttributes,
    transformVueCustomElementTagName,
    transformVueInputs,
    transformVueToSelfClosingTags,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
