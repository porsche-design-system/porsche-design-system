import { readFileSync } from 'node:fs';

// The shape of figma/components.json, written by scripts/figmaPull.ts and read by scripts/figmaGenerate.ts.
export const snapshotPath = 'figma/components.json';

export type Definition = { type: string; defaultValue?: unknown; variantOptions?: string[] };
export type Component = { id: string; name: string; componentPropertyDefinitions: Record<string, Definition> };
export type Snapshot = {
  fileUrl: string;
  pulledAt: string;
  components: Component[];
  /** node id → name of every published component whose name is a PDS icon name, plus unpublished INSTANCE_SWAP defaults */
  icons: Record<string, string>;
};

export const readSnapshot = (): Snapshot => JSON.parse(readFileSync(snapshotPath, 'utf8'));

/** Property definitions keyed by bare name; the REST response suffixes every key with `#<node id>`. */
export const definitions = (component: Component): Record<string, Definition> =>
  Object.fromEntries(
    Object.entries(component.componentPropertyDefinitions).map(([key, value]) => [key.replace(/#.*$/, ''), value])
  );
