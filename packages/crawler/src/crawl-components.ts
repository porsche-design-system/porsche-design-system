import * as puppeteer from 'puppeteer';
import { TagNamesWithProperties } from './helper';
import { TagName } from 'shared/src';
import { ConsumedTagNamesForVersionsAndPrefixes } from './data-aggregator';

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

      const getConsumedTagNames = (
        prefix: string,
        pdsElements: Element[]
      ): { [p: string]: { [p: string]: unknown } }[] =>
        pdsElements.map((el) => {
          const tagName = el.tagName.toLowerCase();
          const componentName = Object.keys(tagNamesWithProperties).find(
            (compName) => (prefix ? `${prefix}-${compName}` : compName) === tagName
          ) as TagName;

          if (!componentName) {
            throw new Error('Can not find component name');
          }

          const allPdsPropertiesForTagName = tagNamesWithProperties[componentName];

          const allAppliedProperties = Object.assign(
            {},
            ...Array.from(el.attributes, ({ name, value }) => {
              return { [name]: value };
            })
          );

          const consumedPdsProperties = Object.fromEntries(
            Object.entries(allAppliedProperties).filter(([key]) => allPdsPropertiesForTagName.includes(key))
          );

          return { [componentName]: consumedPdsProperties };
        });

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
