import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractScripts, getScriptEntry } from '../../../plugins/entries.ts';
import { renderPage } from '../../../plugins/jsx.ts';
import { type BehaviourId, behaviourIds, idAttribute, ids } from '../../../src/_ids.ts';
import HeaderStackedPage from '../../../src/patterns/header/stacked/index.page.tsx';
import { countOccurrences, examplePages } from '../helpers/index.ts';

/**
 * The contract of `src/_ids.ts`: every id is registered once, never written as a literal in the markup, and rendered
 * by a page together with the other ids its script wires up – plus the rule that the scripts of a page fit into one
 * entry.
 *
 * The e2e suite only notices a broken wiring on the page it happens to break; this checks every page.
 */

/** The ids one script wires up together – a page rendering one of them without the others does nothing. */
const wirings: BehaviourId[][] = [
  [ids.navButton, ids.navDrilldown],
  [ids.pauseButton, ids.heroVideo],
  [
    ids.feedbackQuestion,
    ids.feedbackForm,
    ids.feedbackRating,
    ids.feedbackComment,
    ids.feedbackSubmit,
    ids.feedbackThanks,
    ids.feedbackThanksHeading,
  ],
];

/** Every id a script looks up, whether by `getElementById()` or by an `#id` selector. */
const getQueriedIds = (code: string): string[] => [
  ...Array.from(code.matchAll(/getElementById\(\s*'([^']*)'\s*\)/g), ([, id]) => id),
  ...Array.from(code.matchAll(/querySelector(?:All)?\(\s*'#([^']*)'/g), ([, id]) => id),
];

describe('behaviour ids', () => {
  const srcDir = path.join(import.meta.dirname, '../../../src');

  it('should register every id once, since a second one would silently win in the markup', () => {
    expect(new Set(behaviourIds).size).toBe(behaviourIds.length);
  });

  it('should wire every registered id up, each by exactly one pair', () => {
    const wired = wirings.flat();

    expect(new Set(wired).size).toBe(wired.length);
    expect([...wired].sort()).toEqual([...behaviourIds].sort());
  });

  it('should keep the markup free of literal behaviour ids, which `_ids.ts` single-sources', () => {
    const files = (fs.readdirSync(srcDir, { recursive: true }) as string[]).filter((file) => file.endsWith('.tsx'));
    const offenders = files.filter((file) =>
      behaviourIds.some((id) => {
        const source = fs.readFileSync(path.join(srcDir, file), 'utf8') as string;
        return source.includes(idAttribute(id)) || source.includes(`getElementById('${id}')`);
      })
    );

    expect(offenders).toEqual([]);
  });

  it.each(examplePages)(
    'should render the ids of a wiring in "%s" together, each of them once',
    async (_name, Page) => {
      const html = await renderPage(Page);

      for (const wiring of wirings) {
        const counts = wiring.map((id) => countOccurrences(html, idAttribute(id)));

        // All of them or none of them – and never twice, because `getElementById()` would wire up the first one only.
        expect(new Set(counts).size).toBe(1);
        expect(counts[0]).toBeLessThanOrEqual(1);
      }
    }
  );

  it.each(examplePages)('should render a script for every wiring "%s" renders', async (_name, Page) => {
    const html = await renderPage(Page);
    const queried = extractScripts(html).scripts.flatMap(getQueriedIds);

    for (const id of behaviourIds.filter((id) => html.includes(idAttribute(id)))) {
      expect(queried).toContain(id);
    }
  });

  it('should wire the menu button and its drilldown up on every page rendering the header', async () => {
    const html = await renderPage(HeaderStackedPage);

    expect(html).toContain(idAttribute(ids.navButton));
    expect(extractScripts(html).scripts.flatMap(getQueriedIds)).toEqual([ids.navButton, ids.navDrilldown]);
  });
});

describe('scripts of a page', () => {
  it.each(examplePages)('should fit the scripts of "%s" into one entry', async (_name, Page) => {
    const { scripts } = extractScripts(await renderPage(Page));

    // The very calls `scripts/build.ts` makes: it throws when two scripts of a page declare the same top level name,
    // since they end up in a single module scope – in dev each of them is a module of its own and would not tell.
    expect(() => getScriptEntry(scripts)).not.toThrow();
  });
});
