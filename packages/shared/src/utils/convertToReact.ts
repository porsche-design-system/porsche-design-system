import { camelCase, kebabCase, pascalCase } from 'change-case';
import { transformEmptyTagsToSelfClosing, transformInputsToSelfClosing } from './transformSelfClosingTags';

// All regular expressions in here are intentionally written without ambiguity between adjacent quantifiers and the
// delimiters following them to avoid polynomial backtracking (ReDoS) on uncontrolled markup.
//
// Attribute name: must not contain the `="` delimiter that follows it (using `\S+` would make the quantifier ambiguous
// with the delimiter, e.g. for input consisting of many repetitions of ` !="{`).
// Attribute value: must not contain the closing `"` and stays single line (like the previously used `.` did).
const attributeRegExp = /\s([^\s"'=<>/]+)="([^"\n]*)"/g;

// Values which have to be transformed into JSX expressions instead of strings. They are validated on the already
// extracted attribute value to keep the matching itself linear.
const objectValueRegExp = /^\{.*}$/;
const booleanDigitOrUndefinedValueRegExp = /^(?:true|false|-?\d*|undefined)$/;

export const transformObjectValues = (markup: string): string =>
  // remove quotes from object values but add double brackets and camelCase
  markup.replace(attributeRegExp, (match, $key, $value) =>
    objectValueRegExp.test($value) ? ` ${camelCase($key)}={${$value}}` : match
  );

export const transformStandardAttributes = (markup: string): string =>
  // transform all standard attributes to camel case
  markup
    .replace(attributeRegExp, (_, $key, $value) => ` ${camelCase($key)}="${$value}"`)
    .replace(/(<(?:input|textarea|select)[^>]*?)\sreadonly/g, '$1 readOnly')
    .replace(/(<(?:input|textarea)[^>]*?)\smaxlength=/g, '$1 maxLength=')
    .replace(/\s(aria[A-Z][a-z]+)=/g, (m, $attr) => m.replace($attr, kebabCase($attr)))
    .replace(/(<(?:img|source)[^>]*?)srcset=("[^"\n]*")/g, '$1srcSet={$2}');

export const transformClassAttribute = (markup: string): string =>
  markup.replace(/\sclass="([^"\n]*)"/g, ' className="$1"');

export const transformEvents = (markup: string): string =>
  // transform to camelCase event binding syntax
  markup.replace(/\son([a-z]+?)="([^"\n]*)"/g, (_, $key, $value) => ` on${pascalCase($key)}={() => { ${$value} }}`);

export const transformBooleanDigitAndUndefinedValues = (markup: string): string =>
  markup
    .replace(attributeRegExp, (match, $key, $value) =>
      booleanDigitOrUndefinedValueRegExp.test($value) ? ` ${$key}={${$value}}` : match
    )
    .replace(/{(911|718|360|1234)}/g, '"$1"'); // TODO replace hardcoded values with more generic approach (Configurable Storefront Examples #3315)

export const transformCustomElementTagName = (markup: string): string =>
  markup.replace(/<(\/?)(p-[\w-]+)/g, (_, $slash, $tag) => `<${$slash}${pascalCase($tag)}`);

export const transformInputs = (markup: string): string => transformInputsToSelfClosing(markup);

export const transformToSelfClosingTags = (markup: string): string => transformEmptyTagsToSelfClosing(markup);

export const transformStyleAttribute = (markup: string): string =>
  markup.replace(/\sstyle="([^"]*)"/g, (_, $style: string) => {
    $style = $style.replace(/;\s*$/g, ''); // remove last semicolon

    const pairs = $style.split(';').map((p) => {
      const [prop, val] = p.split(':').map((x) => x.trim());
      const value = val.match(/^\d+(?:\.\d+)?$/) ? val : `'${val}'`; // numbers don't need quotes

      // Check if the property is a custom css property
      const property = prop.startsWith('--') ? `"${prop}"` : camelCase(prop);

      return `${property}: ${value}`;
    });

    return ` style={{ ${pairs.join(', ')} }}`;
  });

export const convertToReact = (markup: string): string =>
  [
    transformObjectValues,
    transformStandardAttributes,
    transformClassAttribute,
    transformEvents,
    transformBooleanDigitAndUndefinedValues,
    transformCustomElementTagName,
    transformInputs,
    transformToSelfClosingTags,
    transformStyleAttribute,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
