# MCP Server — Next Steps

## Infrastructure: `mcp-cdk` Repository

The AWS infrastructure (S3 bucket, Bedrock Knowledge Base, IAM roles, data source configuration) is managed in a separate CDK repository:

👉 **[mcp-cdk](https://github.com/porsche-design-system/mcp-cdk)**

Refer to that repo for:

- IAM role trust policies (GitHub OIDC for CI, SSO for local)
- S3 bucket configuration and lifecycle rules
- Bedrock Knowledge Base and data source setup
- CloudFormation stack updates

---

## CI/CD

- [ ] Merge `test-deploy-context.yml` workflow into `main` so it appears in the GitHub Actions UI
- [ ] Add the workflow to the release pipeline (trigger on version tags or after `release.yml`)
- [ ] Consider adding a scheduled run (e.g., weekly) to keep the knowledge base fresh even without releases

---

## Testing

- [ ] **Unit tests for `prepare-context`** — verify that context snapshots are generated correctly for each component, validate file structure and content format
- [ ] **Unit tests for `deploy-context.ts`** — mock AWS SDK calls (`S3 sync`, `StartIngestionJobCommand`) and verify error handling paths
- [ ] **Integration test** — a lightweight check that the generated context files are valid markdown/JSON and contain expected sections
- [ ] **MCP server tool tests** — test that each tool handler returns correct responses for known queries (mock the knowledge base retrieval layer)
- [ ] **Snapshot tests** — consider snapshotting a subset of generated context to catch unintended regressions in the output format

Example test structure:

```
packages/mcp-server/
├── tests/
│   ├── unit/
│   │   ├── prepare-context.spec.ts
│   │   └── deploy-context.spec.ts
│   └── integration/
│       └── context-output.spec.ts
```

---

## Refactoring

- [ ] **Extract AWS logic** — move S3 sync and Bedrock ingestion into a shared utility (e.g., `src/aws/`) so it can be reused or tested independently
- [ ] **Config file** — replace hardcoded env var names with a typed config object (e.g., `src/config.ts`) that validates and documents all required settings
- [ ] **Decouple `prepare-context` from storefront** — currently uses `TSX_TSCONFIG_PATH=../storefront/tsconfig.json`, which creates a tight coupling. Explore making context generation self-contained
- [ ] **Version management** — consider whether versioned directories (`v3.33.0/`, `v4.0.0/`, etc.) should be cleaned up automatically or managed via a retention policy in S3
- [ ] **Logging** — add structured logging (e.g., log level support) instead of raw `console.log`/`console.error` for easier debugging in CI
- [ ] **Dry-run flag** — add a `--dry-run` CLI flag to `deploy-context.ts` so you don't need to manually construct `aws s3 sync --dryrun` commands
- [ ] **Error resilience** — handle partial failures gracefully (e.g., S3 upload succeeds but ingestion fails → don't lose the upload, report clearly)

---

## Things to Watch Out For

| Area | Risk | Mitigation |
|------|------|------------|
| **OIDC trust policy** | Role can only be assumed by the specific GitHub repo/branch | Verify `sub` claim matches your branch in the CDK trust policy |
| **Context size** | Large context files may hit S3 upload limits or Bedrock ingestion limits | Monitor file sizes; chunk if needed |
| **Bedrock quotas** | Ingestion jobs have concurrency limits | Don't trigger multiple deploys simultaneously |
| **Stale knowledge base** | Old versions remain in S3 unless explicitly cleaned | Implement retention policy |
| **Breaking changes in storefront** | `prepare-context` depends on storefront MDX structure | Add integration tests that catch format regressions |
| **Secrets rotation** | AWS credentials/role ARNs may change | Keep `mcp-cdk` outputs in sync with GitHub secrets |
| **Local vs CI drift** | Local `dev-profile` may have different permissions than CI role | Document exact IAM permissions needed; test with both |

