import type { algoliasearch } from 'algoliasearch';

type IndexClient = Pick<ReturnType<typeof algoliasearch>, 'setSettings' | 'waitForTask' | 'replaceAllObjects'>;

export async function replaceAlgoliaIndex(
  client: IndexClient,
  indexName: string,
  objects: Parameters<IndexClient['replaceAllObjects']>[0]['objects'],
  indexSettings: Parameters<IndexClient['setSettings']>[0]['indexSettings']
): Promise<void> {
  const { taskID } = await client.setSettings({ indexName, indexSettings });
  await client.waitForTask({ indexName, taskID });
  // Replace through Algolia's temporary-index helper so removed pages disappear
  // and the old index remains available until the new records are ready.
  const { moveOperationResponse } = await client.replaceAllObjects({ indexName, objects });
  await client.waitForTask({ indexName, taskID: moveOperationResponse.taskID });
}
