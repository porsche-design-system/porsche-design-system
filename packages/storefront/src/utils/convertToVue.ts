import { camelCase } from 'change-case';
import { transformCustomElementTagName, transformToSelfClosingTags } from '@/utils/convertToReact';

export const transformEventsToViewSyntax = (markup: string): string =>
  markup.replace(/\son([a-z]+?)="(.*?)"/g, ' @$1="$2"');

export const transformAttributesWithObjectValues = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="{(.*?)}"/g, (m, $key, $value) => ` :${camelCase($key)}="{${$value}}"`);

export const transformAttributesWithNotDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="([^-\d].*?)"/g, (m, $key, $value) =>
    // handle aria attributes
    $key.startsWith('aria-') ? ` ${$key}="${$value}"` : ` :${camelCase($key)}="'${$value}'"`
  );

export const transformAttributesWithDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="(-?\d*)"/g, (m, $key, $value) =>
    $key === 'maxlength'
      ? ` [maxLength]="${$value}"`
      : // surround numeric "name" and "model" prop values with single quotes
      $key === 'name' || $key === 'model' // TODO replace temporary 911|718 work around with more generic approach
      ? ` :${$key}="'${$value}'"`
      : ` :${camelCase($key)}="${$value}"`
  );

export const cleanBooleanAndUndefinedValues = (markup: string): string =>
  // remove single quotes from boolean values
  markup.replace(/\s(\[[A-Za-z]+\])="'(true|false|undefined)'"/g, ' $1="$2"');

export const unbindNativeAttributes = (markup: string): string =>
  // remove brackets from "id", "class", "style, "slot" and "title" attributes
  markup.replace(/\s:(id|class|style|slot|title)="'(.*?)'"/g, ' $1="$2"');

export const convertToVue = (markup: string): string =>
  [
    transformEventsToViewSyntax,
    transformAttributesWithObjectValues,
    transformAttributesWithNotDigitValue,
    transformAttributesWithDigitValue,
    cleanBooleanAndUndefinedValues,
    transformCustomElementTagName,
    transformToSelfClosingTags,
    unbindNativeAttributes,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
