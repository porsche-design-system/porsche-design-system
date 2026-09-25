// Imported by every template with an icon swap. The Figma CLI bundles it into each record at publish, so it runs in
// Figma's template runtime.

/**
 * The PDS name of a swapped icon, read from the icon's own record (`metadata.props.name`, published from figma/icons/).
 * Returns `fallback`, the default icon's name, in preview and for an icon with no record. The call is in a try block
 * because it is not known if `executeTemplate()` throws for an instance with no record.
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
