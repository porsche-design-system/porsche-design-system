import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact, patchThemeIntoMarkup } from '@/utils/index';
import { convertToVue } from '@/utils/convertToVue';
import type { ComponentSlots } from '@/utils/componentSlots';
import type { ComponentProps } from '@/utils/componentProps';
import { pascalCase } from 'change-case';
import { adjustReactMarkup } from '@/utils/configurator/adjustReactMarkup';

// TODO: Use shared type
type Framework = 'angular' | 'react' | 'vue' | 'vanilla-js';
type FrameworkMarkup = {
  [key in Framework]: string;
};

export const getComponentExampleMarkup = (
  component: TagName,
  props: ComponentProps,
  slots: ComponentSlots,
  codeSamples: FrameworkMarkup
): FrameworkMarkup => {
  const markup = getComponentMarkup(component, props, slots);

  const pascalCaseComponent = pascalCase(component);
  const componentRegex = new RegExp(`(^\\s*)<${component}[\\S\\s]*</${component}>`, 'm');
  const componentRegexPascalCase = new RegExp(`(^\\s*)<${pascalCaseComponent}[\\S\\s]*</${pascalCaseComponent}>`, 'm');

  const componentExampleMarkup: FrameworkMarkup = {
    'vanilla-js': codeSamples ? replaceWithIndentation(codeSamples['vanilla-js'], componentRegex, markup) : markup,
    react: adjustReactMarkup(pascalCaseComponent, codeSamples['react'], props, slots),
    angular: codeSamples
      ? replaceWithIndentation(codeSamples['angular'], componentRegex, convertToAngular(markup))
      : convertToAngular(markup),
    vue: codeSamples
      ? replaceWithIndentation(codeSamples['vue'], componentRegexPascalCase, convertToVue(markup))
      : convertToVue(markup),
  };

  // Patch theme into markup if theme is set
  if (props['theme'] && props['theme'].selectedValue) {
    (Object.keys(componentExampleMarkup) as Framework[]).forEach((key) => {
      componentExampleMarkup[key] = patchThemeIntoMarkup(componentExampleMarkup[key], props['theme'].selectedValue);
    });
  }

  return componentExampleMarkup;
};

export const replaceWithIndentation = (code: string, regex: RegExp, replacement: string) => {
  return code.replace(regex, (match, p1) => {
    const lines = replacement.trim().split('\n');
    return [
      ...lines.map((line) => (p1 !== '\n' ? p1 + line : line)), // Apply indentation for subsequent lines
    ].join('\n');
  });
};

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
 *
 * Only selectedValues which are not equal to the defaultValue will be returned.
 * Prop of type 'Theme' will be excluded.
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
