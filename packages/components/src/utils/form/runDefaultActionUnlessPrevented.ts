/**
 * Runs `defaultAction` once the event has been dispatched to all listeners, unless one of them cancelled it.
 *
 * Browsers perform default actions, e.g. implicit form submission, only after the dispatch of an event finished. A
 * listener inside the shadow root runs before any bubbling listener on the host, document or window, so the check for
 * `defaultPrevented` has to be deferred.
 *
 * @param {Event} e - The event whose default action is emulated.
 * @param {() => void} defaultAction - The default action to run.
 */
export const runDefaultActionUnlessPrevented = (e: Event, defaultAction: () => void): void => {
  if (e.defaultPrevented) return;
  setTimeout(() => {
    if (!e.defaultPrevented) {
      defaultAction();
    }
  });
};
