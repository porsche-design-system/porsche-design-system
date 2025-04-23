// TODO: Change to latest change-case version once components/unit tests are migrated to vitest and can handle ESM
import { camelCase, paramCase, pascalCase } from 'change-case-legacy';

export const transformObjectValues = (markup: string): string =>
  // remove quotes from object values but add double brackets and camelCase
  markup.replace(/\s(\S+)="({.*?})"/g, (_, $key, $value) => ` ${camelCase($key)}={${$value}}`);

export const transformStandardAttributes = (markup: string): string =>
  // transform all standard attributes to camel case
  markup
    .replace(/\s(\S+)="(.*?)"/g, (_, $key, $value) => ` ${camelCase($key)}="${$value}"`)
    .replace(/(<(?:input|textarea|select).*?)\sreadonly/g, '$1 readOnly')
    .replace(/(<(?:input|textarea).*?)\smaxlength=/g, '$1 maxLength=')
    .replace(/\s(aria[A-Z][a-z]+)=/g, (m, $attr) => m.replace($attr, paramCase($attr)))
    .replace(/(<(?:img|source).*?)srcset=(".*")/g, '$1srcSet={$2}');

export const transformClassAttribute = (markup: string): string =>
  markup.replace(/\sclass="(.*?)"/g, ' className="$1"');

export const transformEvents = (markup: string): string =>
  // transform to camelCase event binding syntax
  markup.replace(/\son([a-z]+?)="(.*?)"/g, (_, $key, $value) => ` on${pascalCase($key)}={() => { ${$value} }}`);

export const transformBooleanDigitAndUndefinedValues = (markup: string): string =>
  markup.replace(/\s(\S+)="(true|false|-?\d*|undefined)"/g, ' $1={$2}').replace(/{(911|718|360|1234)}/g, '"$1"'); // TODO replace hardcoded values with more generic approach (Configurable Storefront Examples #3315)

export const transformCustomElementTagName = (markup: string): string =>
  markup.replace(/<(\/?)(p-[\w-]+)/g, (_, $slash, $tag) => `<${$slash}${pascalCase($tag)}`);

export const transformInputs = (markup: string): string => markup.replace(/(<input(?:.[^/]*?))>/g, '$1 />');

export const transformToSelfClosingTags = (markup: string): string =>
  markup.replace(/(<([A-Za-z-]+)[^>]*?)>\s*<\/\2>/g, '$1 />');

export const transformStyleAttribute = (markup: string): string =>
  markup.replace(/\sstyle="([\s\S]*?)"/g, (_, $style: string) => {
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
