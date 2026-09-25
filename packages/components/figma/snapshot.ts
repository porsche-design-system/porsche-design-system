import { readFileSync } from 'node:fs';

// The snapshot, figma/components.json: figma:pull writes it, figma:generate reads it.
export const snapshotPath = 'figma/components.json';

export type Definition = { type: string; defaultValue?: unknown; variantOptions?: string[] };
export type Component = { id: string; name: string; componentPropertyDefinitions: Record<string, Definition> };
export type Snapshot = {
  fileUrl: string;
  pulledAt: string;
  components: Component[];
  /** node id → name of each published component with a PDS icon name, plus the unpublished INSTANCE_SWAP defaults */
  icons: Record<string, string>;
};

export const readSnapshot = (): Snapshot => JSON.parse(readFileSync(snapshotPath, 'utf8'));

/** The property definitions keyed by bare name. The REST response adds `#<node id>` to each key. */
export const definitions = (component: Component): Record<string, Definition> =>
  Object.fromEntries(
    Object.entries(component.componentPropertyDefinitions).map(([key, value]) => [key.replace(/#.*$/, ''), value])
  );
