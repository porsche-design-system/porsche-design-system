import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact, patchThemeIntoMarkup } from '@/utils/index';
import { convertToVue } from '@/utils/convertToVue';
import type { ComponentSlots } from '@/utils/componentSlots';
import type { ComponentProps } from '@/utils/componentProps';
import { pascalCase } from 'change-case';

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
  const componentRegex = new RegExp(`<${component}[\\S\\s]*</${component}>`);
  const componentRegexPascalCase = new RegExp(`<${pascalCaseComponent}[\\S\\s]*</${pascalCaseComponent}>`);

  const componentExampleMarkup: FrameworkMarkup = {
    'vanilla-js': codeSamples['vanilla-js']?.replace(componentRegex, markup),
    react: codeSamples['react']?.replace(componentRegexPascalCase, convertToReact(markup)),
    angular: codeSamples['angular']?.replace(componentRegex, convertToAngular(markup)),
    vue: codeSamples['vue']?.replace(componentRegexPascalCase, convertToVue(markup)),
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
    .filter(([, prop]) => prop.selectedValue !== undefined)
    .map(([prop, { selectedValue }]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue =
        typeof selectedValue === 'object' ? JSON.stringify(selectedValue).replace(/"/g, "'") : selectedValue;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
  return attributes ? ' ' + attributes : '';
};
