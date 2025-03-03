import type { StorefrontTheme } from '@/models/theme';
import type { ElementConfig, HTMLElementOrComponentProps, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Recursively applies a specified property to the properties of multiple ElementConfigs.
 *
 * @template T - The key of the property to apply.
 * @param {Array<string | ElementConfig<HTMLTagOrComponent> | undefined>} elements - The elements to process.
 * @param {T} propertyKey - The property key to apply.
 * @param {HTMLElementOrComponentProps<HTMLTagOrComponent>[T]} propertyValue - The value of the property to apply.
 * @param {boolean} [onlyPdsComponents=true] - Whether to apply the property only to PDS components (tags starting with 'p-').
 * @param {boolean} [overrideExisting=false] - Whether to override the value if the property already exists on the element.
 * @returns {Array<string | ElementConfig<HTMLTagOrComponent> | undefined>} - The modified elements with the applied property.
 */
export const applyPropertyRecursively = <
  T extends keyof (HTMLElementOrComponentProps<HTMLTagOrComponent> & { theme: StorefrontTheme }),
>(
  elements: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  propertyKey: T,
  propertyValue: (HTMLElementOrComponentProps<HTMLTagOrComponent> & { theme: StorefrontTheme })[T],
  onlyPdsComponents: boolean = true,
  overrideExisting: boolean = false
): typeof elements => {
  return elements.map((element) => {
    if (typeof element === 'object' && element !== null && (!onlyPdsComponents || element.tag.startsWith('p-'))) {
      return {
        ...element,
        properties: {
          ...element.properties,
          ...(overrideExisting || (element.properties as any)?.[propertyKey] === undefined
            ? { [propertyKey]: propertyValue }
            : {}),
        },
        children: element.children
          ? applyPropertyRecursively(element.children, propertyKey, propertyValue, onlyPdsComponents)
          : undefined,
      };
    }
    return element;
  });
};
