// Read by the PDS patch of the Stencil runtime (patches/@stencil+core+*.patch), keep both in sync.
export const SSR_PROPS_ATTRIBUTE = 'data-ssr-props';

const isObject = (value: unknown): value is object => typeof value === 'object' && value !== null;

// An object or array default is created anew on every render, so it never has the identity of the value.
const isDefault = (value: unknown, defaultValue: unknown): boolean =>
  value === defaultValue ||
  (isObject(value) && isObject(defaultValue) && JSON.stringify(value) === JSON.stringify(defaultValue));

/**
 * Serializes the props a component got on the server, so the web component can apply them before its first render.
 * A component that starts before React hydrates, e.g. when streamed in or registered by the loader script, would
 * otherwise render its defaults until the wrapper syncs the props.
 * Props equal to their default are left out to keep the markup small.
 */
export const serializeSsrProps = (
  props: Record<string, unknown>,
  defaults: Record<string, unknown>
): string | undefined => {
  try {
    const ssrProps = Object.fromEntries(
      Object.entries(props).filter(
        ([key, value]) => value !== undefined && typeof value !== 'function' && !isDefault(value, defaults[key])
      )
    );

    return Object.keys(ssrProps).length ? JSON.stringify(ssrProps) : undefined;
  } catch {
    // e.g. a circular object, the component then renders its defaults until React syncs its props
    return undefined;
  }
};
