import { camelCase } from 'change-case';

export const transformEventsToAngularSyntax = (markup: string): string =>
  markup.replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => ` (${$key})="${$value}"`);

export const transformAttributesWithObjectValues = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="{(.*?)}"/g, (m, $key, $value) => ` [${camelCase($key)}]="{${$value}}"`);

export const transformAttributesWithNotDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="([^-\d].*?)"/g, (m, $key, $value) =>
    // handle aria attributes
    $key.startsWith('aria-') ? ` ${$key}="${$value}"` : ` [${camelCase($key)}]="'${$value}'"`
  );

export const transformAttributesWithDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="(-?\d*)"/g, (m, $key, $value) =>
    // surround numeric "name" attribute values with single quotes
    $key === 'name' ? ` [${$key}]="'${$value}'"` : ` [${camelCase($key)}]="${$value}"`
  );

export const cleanBooleanValues = (markup: string): string =>
  // remove single quotes from boolean values
  markup.replace(/\s(\[[A-Za-z]+\])="'(true|false)'"/g, ' $1="$2"');

export const cleanClassAndSlotAttributes = (markup: string): string =>
  // remove brackets from "class" and "slot("|slot) attributes
  markup.replace(/\s\[(class|slot)]="'(.*?)'"/g, ' $1="$2"');

export const convertToAngular = (markup: string): string =>
  [
    transformEventsToAngularSyntax,
    transformAttributesWithObjectValues,
    transformAttributesWithNotDigitValue,
    transformAttributesWithDigitValue,
    cleanBooleanValues,
    cleanClassAndSlotAttributes,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
