import * as puppeteer from 'puppeteer';
import { TagNamesWithProperties } from './helper';
import { TagName } from 'shared/src';
import { ConsumedTagNamesForVersionsAndPrefixes, TagNameWithProperties } from './data-aggregator';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [version: string]: { prefixes: string[] } };
  }
}

export const crawlComponents = async (
  page: puppeteer.Page,
  tagNamesWithProperties: TagNamesWithProperties
): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
  const pdsCrawlerReport = await page.evaluate(
    async ({ tagNamesWithProperties }): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
      const tagNames = Object.keys(tagNamesWithProperties);
      const consumedPrefixesForVersions: { [key: string]: string[] } = Object.entries(
        document.porscheDesignSystem
      ).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: value.prefixes,
        }),
        {}
      );

      const getComponentNameByPrefix = (el: Element, prefix: string): TagName | null => {
        const tagName = el.tagName.toLowerCase();
        return (
          (Object.keys(tagNamesWithProperties).find(
            (compName) => (prefix ? `${prefix}-${compName}` : compName) === tagName
          ) as TagName) || null
        );
      };

      const getPdsComponentsSelector = (prefix: string): string =>
        (prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames).join();

      const getAllChildElements = (el: Element): Element[] => {
        const children = Array.from(el.children)
          .concat(Array.from(el.shadowRoot?.children || []))
          .flat() as Element[];
        return children.concat(children.map(getAllChildElements).flat());
      };

      // crawl all dom elements from body
      const allDOMElements = getAllChildElements(document.querySelector('body') as Element);
      const querySelectorAllDeep = (pdsComponentsSelector: string): Element[] =>
        allDOMElements.filter((el: Element) => el.matches(pdsComponentsSelector));

      const getSlotInfo = (el: Element): string | null =>
        el.shadowRoot
          ?.querySelector('slot')
          ?.assignedElements()
          ?.reduce((result, slotEl) => {
            if (slotEl.children.length) {
              const copy = slotEl.cloneNode(true) as Element;
              // we save only the highest dom level in the reports, in order not to make them too big
              copy.innerHTML = '...';
              return result + copy.outerHTML;
            }
            return result + slotEl.outerHTML;
          }, '' as string) || null;

      const getHostPdsComponent = (el: Element, prefix: string): TagName | null => {
        const rootNode = (el.getRootNode() as ShadowRoot).host;
        if (rootNode) {
          return getComponentNameByPrefix(rootNode, prefix);
        }
        return null;
      };

      const getAllConsumedProperties = <
        PComponentName extends keyof HTMLElementTagNameMap,
        PComponentElement extends HTMLElementTagNameMap[PComponentName],
        PComponentPropertyName extends keyof PComponentElement,
        PComponentPropertyValue extends keyof PComponentElement[PComponentPropertyName]
      >(
        el: Element,
        allPdsPropertiesForComponentName: string[]
      ) => {
        const pEl = el as PComponentElement;

        // currently we have a circular object, for login.porsche.com, 'p-select-wrapper-dropdown'.selectRef
        // therefore we need to stringify it explicitly, with checking circular dependencies (if there are any)
        // TODO: discuss with team if there's a better solution
        const stringifyCircular = (obj: PComponentPropertyValue): string | PComponentPropertyValue => {
          try {
            JSON.stringify(obj);
            return obj;
          } catch (e) {
            // if there are circular dependencies - stringify object differently
            return Object.prototype.toString.call(obj);
          }
        };

        const checkCircularIfObject = (val: PComponentPropertyValue): PComponentPropertyValue | string => {
          // check if it's an object and stringify circular
          return typeof val === 'object' && !Array.isArray(val) && val !== null ? stringifyCircular(val) : val;
        };

        return allPdsPropertiesForComponentName.reduce((result, propName) => {
          const propValue = pEl[propName as PComponentPropertyName] as PComponentPropertyValue;
          return {
            ...result,
            [propName]: checkCircularIfObject(propValue),
          };
        }, {});
      };

      const getConsumedTagNames = (prefix: string, pdsElements: Element[]): TagNameWithProperties[] => {
        return pdsElements.map((el) => {
          const componentName = getComponentNameByPrefix(el, prefix);

          if (!componentName) {
            throw new Error('Could not find component name');
          }

          const slotInfo = getSlotInfo(el);
          const hostPdsComponent = getHostPdsComponent(el, prefix);

          return {
            [componentName]: {
              ...{
                properties: getAllConsumedProperties(el, tagNamesWithProperties[componentName]),
              },
              ...(slotInfo ? { slot: slotInfo } : {}),
              ...(hostPdsComponent ? { hostPdsComponent: hostPdsComponent } : {}),
            },
          } as TagNameWithProperties;
        });
      };

      return Object.entries(consumedPrefixesForVersions).reduce((result, [version, prefixes]) => {
        const consumedTagNamesForPrefixes = prefixes.reduce((result, prefix: string) => {
          const consumedTagNames = getConsumedTagNames(
            prefix,
            Array.from(querySelectorAllDeep(getPdsComponentsSelector(prefix)))
          );

          return {
            ...result,
            [prefix]: consumedTagNames,
          };
        }, {});

        return {
          ...result,
          [version]: consumedTagNamesForPrefixes,
        };
      }, {});
    },
    { tagNamesWithProperties }
  );

  return pdsCrawlerReport;
};
