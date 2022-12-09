import * as puppeteer from 'puppeteer';
import { TagNamesWithProperties } from './helper';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

// TODO: define correct return type
export const crawlComponents = async (
  page: puppeteer.Page,
  tagNamesWithProperties: TagNamesWithProperties
): Promise<any> => {
  const pdsCrawlerReport = await page.evaluate(
    // TODO: define correct return type
    async ({ tagNamesWithProperties }): Promise<any> => {
      const tagNames = Object.keys(tagNamesWithProperties);
      const porscheDesignSystem = document.porscheDesignSystem;
      const consumedPdsVersions = Object.keys(porscheDesignSystem);
      const consumedPrefixesForVersions: { [key: string]: string[] } = Object.entries(porscheDesignSystem).reduce(
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
          const allPdsPropertiesForTagName = Object.entries(tagNamesWithProperties).reduce((result, [key, value]) => {
            return (prefix ? `${prefix}-${key}` : key) === tagName ? value : result;
          }, [] as string[]);

          const allAppliedProperties = Object.assign(
            {},
            ...Array.from(el.attributes, ({ name, value }) => {
              return { [name]: value };
            })
          );

          const consumedPdsProperties = Object.fromEntries(
            Object.entries(allAppliedProperties).filter(([key]) => allPdsPropertiesForTagName.includes(key))
          );

          return { [tagName]: consumedPdsProperties };
        });

      const consumedTagNamesForVersions: { [key: string]: string[] } = Object.entries(
        consumedPrefixesForVersions
      ).reduce((result, [version, prefixes]) => {
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

      // TODO: get and count the tag names with prefixes - and also without prefixes?

      return {
        consumedPdsVersions,
        consumedPrefixesForVersions,
        consumedTagNamesForVersions,
      };
    },
    { tagNamesWithProperties }
  );

  return pdsCrawlerReport;
};
