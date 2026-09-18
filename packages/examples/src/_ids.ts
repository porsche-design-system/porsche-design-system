/**
 * The ids the dummy behaviour of the examples is wired on.
 *
 * An example ships no framework: its markup is rendered once at build time and its behaviour is a plain script that
 * looks the elements up. That look-up is the only coupling between a page and `assets/*.js` – and it used to be a
 * string written twice, once by the markup and once by the snippet, so a renamed element wired nothing up and nothing
 * said so until someone opened the page in a browser.
 *
 * These constants are that coupling, written once:
 *
 * - **the markup** uses them instead of literals, so an id cannot be misspelled;
 * - **`plugins/entries.ts`** derives from them which shared snippet a page needs, so the detection rule and the
 *   snippet it selects cannot drift apart;
 * - **the snippets** address elements by id only – never by tag name or class – so the markup around an element stays
 *   free to change and no snippet reaches into a pattern it was not written for.
 *
 * A unit test asserts all three, plus the rule that makes them a contract: a page rendering one id of a snippet
 * renders every id of that snippet, exactly once. Half a wiring is a broken example, not a smaller one.
 *
 * The snippets themselves keep the literals. They are copied verbatim into the `main.js` of a page, so they can import
 * nothing and have to read as the plain example code they are.
 */
export const ids = {
  /** Menu button of the header; opens the drilldown – `assets/header.js`. */
  navButton: 'nav-button',
  /** The navigation overlay that button opens – `assets/header.js`. */
  navDrilldown: 'nav-drilldown',
  /** Pause control of an autoplaying hero video – `assets/video.js`. */
  pauseButton: 'pause-button',
  /** The video that control operates – `assets/video.js`. */
  heroVideo: 'hero-video',
} as const;

export type BehaviourId = (typeof ids)[keyof typeof ids];

/** Every id of the contract, for the checks asserting a snippet queries nothing else. */
export const behaviourIds: BehaviourId[] = Object.values(ids);

/** How an id is written in the rendered markup – the one form the detection rules and the tests match on. */
export const idAttribute = (id: BehaviourId): string => `id="${id}"`;
