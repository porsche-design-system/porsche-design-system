/**
 * The rules of an example's id, shared by the builds of the projects and the tests of the catalogue (see
 * `packages/examples/AGENTS.md`). An id is lowercase kebab-case segments joined by `/`, the folder of the example below
 * its project's `src/`. It names neither the kind of the example nor a framework, so an example keeps its id when its
 * format changes. Two segments are reserved:
 *
 * - `default`: the default example of what its parent names – only ever the last segment, of a story or framework
 *   example
 * - `accessibility`: only in `components/<component>/accessibility/<slug>`, the id of an accessibility example
 */

/** The kind of an example, as `Example['kind']` of `@porsche-design-system/examples` names it. */
export type ExampleIdKind = 'story' | 'framework' | 'accessibility' | 'pattern' | 'template';

export const EXAMPLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/;
const ACCESSIBILITY_ID = /^components\/[^/]+\/accessibility\/[^/]+$/;

/** Why `id` breaks the rules for an example of `kind`, or `undefined` for a valid id. */
export const getExampleIdError = (id: string, kind: ExampleIdKind): string | undefined => {
  if (!EXAMPLE_ID.test(id)) {
    return 'is not an example id: lowercase kebab-case segments joined by "/"';
  }
  const segments = id.split('/');
  if (segments.slice(0, -1).includes('default')) {
    return 'uses "default" before its last segment';
  }
  if (segments.at(-1) === 'default' && kind !== 'story' && kind !== 'framework') {
    return `is a ${kind} example; only a story or a framework example can be a default example`;
  }
  if (
    segments.includes('accessibility') !== (kind === 'accessibility') ||
    (kind === 'accessibility' && !ACCESSIBILITY_ID.test(id))
  ) {
    return '"accessibility" is reserved for the accessibility examples, components/<component>/accessibility/<slug>';
  }
  return undefined;
};

/** Returns `id`, or fails for an id that breaks the rules for an example of `kind`. */
export const assertExampleId = (id: string, kind: ExampleIdKind, project: string): string => {
  const error = getExampleIdError(id, kind);
  if (error) {
    throw new Error(`[${project}] "${id}" ${error}`);
  }
  return id;
};

/** `components/select/slots` → `p-select`: the component an example below `components/` shows. */
export const componentOf = (id: string): `p-${string}` | undefined => {
  const [root, component] = id.split('/');
  return root === 'components' && component ? `p-${component}` : undefined;
};
