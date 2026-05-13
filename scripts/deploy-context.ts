import { execSync } from 'node:child_process';
import { BedrockAgentClient, StartIngestionJobCommand } from '@aws-sdk/client-bedrock-agent';

const CONTEXT_DIR = 'packages/mcp-server/context-snapshots';
const S3_BUCKET_NAME = '';
const KNOWLEDGE_BASE_ID = '';
const DATA_SOURCE_ID = '';
const REGION = 'eu-central-1';

const deploy = async () => {
  // Step 1: Upload to S3
  console.log('Uploading context snapshots to S3...');
  try {
    execSync(`aws s3 sync ${CONTEXT_DIR} s3://${S3_BUCKET_NAME} --region ${REGION} --delete`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('S3 upload failed:', error);
    process.exit(1);
  }

  // Step 2: Verify upload by listing objects
  console.log('Verifying S3 upload...');
  try {
    const result = execSync(`aws s3 ls s3://${S3_BUCKET_NAME} --region ${REGION} --recursive --summarize | tail -1`, {
      encoding: 'utf-8',
    });
    const objectCount = parseInt(result.match(/Total Objects: (\d+)/)?.[1] ?? '0', 10);
    if (objectCount === 0) {
      throw new Error('S3 bucket is empty after sync — upload may have failed');
    }
    console.log(`Verified: ${objectCount} objects in S3 bucket`);
  } catch (error) {
    console.error('S3 verification failed:', error);
    process.exit(1);
  }

  // Step 3: Trigger Knowledge Base ingestion
  console.log('Starting Knowledge Base ingestion...');
  const client = new BedrockAgentClient({ region: REGION });
  const { ingestionJob } = await client.send(
    new StartIngestionJobCommand({
      knowledgeBaseId: KNOWLEDGE_BASE_ID,
      dataSourceId: DATA_SOURCE_ID,
    })
  );

  if (!ingestionJob?.ingestionJobId) {
    console.error('Failed to start ingestion job — no job ID returned');
    process.exit(1);
  }

  console.log(`Ingestion job started: ${ingestionJob.ingestionJobId}`);
};

deploy().catch((err) => {
  console.error('Deploy failed:', err);
  process.exit(1);
});
