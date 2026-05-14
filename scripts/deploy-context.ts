import { execSync } from 'node:child_process';
import { BedrockAgentClient, StartIngestionJobCommand } from '@aws-sdk/client-bedrock-agent';
import { version } from '@porsche-design-system/components/package.json';

const CONTEXT_DIR = `packages/mcp-server/v${version}`;
const S3_BUCKET_NAME = required('S3_BUCKET_NAME');
const KNOWLEDGE_BASE_ID = required('KNOWLEDGE_BASE_ID');
const DATA_SOURCE_ID = required('DATA_SOURCE_ID');
const REGION = 'eu-central-1';
const S3_BUCKET_PATH = `s3://${S3_BUCKET_NAME}/v${version}`;

const deploy = async () => {
  // upload to S3
  console.log('Uploading context snapshots to S3...');
  try {
    execSync(`aws s3 sync ${CONTEXT_DIR} ${S3_BUCKET_PATH} --region ${REGION} --delete`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('S3 upload failed:', error);
    process.exit(1);
  }

  // verify upload by listing objects
  console.log('Verifying S3 upload...');
  try {
    const result = execSync(
      `aws s3 ls ${S3_BUCKET_PATH} --region ${REGION} --recursive --summarize | grep "Total Objects"`,
      {
        encoding: 'utf-8',
      }
    );
    const objectCount = parseInt(result.match(/Total Objects: (\d+)/)?.[1] ?? '0', 10);
    if (objectCount === 0) {
      throw new Error('S3 bucket is empty after sync — upload may have failed');
    }
    console.log(`Verified: ${objectCount} objects in S3 bucket`);
  } catch (error) {
    console.error('S3 verification failed:', error);
    process.exit(1);
  }

  // trigger knowledge base ingestion
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
