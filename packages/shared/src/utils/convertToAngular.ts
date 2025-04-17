// TODO: Change to latest change-case version once components/unit tests are migrated to vitest and can handle ESM
import { camelCase } from 'change-case-legacy';

export const transformEventsToAngularSyntax = (markup: string): string =>
  markup.replace(/\son([a-z]+?)="(.*?)"/g, ' ($1)="$2"');

export const transformAngularAttributesWithObjectValues = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="{(.*?)}"/g, (_, $key, $value) => ` [${camelCase($key)}]="{${$value}}"`);

export const transformAngularAttributesWithNotDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="([^-\d].*?)"/g, (_, $key, $value) =>
    // handle aria attributes
    $key.startsWith('aria-') ? ` ${$key}="${$value}"` : ` [${camelCase($key)}]="'${$value}'"`
  );

export const transformAngularAttributesWithDigitValue = (markup: string): string =>
  markup.replace(/\s([a-z-]+)="(-?\d*)"/g, (_, $key, $value) =>
    $key === 'maxlength'
      ? ` [maxLength]="${$value}"`
      : // surround numeric "name", "model" and pin-code "value" prop values with single quotes
        $key === 'name' || $key === 'model' || ($key === 'value' && $value === '1234') // TODO replace hardcoded values with more generic approach (Configurable Storefront Examples #3315)
        ? ` [${$key}]="'${$value}'"`
        : ` [${camelCase($key)}]="${$value}"`
  );

export const cleanAngularBooleanAndUndefinedValues = (markup: string): string =>
  // remove single quotes from boolean values
  markup.replace(/\s(\[[A-Za-z]+\])="'(true|false|undefined)'"/g, ' $1="$2"');

export const unbindAngularNativeAttributes = (markup: string): string =>
  // remove brackets from "id", "class", "style, "slot" and "title" attributes
  markup.replace(/\s\[(id|class|style|slot|title)\]="'(.*?)'"/g, ' $1="$2"');

export const convertToAngular = (markup: string): string =>
  [
    transformEventsToAngularSyntax,
    transformAngularAttributesWithObjectValues,
    transformAngularAttributesWithNotDigitValue,
    transformAngularAttributesWithDigitValue,
    cleanAngularBooleanAndUndefinedValues,
    unbindAngularNativeAttributes,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
