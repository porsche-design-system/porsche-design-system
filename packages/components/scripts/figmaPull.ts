import { writeFileSync } from 'node:fs';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { diffSnapshots } from '../figma/diff';
import { type Definition, readSnapshot, type Snapshot, snapshotPath } from '../figma/snapshot';

// Pulls the published component sets of the PDS Figma library, their property definitions and the names of the
// published icon components (for INSTANCE_SWAP lookup) into figma/components.json. figmaGenerate.ts works from that
// file, so it is the developer's record of "what Figma looked like when I last looked". Each definition keeps only type,
// defaultValue and variantOptions: the fields generation reads. The snapshot diff is how a Figma change is reviewed, so
// the REST response's preferredValues (component key hashes) are dropped.
//
//   npm run figma:pull            three REST requests, four when an INSTANCE_SWAP default is unpublished
//                                 (FIGMA_ACCESS_TOKEN with "File content: Read" and "Library content: Read";
//                                 Dev or Full seat on the Organization plan)
//   npm run figma:pull -- --check compare the fresh pull with the committed snapshot and exit 1 on any difference
//                                 instead of writing — the drift check the workflow opens the developer issue on
//
// Requests (verified 2026-09-18 against EkdP468u4ZVuIRwalKCscb): GET /component_sets lists every published set with its
// node id; GET /nodes?ids=…&depth=1 returns the sets' componentPropertyDefinitions with complete variantOptions;
// GET /components lists every published component (icons included) with node id and name.
const check = process.argv.includes('--check');
const committed = readSnapshot();
const fileUrl = committed.fileUrl;
const fileKey = fileUrl.match(/figma\.com\/(?:design|file)\/([0-9a-zA-Z]+)/)?.[1];
if (!fileKey) {
  throw new Error(`Cannot read a file key from ${fileUrl}`);
}

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
  // An INSTANCE_SWAP default may point at a component that was never published (p-tag's default icon, node 112:726, a
  // local "globe" removed from the canvas). The runtime hands templates that node id, so its name has to be in the map too.
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
  // Only the icon components are looked up by name (INSTANCE_SWAP fallbacks and the icon batch); the rest of the
  // 1,300+ published components would only add noise to every snapshot diff.
  const icons = new Set<string>(getComponentMeta('p-icon').propsMeta.name.allowedValues as string[]);
  return {
    components: sets.component_sets.map(({ node_id, name }) => ({
      id: node_id,
      name,
      componentPropertyDefinitions: definitionsById.get(node_id) ?? {},
    })),
    icons: Object.fromEntries(Object.entries(names).filter(([, name]) => icons.has(name))),
  };
};

const pull = async (): Promise<void> => {
  const { components, icons } = await pullOverRest();

  if (check) {
    const differences = diffSnapshots(committed, { components, icons });
    if (differences.length) {
      console.error(
        `✖ Figma changed since the committed pull (${committed.pulledAt}):\n${differences.map((d) => `  - ${d}`).join('\n')}\n` +
          `  Run "npm run figma:pull", then "npm run figma:generate", review, and publish.`
      );
      process.exit(1);
    }
    console.log(`${snapshotPath} matches Figma (${fileUrl})`);
    return;
  }

  const snapshot: Snapshot = { fileUrl, pulledAt: new Date().toISOString(), components, icons };
  writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(
    `pulled ${components.length} component sets and ${Object.keys(icons).length} icon names from ${fileUrl} into ${snapshotPath}`
  );
};

pull();
