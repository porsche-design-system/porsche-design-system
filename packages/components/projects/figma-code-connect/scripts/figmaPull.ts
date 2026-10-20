import { getComponentMeta } from '@porsche-design-system/component-meta';
import { type History, type ReadAt, resolveHistory, type Version } from '../figma/history';
import { fileKeyOf, libraryUrl } from '../figma/library';
import type { Definition, Snapshot, Unresolved } from '../figma/snapshot';

// Pulls the library's published component sets, their property definitions and icon names into memory, over the REST
// API, and the earlier versions of the sets with a property no rule places. Token scopes and requests:
// docs/figma-code-connect.md.
const fileUrl = libraryUrl();
const fileKey = fileKeyOf(fileUrl);

// How far back history is read
const historyLimit = { steps: 40, days: 90 };
// 20 Tier 1 requests a minute on the Organization plan with a Full seat
const pace = 3000;
// history waits out a rate limit once, up to a minute: without history the lines only lose wording
const longestWait = 60;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const get = async <T>(path: string, { waitOut = false } = {}): Promise<T> => {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN is not set');
  }
  const response = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': token } });
  if (response.status === 429 && waitOut) {
    const seconds = Number(response.headers.get('Retry-After') ?? longestWait);
    if (seconds <= longestWait) {
      await sleep(seconds * 1000);
      return get<T>(path);
    }
  }
  if (!response.ok) {
    throw new Error(`GET ${path} → ${response.status} ${await response.text()}`);
  }
  return response.json();
};

type SetNode = { document: { componentPropertyDefinitions?: Record<string, Definition> } };
const setsPerRequest = 25;
/** The `GET nodes` paths that read these component sets' property definitions; `query` ends each. */
const setNodesPaths = (ids: string[], query = ''): string[] =>
  Array.from({ length: Math.ceil(ids.length / setsPerRequest) }, (_, i) => {
    const batch = ids.slice(i * setsPerRequest, (i + 1) * setsPerRequest);
    return `/files/${fileKey}/nodes?ids=${batch.join(',')}&depth=1${query}`;
  });

const pullOverRest = async (): Promise<Pick<Snapshot, 'components' | 'icons'>> => {
  const { meta: sets } = await get<{ meta: { component_sets: { node_id: string; name: string }[] } }>(
    `/files/${fileKey}/component_sets`
  );
  const ids = sets.component_sets.map((s) => s.node_id);
  const definitionsById = new Map<string, Record<string, Definition>>();
  for (const path of setNodesPaths(ids)) {
    const { nodes } = await get<{ nodes: Record<string, SetNode> }>(path);
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

/** What the library's history says about the properties no rule places: `GET versions`, then `GET nodes` per step. */
export const pullHistory = async (unresolved: Unresolved[]): Promise<History> => {
  const { versions } = await get<{ versions: Version[] }>(
    `/files/${fileKey}/versions?page_size=${historyLimit.steps}`,
    { waitOut: true }
  );
  const readAt: ReadAt = async (version, ids) => {
    const definitions: Record<string, Record<string, Definition>> = {};
    for (const path of setNodesPaths(ids, `&version=${version}`)) {
      await sleep(pace);
      const { nodes } = await get<{ nodes: Record<string, SetNode | null> }>(path, { waitOut: true });
      for (const [id, node] of Object.entries(nodes))
        definitions[id] = node?.document.componentPropertyDefinitions ?? {};
    }
    return definitions;
  };
  return resolveHistory(unresolved, versions, readAt, { ...historyLimit, now: Date.now() });
};
