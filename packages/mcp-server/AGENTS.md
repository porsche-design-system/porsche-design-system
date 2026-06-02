# packages/mcp-server — AGENTS.md

> AI assistant guidance for the MCP Server package.

## Overview

This package implements the **Porsche Design System MCP Server** — a Model Context Protocol server that provides AI assistants with up-to-date PDS documentation via semantic search backed by AWS Bedrock Knowledge Base.

## Architecture

```
packages/mcp-server/
├── src/
│   ├── index.ts              # MCP server entry point (tools: list-components, query)
│   └── generated/            # Auto-generated files (categories.json)
├── scripts/
│   ├── generate-categories.ts
│   └── prepare-context/      # Context snapshot pipeline
│       ├── index.ts          # Main orchestrator (7-step pipeline)
│       ├── config.ts         # Configuration constants
│       └── transform.ts      # MDX → Markdown transformation
├── v{version}/               # Generated context snapshots (per version)
├── context-snapshots/        # Legacy/working directory
├── rollup.config.js          # Bundle config for publishable MCP server
└── package.json
```

## Key Concepts

### MCP Server (`src/index.ts`)

- Exposes two tools via Model Context Protocol:
  - `list-components` — returns all PDS component names
  - `query` — semantic search over PDS docs with optional filters (category, component, framework, version)
- Communicates via stdio transport
- Queries an AWS API Gateway endpoint backed by Bedrock Knowledge Base

### Context Preparation (`scripts/prepare-context/`)

A 7-step pipeline that transforms storefront MDX sources into Bedrock-ingestible documents:

1. **Copy** `page.mdx` files from storefront source
2. **Generate** `categories.json` for the MCP server
3. **Process** non-framework pages (strip JSX, resolve imports)
4. **Generate** per-framework variants (React, Angular, Vue, vanilla-js)
5. **Truncate** changelog to recent versions
6. **Generate** shared references (icon names, flag names from component-meta)
7. **Generate** Bedrock metadata sidecar files (`.metadata.json`)

### Deploy (`scripts/deploy-context.ts` at repo root)

- Syncs versioned context snapshots to S3
- Triggers Bedrock Knowledge Base ingestion job
- Requires: `S3_BUCKET_NAME`, `KNOWLEDGE_BASE_ID`, `DATA_SOURCE_ID` env vars

## Commands

```bash
# From repo root:
npm run build:mcp-server      # Bundle the MCP server
npm run prepare-context       # Run the context snapshot pipeline
npm run deploy-context        # Deploy context to AWS (needs credentials)
npm run dev:mcp-server        # Run MCP server in dev mode
npm run start:mcp-server      # Run built MCP server
```

## Dependencies

- **Build-time**: `shared`, `tokens`, `assets`, `styles`, `utilities`, `component-meta`, `components`, `components-js` (all must be built first)
- **Runtime**: `@modelcontextprotocol/sdk`, `zod`, `@porsche-design-system/shared`
- **Deploy**: AWS CLI, `@aws-sdk/client-bedrock-agent`
- **prepare-context**: Reads from `packages/storefront/src/app/` and `packages/component-meta/`

## File Conventions

| File | Purpose |
|------|---------|
| `v{version}/` | Output directory for context snapshots of that PDS version |
| `*.metadata.json` | Bedrock Knowledge Base metadata sidecar (category, component, framework, version) |
| `src/generated/` | Auto-generated files consumed by the MCP server at runtime |

## When Modifying This Package

- **Adding a new tool**: Add `server.registerTool()` in `src/index.ts`. Follow existing patterns for input schema (zod) and response format (`textResult`).
- **Changing context output**: Modify `scripts/prepare-context/transform.ts` for content transformation or `index.ts` for pipeline steps.
- **Changing metadata structure**: Update `deriveMetadataAttributes()` in `scripts/prepare-context/index.ts`. Ensure Bedrock data source config in `mcp-cdk` repo matches.
- **Adding a filter**: Update both the `query` tool's zod schema in `src/index.ts` and the metadata generation in `prepare-context`.

## Testing (current status: none — see NEXT_STEPS.md)

No tests exist yet. When adding tests:

- Use **Vitest** (consistent with repo)
- Mock `fetch` for API calls in server tests
- Mock `fs` and AWS SDK for prepare-context/deploy tests
- Test file: `tests/unit/{module}.spec.ts`

## Pitfalls

- `prepare-context` requires `TSX_TSCONFIG_PATH=../storefront/tsconfig.json` due to storefront path aliases
- The `v{version}/` directories are **generated output** — don't manually edit them
- The API base URL is hardcoded; override with `PDS_MCP_API_BASE` env var for testing
- Context snapshots include metadata sidecars that must match the Bedrock data source schema configured in the `mcp-cdk` repo

