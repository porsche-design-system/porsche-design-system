// Imported by every generated template with an icon swap (scripts/figmaGenerate.ts). The Figma CLI bundles it into each
// record at publish time, so it runs in Figma's template runtime.

/**
 * The PDS name of a swapped icon, read from the icon's own Code Connect record (`metadata.props.name`, published from
 * figma/icons/). Records resolve by component, so this works in every file, unlike a node-id map. Preview has no
 * instance to resolve and an icon outside the PDS set has no record, so both return `fallback`, the default icon's name.
 * Whether `executeTemplate()` throws for an instance without a record is not verified, so the call is guarded.
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
