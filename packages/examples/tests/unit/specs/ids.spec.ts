import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { exampleBanner, getScriptEntry, getSharedScripts, sharedScripts } from '../../../plugins/entries.ts';
import { renderPage } from '../../../plugins/jsx.ts';
import { scriptEntryName, styleEntryName } from '../../../plugins/projects.ts';
import { type BehaviourId, behaviourIds, idAttribute, ids } from '../../../src/_ids.ts';
import HeaderStackedPage from '../../../src/patterns/header/stacked/index.page.tsx';
import { countOccurrences, examplePages } from '../helpers/index.ts';

/**
 * The contract of `src/_ids.ts`: every behaviour id is registered once, looked up by exactly one shared snippet, never
 * written as a literal in the markup, and rendered by a page together with the other ids of its snippet – plus the rule
 * for behaviour that belongs to exactly one page.
 *
 * The e2e suite only notices a broken wiring on the page it happens to break; this checks every page and snippet.
 */

describe('behaviour ids', () => {
  const srcDir = path.join(import.meta.dirname, '../../../src');
  const snippets = sharedScripts.map(({ fileName, ids: scriptIds }) => ({
    fileName,
    ids: [...scriptIds] as BehaviourId[],
    code: fs.readFileSync(path.join(srcDir, 'assets', fileName), 'utf8') as string,
  }));

  /** Every id a snippet looks up, whether by `getElementById()` or by an `#id` selector. */
  const getQueriedIds = (code: string): string[] => [
    ...Array.from(code.matchAll(/getElementById\(\s*'([^']*)'\s*\)/g), ([, id]) => id),
    ...Array.from(code.matchAll(/querySelector(?:All)?\(\s*'#([^']*)'/g), ([, id]) => id),
  ];

  it('should register every id once, since a second one would silently win in the markup', () => {
    expect(new Set(behaviourIds).size).toBe(behaviourIds.length);
  });

  it('should wire every registered id up by exactly one snippet', () => {
    const declared = snippets.flatMap(({ ids: scriptIds }) => scriptIds);

    expect(new Set(declared).size).toBe(declared.length);
    expect([...declared].sort()).toEqual([...behaviourIds].sort());
  });

  it.each(snippets)('should address elements in $fileName by id only', ({ code }) => {
    // A snippet is inlined into the `main.js` of a page it knows nothing about, so a tag or class selector would
    // reach into whatever that page happens to render around the element.
    for (const [, selector] of code.matchAll(/querySelector(?:All)?\(\s*'([^']*)'/g)) {
      expect(selector.startsWith('#')).toBe(true);
    }
    expect(code).not.toMatch(/getElementsBy(?:ClassName|TagName)\(/);
  });

  it.each(snippets)('should look up exactly the ids $fileName is registered for', ({ code, ids: scriptIds }) => {
    expect(getQueriedIds(code).sort()).toEqual([...scriptIds].sort());
  });

  it('should keep the markup free of literal behaviour ids, which `_ids.ts` single-sources', () => {
    const files = (fs.readdirSync(srcDir, { recursive: true }) as string[]).filter((file) => file.endsWith('.tsx'));
    const offenders = files.filter((file) =>
      behaviourIds.some((id) => (fs.readFileSync(path.join(srcDir, file), 'utf8') as string).includes(idAttribute(id)))
    );

    expect(offenders).toEqual([]);
  });

  it.each(examplePages)(
    'should render the ids of a snippet in "%s" together, each of them once',
    async (_name, Page) => {
      const html = await renderPage(Page);

      for (const { ids: scriptIds } of snippets) {
        const counts = scriptIds.map((id) => countOccurrences(html, idAttribute(id)));

        // All of them or none of them – and never twice, because `getElementById()` would wire up the first one only.
        expect(new Set(counts).size).toBe(1);
        expect(counts[0]).toBeLessThanOrEqual(1);
      }
    }
  );

  it('should wire the menu button and its drilldown up on every page rendering the header', async () => {
    const html = await renderPage(HeaderStackedPage);

    expect(html).toContain(idAttribute(ids.navButton));
    expect(html).toContain(idAttribute(ids.navDrilldown));
    expect(getSharedScripts(html)).toEqual(['header.js']);
  });
});

describe('behaviour authored next to a page', () => {
  const srcDir = path.join(import.meta.dirname, '../../../src');

  const readSharedBehaviour = (html: string) =>
    getSharedScripts(html).map((fileName) => ({
      fileName,
      content: fs.readFileSync(path.join(srcDir, 'assets', fileName), 'utf8') as string,
    }));

  /** The pages carrying a `main.js` of their own – behaviour exactly one example needs. */
  const pagesWithBehaviour = examplePages
    .map(([name]) => [name, path.join(srcDir, name, scriptEntryName)] as const)
    .filter(([, filePath]) => fs.existsSync(filePath))
    .map(([name, filePath]) => [name, fs.readFileSync(filePath, 'utf8') as string] as const);

  it('should exist, since single-use behaviour does not belong in the shared folder', () => {
    // `assets/` holds what more than one page needs, selected by a detection rule on the ids of `_ids.ts`. A snippet
    // there has to address elements by id only and register every id it looks up – neither of which is possible nor
    // meaningful for behaviour belonging to exactly one example.
    expect(pagesWithBehaviour.length).toBeGreaterThan(0);
  });

  it.each(pagesWithBehaviour)('should keep the behaviour of "%s" a fragment, not an entry', (_name, code) => {
    // The generated entry brings the stylesheet and the banner. In dev the file is served straight from the source
    // tree, where the `style.css` it would import does not exist at all.
    expect(code).not.toContain(styleEntryName);
    expect(code).not.toContain(exampleBanner);
  });

  it.each(examplePages)('should generate the entry of "%s" from what the page renders', async (name, Page) => {
    const html = await renderPage(Page);
    const behaviour = pagesWithBehaviour.find(([pageName]) => pageName === name)?.[1];

    // The very call `scripts/build.ts` makes: it throws when a page's own behaviour declares a top level name one of
    // the inlined snippets already declares, since the two end up in a single module scope.
    expect(() => getScriptEntry({ behaviour, sharedBehaviour: readSharedBehaviour(html) })).not.toThrow();
  });
});
