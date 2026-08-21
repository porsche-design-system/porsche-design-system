import type { Framework } from '../../shared/skillTree';
import type { DeprecationEntry } from './types';

/**
 * Turns an index entry into the literal spellings an audit greps for in one framework's source.
 *
 * This is the only genuinely framework-shaped part of the whole audit, and it is where a silent
 * under-report would come from: each framework has both a static and a bound form for the same prop,
 * and templates spell attributes differently from JSX. Missing one form does not fail — it just finds
 * less, which reads as a cleaner codebase.
 *
 * Deliberately over-inclusive. A spelling is a *candidate* filter; the audit still has to anchor the
 * match to PDS-originated usage and resolve the value before it becomes a finding, so a spelling that
 * matches too much costs a check while one that matches too little costs a finding.
 */

/** `headingTag` → `heading-tag`. Templates spell props kebab-cased; JSX spells them camel-cased. */
const kebabCase = (value: string): string => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** `p-input-text` → `PInputText`. The React/Vue component identifier for a tag. */
const pascalCase = (tag: string): string =>
  tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

/** `update` → `onUpdate`. React surfaces events as handler props. */
const handlerProp = (event: string): string => `on${event.charAt(0).toUpperCase()}${event.slice(1)}`;

const componentSpellings = (tag: string, framework: Framework): string[] => {
  const pascal = pascalCase(tag);
  switch (framework) {
    case 'react':
      return [`<${pascal}`, `${pascal},`, `${pascal} }`];
    // Vue accepts both spellings for the same import, so an audit that checks only the PascalCase
    // form misses every project that writes templates in kebab-case.
    case 'vue':
      return [`<${pascal}`, `<${tag}`];
    default:
      return [`<${tag}`];
  }
};

const propSpellings = (prop: string, framework: Framework): string[] => {
  const kebab = kebabCase(prop);
  switch (framework) {
    case 'react':
      return [`${prop}=`];
    case 'angular':
      return [`${kebab}=`, `[${kebab}]=`, `[${prop}]=`];
    case 'vue':
      return [`${kebab}=`, `:${kebab}=`, `:${prop}=`, `v-bind:${kebab}=`];
    default:
      return [`${kebab}=`];
  }
};

const eventSpellings = (event: string, framework: Framework): string[] => {
  const kebab = kebabCase(event);
  switch (framework) {
    case 'react':
      return [`${handlerProp(event)}=`];
    case 'angular':
      return [`(${event})=`, `(${kebab})=`];
    case 'vue':
      return [`@${event}=`, `@${kebab}=`, `v-on:${event}=`];
    default:
      return [`addEventListener('${event}'`, `addEventListener("${event}"`];
  }
};

/**
 * A deprecated prop *value* — the one entry kind that is not statically guaranteed to be present.
 *
 * Both the plain form (`size="small"`) and the breakpoint-object forms are emitted, because a
 * responsive usage nests the value inside a structure and an equality check against the whole
 * attribute value matches none of them:
 *
 * - `size="{'base': 'small', 'l': 'medium'}"` — string attribute holding single-quoted pseudo-JSON
 * - `size={{'base': 'small'}}` — JSX expression
 *
 * The bare quoted value is included last as the catch-all for both, since it is what actually appears
 * inside either object.
 */
const valueSpellings = (prop: string, value: string, framework: Framework): string[] => {
  const kebab = kebabCase(prop);
  const attribute = framework === 'react' ? prop : kebab;
  return [`${attribute}="${value}"`, `${attribute}={'${value}'}`, `'${value}'`, `"${value}"`];
};

/** Every literal spelling of `entry` in `framework`, de-duplicated and stable. */
export const spellings = (entry: DeprecationEntry, framework: Framework): string[] => {
  const raw = ((): string[] => {
    switch (entry.kind) {
      case 'component':
        return componentSpellings(entry.identifier, framework);
      case 'prop':
        return propSpellings(entry.identifier, framework);
      case 'value':
        return valueSpellings(entry.prop ?? '', entry.identifier, framework);
      case 'event':
        return eventSpellings(entry.identifier, framework);
      // A slot is targeted by the `slot` attribute in every framework; the default slot has no name
      // and so has no spelling of its own — its deprecation is reported against the component.
      case 'slot':
        return entry.identifier === '' ? [] : [`slot="${entry.identifier}"`, `slot='${entry.identifier}'`];
      // CSS variables and style-package identifiers are written the same way everywhere.
      default:
        return [entry.identifier];
    }
  })();
  return [...new Set(raw)];
};
