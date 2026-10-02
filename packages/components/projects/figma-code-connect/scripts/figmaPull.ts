import { getComponentMeta } from '@porsche-design-system/component-meta';
import { fileKeyOf, libraryUrl } from '../figma/library';
import type { Definition, Snapshot } from '../figma/snapshot';

// Pulls the library's published component sets, their property definitions and icon names into memory, over the REST
// API. Token scopes and requests: docs/runbooks/figma-code-connect.md.
const fileUrl = libraryUrl();
const fileKey = fileKeyOf(fileUrl);

const get = async <T>(path: string): Promise<T> => {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN is not set');
  }
  const response = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(`GET ${path} → ${response.status} ${await response.text()}`);
  }
  return response.json();
};

const pullOverRest = async (): Promise<Pick<Snapshot, 'components' | 'icons'>> => {
  const { meta: sets } = await get<{ meta: { component_sets: { node_id: string; name: string }[] } }>(
    `/files/${fileKey}/component_sets`
  );
  const ids = sets.component_sets.map((s) => s.node_id);
  const definitionsById = new Map<string, Record<string, Definition>>();
  for (let i = 0; i < ids.length; i += 25) {
    const { nodes } = await get<{
      nodes: Record<string, { document: { componentPropertyDefinitions?: Record<string, Definition> } }>;
    }>(`/files/${fileKey}/nodes?ids=${ids.slice(i, i + 25).join(',')}&depth=1`);
    for (const [id, node] of Object.entries(nodes)) {
      definitionsById.set(
        id,
        Object.fromEntries(
          Object.entries(node.document.componentPropertyDefinitions ?? {}).map(
            ([key, { type, defaultValue, variantOptions }]) => [
              key,
              {
                type,
                ...(defaultValue !== undefined ? { defaultValue } : {}),
                ...(variantOptions ? { variantOptions } : {}),
              },
            ]
          )
        )
      );
    }
  }
  const { meta: published } = await get<{ meta: { components: { node_id: string; name: string }[] } }>(
    `/files/${fileKey}/components`
  );
  const names = Object.fromEntries(published.components.map((c) => [c.node_id, c.name]));
  // an INSTANCE_SWAP default can be a component never published; the runtime hands templates its node id too
  const unpublishedDefaults = [...definitionsById.values()]
    .flatMap((defs) => Object.values(defs))
    .filter((d) => d.type === 'INSTANCE_SWAP' && typeof d.defaultValue === 'string' && !(d.defaultValue in names))
    .map((d) => d.defaultValue as string);
  if (unpublishedDefaults.length) {
    const { nodes } = await get<{ nodes: Record<string, { document: { name: string } } | null> }>(
      `/files/${fileKey}/nodes?ids=${unpublishedDefaults.join(',')}&depth=1`
    );
    for (const [id, node] of Object.entries(nodes)) {
      if (node) names[id] = node.document.name;
    }
  }
  // only icon components are looked up by name: the INSTANCE_SWAP fallbacks and the icon batch
  const icons = new Set<string>((getComponentMeta('p-icon').propsMeta?.name?.allowedValues ?? []) as string[]);
  return {
    components: sets.component_sets.map(({ node_id, name }) => ({
      id: node_id,
      name,
      componentPropertyDefinitions: definitionsById.get(node_id) ?? {},
    })),
    icons: Object.fromEntries(Object.entries(names).filter(([, name]) => icons.has(name))),
  };
};

export const pull = async (): Promise<Snapshot> => {
  const { components, icons } = await pullOverRest();
  console.log(`pulled ${components.length} component sets and ${Object.keys(icons).length} icon names from ${fileUrl}`);
  return { components, icons };
};
