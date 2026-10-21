/**
 * An example's id: lowercase kebab-case segments joined by `/`, the folder of the example below `src/`. See
 * `packages/examples/AGENTS.md`. Two segments are reserved:
 *
 * - `default`: the default example of what its parent names, so only ever the last segment
 * - `accessibility`: only in `components/<component>/accessibility/<slug>`, an accessibility example
 */
const EXAMPLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/;
const ACCESSIBILITY_ID = /^components\/[^/]+\/accessibility\/[^/]+$/;

export type ExampleIdKind = 'story' | 'accessibility';

/** Fails for an id that breaks the naming scheme or uses a reserved segment for something else. */
export const assertExampleId = (id: string, kind: ExampleIdKind): string => {
  if (!EXAMPLE_ID.test(id)) {
    throw new Error(`[examples-stories] "${id}" is not an example id: lowercase kebab-case segments joined by "/"`);
  }
  const segments = id.split('/');
  if (segments.slice(0, -1).includes('default')) {
    throw new Error(`[examples-stories] "${id}" uses "default" before its last segment`);
  }
  if (
    segments.includes('accessibility') !== (kind === 'accessibility') ||
    (kind === 'accessibility' && !ACCESSIBILITY_ID.test(id))
  ) {
    throw new Error(
      `[examples-stories] "${id}": "accessibility" is reserved for components/<component>/accessibility/<slug>`
    );
  }
  if (kind === 'accessibility' && segments[3] === 'default') {
    throw new Error(`[examples-stories] "${id}": an accessibility example cannot be a default example`);
  }
  return id;
};

/** `components/select/slots` → `p-select`: the component an example below `components/` shows. */
export const componentOf = (id: string): `p-${string}` | undefined => {
  const [root, component] = id.split('/');
  return root === 'components' && component ? `p-${component}` : undefined;
};
