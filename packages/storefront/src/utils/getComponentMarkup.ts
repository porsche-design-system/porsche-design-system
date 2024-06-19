import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact, patchThemeIntoMarkup } from '@/utils/index';
import { convertToVue } from '@/utils/convertToVue';
import type { ComponentSlots } from '@/utils/componentSlots';
import type { ComponentProps } from '@/utils/componentProps';
import { pascalCase } from 'change-case';

// TODO: Use shared type
type Framework = 'angular' | 'react' | 'vue' | 'vanilla-js';
type FrameworkMarkup = {
  [key in Framework]: string;
};

export const getComponentExampleMarkup = (
  component: TagName,
  codeSamples: FrameworkMarkup,
  props: ComponentProps,
  slots: ComponentSlots
): FrameworkMarkup => {
  const markup = getComponentMarkup(component, props, slots);

  const pascalCaseComponent = pascalCase(component);
  const componentRegex = new RegExp(`(^\\s*)<${component}[\\S\\s]*</${component}>`, 'm');
  const componentRegexPascalCase = new RegExp(`(^\\s*)<${pascalCaseComponent}[\\S\\s]*</${pascalCaseComponent}>`, 'm');

  const replaceWithIndentation = (code: string, regex: RegExp, replacement: string) => {
    return code.replace(regex, (match, p1) => {
      const lines = replacement.trim().split('\n');
      return [
        p1 + lines[0], // Preserve indentation for the first line
        ...lines.slice(1).map((line) => p1 + line), // Apply indentation for subsequent lines
      ].join('\n');
    });
  };

  const componentExampleMarkup: FrameworkMarkup = {
    'vanilla-js': codeSamples['vanilla-js']?.replace(componentRegex, markup),
    react: replaceWithIndentation(codeSamples['react'], componentRegexPascalCase, convertToReact(markup)),
    angular: replaceWithIndentation(codeSamples['angular'], componentRegex, convertToAngular(markup)),
    vue: replaceWithIndentation(codeSamples['vue'], componentRegexPascalCase, convertToVue(markup)),
  };

  // Patch theme into markup if theme is set
  if (props['theme'].selectedValue) {
    (Object.keys(componentExampleMarkup) as Framework[]).forEach((key) => {
      componentExampleMarkup[key] = patchThemeIntoMarkup(componentExampleMarkup[key], props['theme'].selectedValue);
    });
  }

  return componentExampleMarkup;
};

// function extractSlots(markup: string) {
//   const regex = /(<[^\/][\S\s]*?slot="([a-zA-Z-]+)"[\S\s]*?<\/.*?>)/g;
//   const slots = {};
//   let match;
//
//   while ((match = regex.exec(markup)) !== null) {
//     const [fullMatch, , slotName] = match;
//     slots[slotName] = fullMatch;
//   }
//
//   return slots;
// }

export const getComponentMarkup = <T extends TagName>(component: T, props: ComponentProps, slots: ComponentSlots) => {
  return `<${component}${getHTMLAttributes(props)}>
  ${slots
    .filter((s) => s.isShown)
    .map((slot) => slot.markup)
    .join('\n  ')}
</${component}>`;
};

/**
 * Get HTML attributes string from an object of properties.
 * @param props - The object containing the properties.
 * @returns The HTML attributes string.
 */
const getHTMLAttributes = (props: ComponentProps): string => {
  const attributes = Object.entries(props)
    .filter(([, prop]) => prop.selectedValue && prop.selectedValue !== prop.defaultValue && prop.type !== 'Theme')
    .map(([prop, { selectedValue }]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue =
        typeof selectedValue === 'object' ? JSON.stringify(selectedValue).replace(/"/g, "'") : selectedValue;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
  return attributes ? ' ' + attributes : '';
};
