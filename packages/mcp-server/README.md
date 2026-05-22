# MCP Server

The MCP (Model Context Protocol) server provides AI assistants with up-to-date Porsche Design System documentation and
component knowledge.

## Deploy Context

The `deploy-context` script uploads context snapshots to S3 and triggers an AWS Bedrock Knowledge Base ingestion.

> **Note**: Once the `test-deploy-context.yml` workflow is merged into `main`, this will run automatically via GitHub
> Actions. Until then, use the manual steps below.

### Prerequisites

- AWS CLI installed (`brew install awscli`)
- Access to the PDS AWS account

### 1. Configure AWS SSO

Run the SSO configuration wizard:

```bash
aws configure sso --profile dev-profile
```

Follow the prompts:

- **SSO start URL**: Your organization's SSO URL
- **SSO Region**: `eu-central-1`
- **Account**: Select the PDS account (real data is on prod :) )
- **Role**: Choose a role with S3 and Bedrock access
- **CLI default region**: `eu-central-1`
- **CLI default output format**: `json`

### 2. Log in

```bash
aws sso login --profile dev-profile
```

Verify your credentials:

```bash
aws sts get-caller-identity --profile dev-profile
```

### 3. Build the context snapshots

From the repo root:

```bash
npm run build:shared
npm run build:tokens
npm run build:assets
npm run build:styles
npm run build:utilities
npm run build:component-meta
npm run build:components
npm run build:components-js
npm run build:mcp-server
npm run prepare-context
```

### 4. Run the deploy

```bash
S3_BUCKET_NAME="<bucket-name>" \
KNOWLEDGE_BASE_ID="<knowledge-base-id>" \
DATA_SOURCE_ID="<data-source-id>" \
AWS_PROFILE=dev-profile \
npm run deploy-context
```

Replace the placeholder values with the actual resource IDs from AWS.

### 5. Verify

```bash
aws s3 ls "s3://<bucket-name>/" --region eu-central-1 --profile dev-profile
```

### Dry-run (no actual upload)

To preview what would be synced without making changes:

```bash
VERSION=$(node -p "require('../components/package.json').version")
aws s3 sync "packages/mcp-server/v${VERSION}" "s3://<bucket-name>/v${VERSION}" \
  --region eu-central-1 --profile dev-profile --dryrun
```
