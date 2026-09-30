/**
 * The ids the behaviour of the partials is wired on.
 *
 * An example ships no framework: its markup is rendered once at build time and its behaviour is a plain script that
 * looks the elements up. A partial bringing its own behaviour renders that script next to its markup, and both take
 * the ids from here – so the markup, the script and the tests addressing the element cannot spell an id differently.
 *
 * `tests/unit/specs/ids.spec.ts` asserts that no `.tsx` file writes one of them as a literal, and that a page rendering
 * one id of an element pair renders the other one as well, exactly once: half a wiring is a broken example, not a
 * smaller one. Ids used by the script of a single page stay literals of that page.
 */
export const ids = {
  /** Menu button of the header; opens the drilldown – `MainNav`. */
  navButton: 'nav-button',
  /** The navigation overlay that button opens – `MainNav`. */
  navDrilldown: 'nav-drilldown',
  /** Pause control of an autoplaying hero video – `VideoPauseButton`. */
  pauseButton: 'pause-button',
  /** The video that control operates – rendered by the page, operated by `VideoPauseButton`. */
  heroVideo: 'hero-video',
} as const;

export type BehaviourId = (typeof ids)[keyof typeof ids];

/** Every id of the contract, for the checks asserting a snippet queries nothing else. */
export const behaviourIds: BehaviourId[] = Object.values(ids);

/** How an id is written in the rendered markup – the one form the detection rules and the tests match on. */
export const idAttribute = (id: BehaviourId): string => `id="${id}"`;
