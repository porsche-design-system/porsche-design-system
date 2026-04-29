import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-central-1' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'pds-mcp-db';
const BATCH_SIZE = 25; // DynamoDB max per BatchWriteItem

async function populateTable(): Promise<void> {
  const items: Record<string, unknown>[] = JSON.parse(
    await readFile(join(process.cwd(), 'packages/mcp-server/context-snapshots/docs-index.json'), 'utf-8')
  );

  console.log(`Populating ${items.length} items into "${TABLE_NAME}"...`);

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    const result = await docClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: batch.map((item) => ({ PutRequest: { Item: item } })),
        },
      })
    );

    const unprocessed = result.UnprocessedItems?.[TABLE_NAME];
    if (unprocessed && unprocessed.length > 0) {
      console.warn(`Retrying ${unprocessed.length} unprocessed items...`);
      await docClient.send(new BatchWriteCommand({ RequestItems: { [TABLE_NAME]: unprocessed } }));
    }

    console.log(`${Math.min(i + BATCH_SIZE, items.length)} / ${items.length}`);
  }

  console.log('Done!');
}

populateTable().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
