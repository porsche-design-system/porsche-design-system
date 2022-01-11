import { camelCase, pascalCase } from 'change-case';

export const transformObjectValues = (markup: string): string =>
  // remove quotes from object values but add double brackets and camelCase
  markup.replace(/\s(\S+)="({.*?})"/g, (m, $key, $value) => {
    return ` ${camelCase($key)}={${$value}}`;
  });

export const transformStandardAttributes = (markup: string): string =>
  // transform all standard attributes to camel case
  markup.replace(/\s(\S+)="(.*?)"/g, (m, $key, $value) => {
    return ` ${camelCase($key)}="${$value}"`;
  });

export const transformClassAttribute = (markup: string): string =>
  markup.replace(/\sclass="(.*?)"/g, ' className="$1"');

export const transformEventsToReactSyntax = (markup: string): string =>
  // transform to camelCase event binding syntax
  markup.replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
    return ` on${pascalCase($key)}={() => { ${$value} }}`;
  });

export const transformBooleanAndDigitValues = (markup: string): string =>
  // transform to camelCase event binding syntax
  markup.replace(/\s(\S+)="(true|false|-?\d*)"/g, ' $1={$2}');

export const transformCustomElementTagName = (markup: string): string =>
  markup.replace(/<(\/?)(p-[\w-]+)(.*?)>/g, (m, $slash, $tag, $attributes) => {
    return `<${$slash}${pascalCase($tag)}${$attributes}>`;
  });

export const transformInputs = (markup: string): string => markup.replace(/(<input(?:.[^/]*?))>/g, '$1 />');

export const transformToSelfClosingTags = (markup: string): string =>
  markup.replace(/(<([A-Za-z]+).*?)(><\/\2)>/g, '$1 />');

export const transformStyleAttribute = (markup: string): string =>
  markup.replace(/style="(.*?)"/g, (m, $style: string) => {
    $style = $style
      .replace(/;/g, ',') // transform semi colons to comma
      .replace(/,$/g, ''); // remove last comma

    const pairs = $style.split(',').map((p) => {
      const [prop, val] = p.split(':');
      return `${camelCase(prop)}: '${val.trim()}'`;
    });

    return `style={{ ${pairs.join(', ')} }}`;
  });

export const convertToReact = (markup: string): string => {
  return [
    transformObjectValues,
    transformStandardAttributes,
    transformClassAttribute,
    transformEventsToReactSyntax,
    transformBooleanAndDigitValues,
    transformCustomElementTagName,
    transformInputs,
    transformToSelfClosingTags,
    transformStyleAttribute,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
};
