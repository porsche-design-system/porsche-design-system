import { camelCase, pascalCase, paramCase } from 'change-case';
import { getComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

type TagNamesInfo = { [tagName: string]: { [propName: string]: PropMeta } | undefined };

export const transformObjectValues = (markup: string): string => {
  // remove quotes from object values but add double brackets and camelCase
  return markup.replace(/\s(\S+)="({.*?})"/g, (_, $key, $value) => ` ${camelCase($key)}={${$value}}`);
};

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

export const transformBooleanDigitAndUndefinedValues = (markup: string): string => {
  const tagNamesPropsMeta = getPropsMeta(markup);

  return markup
    .replace(/\s(\S+)="(true|false|-?\d*|undefined)"/g, ' $1={$2}')
    .replace(/<([a-zA-Z][\w-]*)([^>]*?)\s(\S+)=\{(.*?)}/g, (match, tagName, rest, key, value) => {
      const propsMeta = tagNamesPropsMeta[tagName];

      if (propsMeta) {
        const propMeta = propsMeta[key];
        if (
          propMeta &&
          // we assume that each type starting with a capital letter is a none primitive type. See: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
          initialIsCapital(propMeta.type) &&
          Array.isArray(propMeta.allowedValues) &&
          propMeta.allowedValues.every((item) => typeof item === 'string')
        ) {
          return `<${tagName}${rest} ${key}="${value}"`;
        }
      }

      return match;
    });
};

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

function getTagNames(markup: string): TagName[] {
  const regex = /<\s*(p-[a-zA-Z-]+)\b/g;
  const components = [];
  let match;
  while ((match = regex.exec(markup)) !== null) {
    components.push(match[1]);
  }
  return [...new Set(components)] as TagName[];
}

function getPropsMeta(markup: string): TagNamesInfo {
  const tagNames = getTagNames(markup);

  return tagNames.reduce((acc: TagNamesInfo, tagName) => {
    acc[tagName] = getComponentMeta(tagName).propsMeta;
    return acc;
  }, {});
}

function initialIsCapital(word: string): boolean {
  return word[0] !== word[0].toLowerCase();
}

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
