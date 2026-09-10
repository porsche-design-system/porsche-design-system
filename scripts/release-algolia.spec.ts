import { describe, expect, it, vi } from 'vitest';
import { replaceAlgoliaIndex } from '../packages/storefront/scripts/replaceAlgoliaIndex';

const createClient = () => ({
  setSettings: vi.fn(async () => ({ taskID: 1, updatedAt: '2026-09-10T00:00:00Z' })),
  waitForTask: vi.fn(async () => ({ status: 'published' as const })),
  replaceAllObjects: vi.fn(async () => ({
    copyOperationResponse: { taskID: 2, updatedAt: '2026-09-10T00:00:00Z' },
    batchResponses: [],
    moveOperationResponse: { taskID: 3, updatedAt: '2026-09-10T00:00:00Z' },
  })),
});

describe('release search indexing', () => {
  it('replaces old records and waits for settings and the final index move', async () => {
    const client = createClient();
    const records = [{ objectID: '/components/button' }];
    await replaceAlgoliaIndex(client, 'v4', records, { searchableAttributes: ['name'] });
    expect(client.setSettings).toHaveBeenCalledWith({
      indexName: 'v4',
      indexSettings: { searchableAttributes: ['name'] },
    });
    expect(client.replaceAllObjects).toHaveBeenCalledWith({ indexName: 'v4', objects: records });
    expect(client.waitForTask.mock.calls).toEqual([[{ indexName: 'v4', taskID: 1 }], [{ indexName: 'v4', taskID: 3 }]]);
    expect(client.waitForTask.mock.invocationCallOrder[0]).toBeLessThan(
      client.replaceAllObjects.mock.invocationCallOrder[0]
    );
  });

  it.each(['setSettings', 'replaceAllObjects', 'waitForTask'] as const)('propagates %s failures', async (method) => {
    const client = createClient();
    client[method].mockRejectedValueOnce(new Error('Algolia unavailable'));
    await expect(replaceAlgoliaIndex(client, 'v4', [], {})).rejects.toThrow('Algolia unavailable');
  });

  it('does not finish before the final indexing task completes', async () => {
    const client = createClient();
    client.waitForTask
      .mockResolvedValueOnce({ status: 'published' })
      .mockRejectedValueOnce(new Error('Index not ready'));
    await expect(replaceAlgoliaIndex(client, 'v4', [], {})).rejects.toThrow('Index not ready');
  });
});
