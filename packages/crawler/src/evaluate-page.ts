import { type Locator, type Page } from '@playwright/test';
import { TagName } from '@porsche-design-system/shared';
import { ConsumedTagNamesForVersionsAndPrefixes, Properties, TagNameData } from './types';
import { getPdsTagNamesWithPropertyNames } from './helpers/convert-data-helper';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    porscheDesignSystem: {
      [key: `${number}.${number}.${number}`]: {
        prefixes: string[];
        isReady: () => Promise<void>;
        readyResolve: () => void;
      };
      cdn: {
        url: string;
        prefixes: string[]; // to not break older versions
      };
    };
  }
}

const pdsTagNamesWithPropertyNames = getPdsTagNamesWithPropertyNames();

const getPdsComponentNameByPrefix = async (locator: Locator, prefix: string): Promise<TagName | null> => {
  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  const tagNames = Object.keys(pdsTagNamesWithPropertyNames);

  return (tagNames.find((compName) => (prefix ? `${prefix}-${compName}` : compName) === tagName) as TagName) || null;
};

const getHighestLevelChildrenOrTextContent = (locator: Locator): Promise<string | null> =>
  locator.evaluate(
    (el) =>
      Array.from(el.children).reduce((result, child) => {
        if (child.children.length) {
          const copy = child.cloneNode(true) as Element;

          // we save only the highest dom level in the reports, in order not to make them too big
          copy.innerHTML = '(the content was stripped)';

          return result + copy.outerHTML;
        }

        return result + child.outerHTML;
      }, '' as string) || el.textContent
  );

const getHostPdsComponent = async (locator: Locator, prefix: string): Promise<TagName | null> => {
  const rootNode = await locator.evaluate((el) => (el.getRootNode() as ShadowRoot).host);

  if (rootNode) {
    return getPdsComponentNameByPrefix(locator, prefix);
  } else {
    return null;
  }
};

const getAllConsumedProperties = <
  PComponentName extends keyof HTMLElementTagNameMap,
  PComponentElement extends HTMLElementTagNameMap[PComponentName],
  PComponentPropertyName extends keyof PComponentElement,
  PComponentPropertyValue extends keyof PComponentElement[PComponentPropertyName],
>(
  locator: Locator,
  allPdsPropertiesForComponentName: string[]
): Promise<Properties> => {
  // we consider this element as PDS Component, therefore we need this alias here
  return locator.evaluate((el, allPdsPropertiesForComponentName) => {
    const pEl = el as PComponentElement;

    return allPdsPropertiesForComponentName.reduce((result, propName) => {
      const propValue = pEl[propName as PComponentPropertyName] as PComponentPropertyValue;

      let parsedVal = propValue;

      if (typeof propValue === 'string') {
        try {
          // jsonStr is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "123"
          parsedVal = JSON.parse(
            propValue
              .replace(/'/g, '"') // convert single quotes to double quotes
              .replace(/[\s"]?([a-z\-]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
          );
        } catch {
          // jsonStr is string, e.g. "block" or "inline"
        }
      } else {
        // jsonStr is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
      }

      return {
        ...result,
        // check if it's an object and stringify
        [propName]:
          typeof parsedVal === 'object'
            ? (JSON.stringify(parsedVal) as PComponentPropertyValue)
            : (parsedVal as PComponentPropertyValue),
      };
    }, {});
  }, allPdsPropertiesForComponentName);
};

const getConsumedTagNamesForPrefix = async (prefix: string, pdsElements: Locator[]): Promise<TagNameData[]> => {
  const tagNameDatas: TagNameData[] = [];

  for (const pdsElement of pdsElements) {
    const componentName = await getPdsComponentNameByPrefix(pdsElement, prefix);

    if (!componentName) {
      throw new Error('Could not find component name');
    }

    const slotInfo = await getHighestLevelChildrenOrTextContent(pdsElement);
    const hostPdsComponent = await getHostPdsComponent(pdsElement, prefix);

    // TODO: Check if that is correct because it was not needed before
    if (!hostPdsComponent) {
      continue;
    }

    tagNameDatas.push({
      [componentName]: {
        properties: await getAllConsumedProperties(pdsElement, pdsTagNamesWithPropertyNames[componentName]),
        children: slotInfo ? slotInfo : null,
        hostPdsComponent: hostPdsComponent ? hostPdsComponent : null,
      },
    } as TagNameData);
  }

  return tagNameDatas;
};

// get all dom elements from body
const getAllPdsElementsForPrefix = async (allDOMElements: Locator[], prefix: string): Promise<Locator[]> => {
  const tagNames = Object.keys(pdsTagNamesWithPropertyNames);
  const selector = (prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames).join();
  const matches = [];

  for (const domElement of allDOMElements) {
    const result = await domElement.evaluate((el, selector) => el.matches(selector), selector);

    if (result) {
      matches.push(domElement);
    }
  }

  return matches;
};

export const evaluatePage = async (page: Page): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
  const allDOMElements = await page.locator('body *').all();

  const pdsConfig = await page.evaluate(async (): Promise<typeof document.porscheDesignSystem> => {
    if (!document.porscheDesignSystem) {
      throw new Error('document.porscheDesignSystem is undefined');
    }

    return document.porscheDesignSystem;
  });

  return await Object.entries(pdsConfig).reduce(async (result, [key, { prefixes }]) => {
    if (key === 'cdn') {
      return result;
    }

    return {
      ...(await result),
      [key]: await prefixes.reduce(
        async (result, prefix: string) => ({
          ...(await result),
          [prefix]: await getConsumedTagNamesForPrefix(
            prefix,
            await getAllPdsElementsForPrefix(allDOMElements, prefix)
          ),
        }),
        Promise.resolve({})
      ),
    };
  }, Promise.resolve({}));
};
