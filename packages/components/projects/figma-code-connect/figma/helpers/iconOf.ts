// Bundled into every record with an icon swap at publish, so it runs in Figma's template runtime.

/**
 * The swapped icon's PDS name from its own record, else `fallback`: the default icon's name, also used in preview.
 * The try: Figma's typings do not say whether `executeTemplate()` throws for an instance with no record.
 */
export const iconOf = (
  swap: { executeTemplate?: () => { metadata?: { props?: { name?: unknown } } } } | undefined,
  fallback: string | undefined
): string | undefined => {
  try {
    const name = swap?.executeTemplate?.()?.metadata?.props?.name;
    return typeof name === 'string' ? name : fallback;
  } catch {
    return fallback;
  }
};
