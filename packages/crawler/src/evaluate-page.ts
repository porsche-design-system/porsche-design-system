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

const getPdsComponentName = async (locator: Locator, prefix: string): Promise<TagName | null> => {
  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  const tagNames = Object.keys(pdsTagNamesWithPropertyNames);
  const match = tagNames.find((compName) => {
    const prefixedTagName = prefix !== '' ? `${prefix}-${compName}` : compName;

    return prefixedTagName === tagName;
  }) as TagName;

  return match || null;
};

const getHighestLevelChildrenOrTextContent = (locator: Locator): Promise<string | null> =>
  locator.evaluate((el) => {
    let content = '';

    for (const child of Array.from(el.children)) {
      if (child.children.length) {
        const copy = child.cloneNode(true) as Element;

        // we save only the highest dom level in the reports, in order not to make them too big
        copy.innerHTML = '(the content was stripped)';

        content += copy.outerHTML;
      }

      content += child.outerHTML;
    }

    return content || el.textContent;
  });

const getHostPdsComponent = async (locator: Locator, prefix: string): Promise<TagName | null> => {
  const rootNode = await locator.evaluate((el) => (el.getRootNode() as ShadowRoot).host);

  if (rootNode) {
    return getPdsComponentName(locator, prefix);
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
  // WARNING: Cannot pull out complexity in functions here because it's executed inside evaluate (browser context)
  return locator.evaluate((pComponentElement: PComponentElement, allPdsPropertiesForComponentName) => {
    let properties = {};

    for (const propName of allPdsPropertiesForComponentName) {
      let propValue = pComponentElement[propName as PComponentPropertyName] as PComponentPropertyValue;

      if (typeof propValue === 'string') {
        try {
          // jsonStr is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "123"
          propValue = JSON.parse(
            propValue
              .replace(/'/g, '"') // convert single quotes to double quotes
              .replace(/[\s"]?([a-z\-]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
          );
        } catch {
          // jsonStr is string, e.g. "block" or "inline", do nothing
        }
      }

      // check if it's an object and stringify
      if (typeof propValue === 'object') {
        propValue = JSON.stringify(propValue) as PComponentPropertyValue;
      }

      properties = {
        ...properties,
        [propName]: propValue,
      };
    }

    return properties;
  }, allPdsPropertiesForComponentName);
};

const getConsumedTagNames = async (prefix: string, pdsElements: Locator[]): Promise<TagNameData[]> => {
  const tagNameData: TagNameData[] = [];

  for (const pdsElement of pdsElements) {
    const componentName = await getPdsComponentName(pdsElement, prefix);

    if (!componentName) {
      continue;
    }

    const slotInfo = await getHighestLevelChildrenOrTextContent(pdsElement);
    const hostPdsComponent = await getHostPdsComponent(pdsElement, prefix);

    tagNameData.push({
      [componentName]: {
        properties: await getAllConsumedProperties(pdsElement, pdsTagNamesWithPropertyNames[componentName]),
        children: slotInfo ? slotInfo : null,
        hostPdsComponent: hostPdsComponent ? hostPdsComponent : null,
      },
    } as TagNameData);
  }

  return tagNameData;
};

const getAllPdsElements = async (allDOMElements: Locator[], prefix: string): Promise<Locator[]> => {
  const tagNames = Object.keys(pdsTagNamesWithPropertyNames);
  const selector = (prefix !== '' ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames).join();
  const pdsElements: Locator[] = [];

  for (const domElement of allDOMElements) {
    const selectorMatch = await domElement.evaluate((el, selector) => el.matches(selector), selector);

    if (selectorMatch) {
      pdsElements.push(domElement);
    }
  }

  return pdsElements;
};

export const evaluatePage = async (page: Page): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
  const allDOMElements = await page.locator('body *').all();

  const pdsConfig = await page.evaluate(async (): Promise<typeof document.porscheDesignSystem> => {
    if (!document.porscheDesignSystem) {
      throw new Error('document.porscheDesignSystem is undefined');
    }

    return document.porscheDesignSystem;
  });

  let consumedTagNamesPerVersion: ConsumedTagNamesForVersionsAndPrefixes = {};

  for (const [key, { prefixes }] of Object.entries(pdsConfig)) {
    if (key === 'cdn') {
      continue;
    }

    let consumedTagNames = {};

    for (let prefix of prefixes) {
      const allPdsElementsForPrefix = await getAllPdsElements(allDOMElements, prefix);

      consumedTagNames = {
        ...consumedTagNames,
        [prefix]: await getConsumedTagNames(prefix, allPdsElementsForPrefix),
      };
    }

    consumedTagNamesPerVersion = {
      ...consumedTagNamesPerVersion,
      [key]: consumedTagNames,
    };
  }

  return consumedTagNamesPerVersion;
};
