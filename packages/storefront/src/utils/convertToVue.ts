import { camelCase, pascalCase, paramCase } from 'change-case';

export const transformObjectValues = (markup: string): string =>
  // remove quotes from object values but add double brackets and camelCase
  markup.replace(/\s(\S+)="({.*?})"/g, (m, $key, $value) => ` ${camelCase($key)}={${$value}}`);

export const transformEvents = (markup: string): string =>
  // transform to camelCase event binding syntax
  markup.replace(/\son([a-z]+?)="(.*?)"/g, (m, $key, $value) => ` @on${pascalCase($key)}={() => { ${$value} }}`);

export const transformBooleanDigitAndUndefinedValues = (markup: string): string =>
  markup.replace(/\s(\S+)="(true|false|-?\d*|undefined)"/g, ' $1={$2}').replace(/{(911|718)}/g, '"$1"'); // TODO replace temporary 911|718 work around with more generic approach

export const transformCustomElementTagName = (markup: string): string =>
  markup.replace(/<(\/?)(p-[\w-]+)/g, (m, $slash, $tag) => `<${$slash}${pascalCase($tag)}`);

export const transformInputs = (markup: string): string => markup.replace(/(<input(?:.[^/]*?))>/g, '$1 />');

export const transformToSelfClosingTags = (markup: string): string =>
  markup.replace(/(<([A-Za-z-]+)[^>]*?)>\s*<\/\2>/g, '$1 />');

export const transformStyleAttribute = (markup: string): string =>
  markup.replace(/\sstyle="([\s\S]*?)"/g, (m, $style: string) => {
    $style = $style
      .replace(/;/g, ',') // transform semi colons to comma
      .replace(/,\s*$/g, ''); // remove last comma

    const pairs = $style.split(',').map((p) => {
      const [prop, val] = p.split(':').map((x) => x.trim());
      const value = val.match(/^\d+(?:\.\d+)?$/) ? val : `'${val}'`; // numbers don't need quotes
      return `${camelCase(prop)}: ${value}`;
    });

    return ` style={{ ${pairs.join(', ')} }}`;
  });

export const convertToVue = (markup: string): string =>
  [
    transformObjectValues,
    transformEvents,
    transformBooleanDigitAndUndefinedValues,
    transformCustomElementTagName,
    transformInputs,
    transformToSelfClosingTags,
    transformStyleAttribute,
  ].reduce((previousResult, fn) => fn(previousResult), markup);
