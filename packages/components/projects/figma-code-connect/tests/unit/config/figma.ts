// Stands in for the `figma` module of Code Connect's template runtime; a test sets `globalThis.selectedInstance`.
// Tests import a helper fresh after setting it, because the helpers read the selected instance when they load.
declare global {
  var selectedInstance: { properties: Record<string, unknown> };
}

export default {
  get selectedInstance() {
    return globalThis.selectedInstance;
  },
};
