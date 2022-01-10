import { camelCase, paramCase, pascalCase } from 'change-case';
import { Theme } from '@/models';
import { getComponentMeta, TagName } from '@porsche-design-system/shared';

export const cleanMarkup = (markup: string): string =>
  markup
    // replace <br> tags with new line
    .replace(/<br[\s/]*>/g, '\n')
    // remove multiple new lines
    .replace(/\n{3,}/g, '\n\n');

export const patchThemeIntoMarkup = (markup: string, theme: Theme): string =>
  theme === 'dark'
    ? markup
        // add dark theme attribute if component supports it
        .replace(/(<[pP][\w-]+)/g, (m, $tag) => {
          return getComponentMeta(paramCase($tag.replace('<', '')) as TagName)?.isThemeable
            ? `${$tag} theme="dark"`
            : $tag;
        })
    : markup;

export const convertToAngular = (markup: string): string =>
  markup
    // transform to event binding syntax
    .replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
      return ` (${$key})="${$value}"`;
    })
    // transform all keys of object values to camel case and surround them in brackets
    .replace(/\s([a-z-]+)="{(.*?)}"/g, (m, $key, $value) => {
      return ` [${camelCase($key)}]="{${$value}}"`;
    })
    // transform all other keys to camel case, surround them in brackets and surround all values with single quotes
    .replace(/\s([a-z-]+)="([^-]\D.*?)"/g, (m, $key, $value) => {
      if ($key.startsWith('aria-')) {
        // handle aria attributes
        return ` ${$key}="${$value}"`;
      } else {
        return ` [${camelCase($key)}]="'${$value}'"`;
      }
    })
    // transform all keys to camel case which have digits as a value
    .replace(/\s([a-z-]+)="(-?\d*)"/g, (m, $key, $value) => {
      if ($key === 'name') {
        // surround numeric "name" attribute values with single quotes
        return ` [${$key}]="'${$value}'"`;
      } else {
        return ` [${camelCase($key)}]="${$value}"`;
      }
    })
    // remove single quotes from boolean values
    .replace(/\s(\[[A-Za-z]+\])="'(true|false)'"/g, ' $1="$2"')
    // remove brackets from "class" and "slot("|slot) attributes
    .replace(/\s\[(class|slot)]="'(.*?)'"/g, ' $1="$2"');

export const convertToReact = (markup: string): string =>
  markup
    // remove quotes from object values but add double brackets and camelCase
    .replace(/\s(\S+)="({.*?})"/g, (m, $key, $value) => {
      return ` ${camelCase($key)}={${$value}}`;
    })
    // transform all standard attributes to camel case
    .replace(/\s(\S+)="(.*?)"/g, (m, $key, $value) => {
      return ` ${camelCase($key)}="${$value}"`;
    })
    // transform class attribute to JSX compatible one
    .replace(/\sclass="(.*?)"/g, ' className="$1"')
    // transform to camelCase event binding syntax
    .replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
      return ` on${pascalCase($key)}={() => { ${$value} }}`;
    })
    // transform boolean and number
    .replace(/\s(\S+)="(true|false|-?\d*)"/g, ' $1={$2}')
    // transform custom element tags to pascal case
    .replace(/<(\/?)(p-[\w-]+)(.*?)>/g, (m, $slash, $tag, $attributes) => {
      return `<${$slash}${pascalCase($tag)}${$attributes}>`;
    })
    // add closing slash to inputs for valid jsx
    .replace(/(<input(?:.[^/]*?))>/g, '$1 />')
    // transform to self closing tags
    .replace(/(<([A-Za-z]+).*?)(><\/\2)>/g, '$1 />')
    // transform style attributes
    .replace(/style="(.*?)"/g, (m, $style: string) => {
      $style = $style
        .replace(/;/g, ',') // transform semi colons to comma
        .replace(/,$/g, ''); // remove last comma

      const pairs = $style.split(',').map((p) => {
        const [prop, val] = p.split(':');
        return `${camelCase(prop)}: '${val.trim()}'`;
      });

      return `style={{ ${pairs.join(', ')} }}`;
    });

export const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
