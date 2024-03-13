import { type Page } from '@playwright/test';
import { TagName } from '@porsche-design-system/shared';
import {
  ConsumedTagNamesForVersionsAndPrefixes,
  Properties,
  TagNameData,
  type TagNamesWithPropertyNames,
} from './types';
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

const getConsumedTagNamesForPrefix = async (
  pdsTagNamesWithPropertyNames: TagNamesWithPropertyNames,
  JSON: JSON,
  prefix: string,
  pdsElements: Element[]
): Promise<TagNameData[]> => {
  return pdsElements.map((el) => {
    const getPdsComponentNameByPrefix = (el: Element, prefix: string): TagName | null => {
      const tagName = el.tagName.toLowerCase();
      const tagNames = Object.keys(pdsTagNamesWithPropertyNames);

      return (
        (tagNames.find((compName) => (prefix ? `${prefix}-${compName}` : compName) === tagName) as TagName) || null
      );
    };
    const parseIfJSON = (JSON: JSON, jsonStr: string | number | symbol): object | string | number | symbol => {
      if (typeof jsonStr === 'string') {
        try {
          // jsonStr is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "123"
          return JSON.parse(
            jsonStr
              .replace(/'/g, '"') // convert single quotes to double quotes
              .replace(/[\s"]?([a-z\-]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
          );
        } catch {
          // jsonStr is string, e.g. "block" or "inline"
          return jsonStr;
        }
      } else {
        // jsonStr is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
        return jsonStr;
      }
    };
    const componentName = getPdsComponentNameByPrefix(el, prefix);
    const getHighestLevelChildrenOrTextContent = (el: Element): string | null =>
      Array.from(el.children).reduce((result, child) => {
        if (child.children.length) {
          const copy = child.cloneNode(true) as Element;
          // we save only the highest dom level in the reports, in order not to make them too big
          copy.innerHTML = '(the content was stripped)';
          return result + copy.outerHTML;
        }
        return result + child.outerHTML;
      }, '' as string) || el.textContent;

    const getHostPdsComponent = (el: Element, prefix: string): TagName | null => {
      const rootNode = (el.getRootNode() as ShadowRoot).host;
      if (rootNode) {
        return getPdsComponentNameByPrefix(rootNode, prefix);
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
      JSON: JSON,
      el: Element,
      allPdsPropertiesForComponentName: string[]
    ): Properties => {
      // we consider this element as PDS Component, therefore we need this alias here
      const pEl = el as PComponentElement;

      const stringifyIfObject = (val: PComponentPropertyValue): PComponentPropertyValue => {
        const parsedVal = parseIfJSON(JSON, val);
        // check if it's an object and stringify
        return typeof parsedVal === 'object'
          ? (JSON.stringify(parsedVal) as PComponentPropertyValue)
          : (parsedVal as PComponentPropertyValue);
      };

      return allPdsPropertiesForComponentName.reduce((result, propName) => {
        const propValue = pEl[propName as PComponentPropertyName] as PComponentPropertyValue;
        return {
          ...result,
          [propName]: stringifyIfObject(propValue),
        };
      }, {});
    };

    if (!componentName) {
      throw new Error('Could not find component name');
    }

    const slotInfo = getHighestLevelChildrenOrTextContent(el);
    const hostPdsComponent = getHostPdsComponent(el, prefix);

    return {
      [componentName]: {
        properties: getAllConsumedProperties(JSON, el, pdsTagNamesWithPropertyNames[componentName]),
        children: slotInfo ? slotInfo : null,
        hostPdsComponent: hostPdsComponent ? hostPdsComponent : null,
      },
    } as TagNameData;
  });
};

// get all dom elements from body
const getAllPdsElementsForPrefix = async (
  pdsTagNamesWithPropertyNames: TagNamesWithPropertyNames,
  allDOMElements: Element[],
  prefix: string
): Promise<Element[]> => {
  const tagNames = Object.keys(pdsTagNamesWithPropertyNames);

  return allDOMElements.filter((el: Element) =>
    el.matches((prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames).join())
  );
};

export const evaluatePage = async (page: Page): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
  await page.exposeFunction('getAllPdsElementsForPrefix', getAllPdsElementsForPrefix);
  await page.exposeFunction('getConsumedTagNamesForPrefix', getConsumedTagNamesForPrefix);
  await page.exposeFunction('getPdsTagNamesWithPropertyNames', getPdsTagNamesWithPropertyNames);

  const allDOMElements = await page.$$('body *');

  return await page.evaluate(
    async ({ allDOMElements }): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
      if (!document.porscheDesignSystem) {
        throw new Error('document.porscheDesignSystem is undefined');
      }

      const pdsTagNamesWithPropertyNames = await getPdsTagNamesWithPropertyNames();

      return await Object.entries(document.porscheDesignSystem).reduce(async (result, [version, data]) => {
        // can be 'cdn' key with string value
        if (typeof data === 'string') {
          return result;
        }

        return {
          ...result,
          [version]: await data.prefixes.reduce(
            async (result, prefix: string) => ({
              ...result,
              [prefix]: await getConsumedTagNamesForPrefix(
                pdsTagNamesWithPropertyNames,
                JSON,
                prefix,
                await getAllPdsElementsForPrefix(pdsTagNamesWithPropertyNames, allDOMElements, prefix)
              ),
            }),
            Promise.resolve({})
          ),
        };
      }, Promise.resolve({}));
    },
    { allDOMElements }
  );
};
