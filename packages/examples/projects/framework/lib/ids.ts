/**
 * An example's id: lowercase kebab-case segments joined by `/`, the folder of the example below `src/`. It names
 * neither the kind of the example nor a framework, so an example keeps its id when its format changes. See #4789.
 *
 * - `components/<component>/<slug>`: an example of a component, `<component>` being its tag without `p-`
 * - `components/<component>/default`: the component's default example, which the configurator starts from
 * - `components/<component>/accessibility/<slug>`: an accessibility example; no other example uses that segment
 * - `<route>/<slug>`: an example of something else, below the Storefront route that documents it (`ag-grid/theme/…`)
 */
const EXAMPLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/;

/** Fails for an id that breaks the naming scheme, or a framework example in the segment of the accessibility examples. */
export const assertExampleId = (id: string): string => {
  if (!EXAMPLE_ID.test(id)) {
    throw new Error(`[examples-framework] "${id}" is not an example id: lowercase kebab-case segments joined by "/"`);
  }
  if (/^components\/[^/]+\/accessibility(?:\/|$)/.test(id)) {
    throw new Error(`[examples-framework] "${id}" is reserved for the accessibility examples`);
  }
  return id;
};
