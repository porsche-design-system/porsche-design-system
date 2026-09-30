// The pull figmaPull.ts reads over the REST API; figma:generate keeps it in memory, and nothing stores it.

export type Definition = { type: string; defaultValue?: unknown; variantOptions?: string[] };
export type Component = { id: string; name: string; componentPropertyDefinitions: Record<string, Definition> };
export type Snapshot = {
  components: Component[];
  /** node id → name of each published component with a PDS icon name, plus the unpublished INSTANCE_SWAP defaults */
  icons: Record<string, string>;
};

/** The property definitions keyed by bare name. The REST response adds `#<node id>` to each key. */
export const definitions = (component: Component): Record<string, Definition> =>
  Object.fromEntries(
    Object.entries(component.componentPropertyDefinitions).map(([key, value]) => [key.replace(/#.*$/, ''), value])
  );
