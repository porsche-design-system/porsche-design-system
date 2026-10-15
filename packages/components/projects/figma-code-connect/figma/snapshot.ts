// The pull figmaPull.ts reads over REST; figma:generate keeps it in memory.

export type Definition = { type: string; defaultValue?: unknown; variantOptions?: string[] };
export type Component = { id: string; name: string; componentPropertyDefinitions: Record<string, Definition> };
export type Snapshot = {
  components: Component[];
  /** node id → name of each published component with a PDS icon name, plus the unpublished INSTANCE_SWAP defaults */
  icons: Record<string, string>;
};

/**
 * The property definitions keyed by bare name. The REST response adds `#<node id>` to each key but a VARIANT's,
 * and a name can itself contain `#`, so only the last one is cut, as the Code Connect CLI does.
 */
export const definitions = (component: Component): Record<string, Definition> =>
  Object.fromEntries(
    Object.entries(component.componentPropertyDefinitions).map(([key, value]) => [
      value.type === 'VARIANT' ? key : key.replace(/#[^#]*$/, ''),
      value,
    ])
  );
