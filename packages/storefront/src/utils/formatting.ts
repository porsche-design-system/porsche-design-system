import { camelCase, pascalCase } from 'change-case';
import { Theme } from '@/models';

export const cleanMarkup = (markup: string): string =>
  markup
    // replace <br> tags with new line
    .replace(/<br[\s/]*>/g, '\n')
    // remove multiple new lines
    .replace(/\n{3,}/g, '\n\n');

export const patchThemeIntoMarkup = (markup: string, theme: Theme): string =>
  theme === 'dark'
    ? markup
        // add dark theme attribute
        .replace(/(<p-[\w-]+)/g, '$1 theme="dark"')
    : markup;

export const convertToAngular = (markup: string): string =>
  markup
    // mark aria attributes with % to preserve from conversion
    .replace(/\s(aria-\S+)=(".*?")/g, ' $1%=$2')
    // transform to event binding syntax
    .replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
      return ` (${$key})="${$value}"`;
    })
    // transform all keys of object values to camel case and surround them in brackets
    .replace(/\s(\S+)="{(.*?)}"/g, (m, $key, $value) => {
      return ` [${camelCase($key)}]="{${$value}}"`;
    })
    // transform all other keys to camel case, surround them in brackets and surround all values with single quotes
    .replace(/\s(\S*[a-z-]+)="(\D\w.*?)"/g, (m, $key, $value) => {
      return ` [${camelCase($key)}]="'${$value}'"`;
    })
    // transform all keys to camel case which have digits as a value
    .replace(/\s(\S*[a-z-]+)="(\d.*?)"/g, (m, $key, $value) => {
      return ` [${camelCase($key)}]="${$value}"`;
    })
    //surround numeric name values with single quotes
    .replace(/\s(\[name\])="(\d+)"/g, ` $1="'$2'"`)
    // remove single quotes from boolean values
    .replace(/\s(\[\S+\])="'(true|false)'"/g, ' $1="$2"')
    // remove brackets from "class" and "slot("|slot) attributes
    .replace(/\s\[(class|slot)]="'(.*?)'"/g, ' $1="$2"')
    //remove preserve marker
    .replace(/%=/g, '=');

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
    .replace(/\s(\S+)="(true|false|\d)"/g, ' $1={$2}')
    // // transform all keys to camel case which have digits as a value
    // .replace(/\s(\S+)={"(\d.*?)"}/g, ' $1={$2}')
    // transform custom element tags to pascal case
    .replace(/<(\/?)(p-[\w-]+)(.*?)>/g, (m, $slash, $tag, $attributes) => {
      return `<${$slash}${pascalCase($tag)}${$attributes}>`;
    })
    // add closing slash to inputs for valid jsx
    .replace(/(<input(?:.[^/]*?))>/g, '$1 />')
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
