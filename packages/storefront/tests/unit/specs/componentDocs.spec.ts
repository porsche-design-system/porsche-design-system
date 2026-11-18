import fs from 'node:fs';
import path from 'node:path';
import { appDir, getRenderedExampleIds, getStringsOf } from '../helpers/mdxDocs';

/**
 * A component's meta lists the ids of its examples for the skill; its pages import and render the same examples for the
 * Storefront. Both have to show the same examples, in the same order.
 */

const componentsDir = path.join(appDir, '(main)', 'components');

const components = fs
  .readdirSync(componentsDir)
  .filter((component) => fs.existsSync(path.join(componentsDir, component, `${component}.meta.ts`)))
  .sort();

/** `input-date` → the ids `inputDateMeta.<members>` lists in `input-date.meta.ts`. */
const fromMeta = (component: string, members: string[]): string[] =>
  getStringsOf(
    path.join(componentsDir, component, `${component}.meta.ts`),
    `${component.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase())}Meta`,
    members
  );

/** The ids of the examples a page of the component renders with `element`, none without the page. */
const fromPage = (component: string, page: string, element: string): string[] => {
  const file = path.join(componentsDir, component, page, 'page.mdx');
  return fs.existsSync(file) ? getRenderedExampleIds(file, element) : [];
};

const byComponent = (getIds: (component: string) => string[]): Record<string, string[]> =>
  Object.fromEntries(components.map((component) => [component, getIds(component)]));

describe('component docs', () => {
  it('find the meta of every component', () => {
    expect(components.length).toBeGreaterThan(50);
  });

  it('render the examples of their meta on the examples page, in its order', () => {
    expect(byComponent((component) => fromPage(component, 'examples', 'Example'))).toEqual(
      byComponent((component) => fromMeta(component, ['examples']))
    );
  });

  it('render the default example of their meta on the configurator page', () => {
    expect(byComponent((component) => fromPage(component, 'configurator', 'Configurator'))).toEqual(
      byComponent((component) => fromMeta(component, ['configurator']))
    );
  });
});
