import type { Locator } from '@playwright/test';

export const waitForAnimationsFinished = (locator: Locator): Promise<void> =>
  locator.evaluate(async (el) => {
    // A host does not report the animations inside its shadow root.
    const fromShadowRoots = (elements: Element[]): Animation[] =>
      elements.flatMap(({ shadowRoot }) =>
        shadowRoot ? [...shadowRoot.getAnimations(), ...fromShadowRoots([...shadowRoot.querySelectorAll('*')])] : []
      );

    while (true) {
      // One frame lets an animation that starts when another ends show up in the next check.
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const animations = [
        ...el.getAnimations({ subtree: true }),
        ...fromShadowRoots([el, ...el.querySelectorAll('*')]),
      ].filter((a) => a.effect?.getComputedTiming().endTime !== Infinity && (a.playState === 'running' || a.pending));
      if (!animations.length) {
        return;
      }
      await Promise.allSettled(animations.map((a) => a.finished));
    }
  });
