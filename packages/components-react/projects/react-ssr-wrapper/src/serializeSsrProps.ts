// Read by the PDS patch of the Stencil runtime (patches/@stencil+core+*.patch), keep both in sync.
export const SSR_PROPS_ATTRIBUTE = 'data-ssr-props';

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
  const ssrProps = Object.fromEntries(
    Object.entries(props).filter(
      ([key, value]) => value !== undefined && typeof value !== 'function' && value !== defaults[key]
    )
  );

  if (!Object.keys(ssrProps).length) {
    return undefined;
  }

  try {
    return JSON.stringify(ssrProps);
  } catch {
    // e.g. a circular object, the component then renders its defaults until React syncs its props
    return undefined;
  }
};
