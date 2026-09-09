/**
 * Adds or removes a custom state on an element via the `CustomStateSet` of its `ElementInternals`,
 * which makes the state targetable in CSS via the `:state()` pseudo-class, e.g. `p-button:state(loading)`.
 *
 * This is experimental and a progressive enhancement:
 * - Custom states can't be expressed during SSR, they are only applied once the component hydrates.
 * - Browsers without `ElementInternals` (`internals` is `undefined` due to our Stencil patch) or without
 *   `CustomStateSet` support simply don't get the state, the component keeps working as before.
 * - Chromium < 125, Safari < 17.4 and Firefox < 126 only support the legacy dashed ident syntax (`--foo`)
 *   and throw for plain idents, therefore we fall back to the dashed ident.
 */
export const setCustomState = (internals: ElementInternals | undefined, state: string, active: boolean): void => {
  const states = internals?.states;

  if (!states) {
    return;
  }

  try {
    if (active) {
      states.add(state);
    } else {
      states.delete(state);
    }
  } catch {
    // legacy dashed ident syntax as fallback for older browsers
    try {
      if (active) {
        states.add(`--${state}`);
      } else {
        states.delete(`--${state}`);
      }
    } catch {
      // custom states are not supported at all, nothing to do
    }
  }
};
