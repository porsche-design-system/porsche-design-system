#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ── Config ────────────────────────────────────────────────────────

const API_BASE = process.env.PDS_MCP_API_URL;

// ── API helper ────────────────────────────────────────────────────

async function api<T = unknown>(method: 'GET' | 'POST', path: string, body?: Record<string, unknown>): Promise<T> {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json() as T;
}

function textResult(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
}

const server = new McpServer({
  name: 'pds-mcp',
  version: '1.0.0',
});

server.registerTool(
  'get-version',
  {
    description:
      'Returns the current Porsche Design System documentation version, build timestamp, and total doc count.',
  },
  async () => {
    const data = await api('GET', '/version');
    return textResult(data);
  }
);

server.registerTool(
  'list-docs',
  {
    description:
      'Lists available documentation pages with their sections and frameworks. ' +
      'Use to discover what components, styles, and guides exist before calling get-doc.',
    inputSchema: z.object({
      category: z
        .string()
        .optional()
        .describe('Filter by category: "components", "styles", "must-know". Omit to list all.'),
    }),
  },
  async ({ category }) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const data = await api('GET', `/docs${query}`);
    return textResult(data);
  }
);

server.registerTool(
  'get-doc',
  {
    description:
      'Get documentation for a specific topic. Returns quick-ref by default (~500 tokens). ' +
      'Pass sections to get more detail, or sections: ["all"] for everything. ' +
      'Every response includes availableSections and availableFrameworks so you know what to request next.',
    inputSchema: z.object({
      topic: z.string().describe('Component or topic name: "button", "typography", "tabs", "form/input-text".'),
      sections: z
        .array(z.string())
        .optional()
        .describe(
          'Sections to fetch: ["quick-ref"], ["usage", "api"], ["all"]. ' +
            'Omit for quick-ref only. Options: quick-ref, usage, api, examples, accessibility.'
        ),
      framework: z
        .enum(['vanilla-js', 'react', 'angular', 'vue'])
        .optional()
        .describe('Framework for examples section. Only affects examples. Defaults to vanilla-js.'),
    }),
  },
  async ({ topic, sections, framework }) => {
    const body: Record<string, unknown> = { topic };
    if (sections) body.sections = sections;
    if (framework) body.framework = framework;

    const data = await api('POST', '/docs/get', body);
    return textResult(data);
  }
);

// ── Tool: search-docs ─────────────────────────────────────────────

server.registerTool(
  'search-docs',
  {
    description:
      'Full-text search across all documentation. Returns matching docs with optional content excerpts. ' +
      "Use for finding topics when you don't know the exact component name.",
    inputSchema: z.object({
      query: z.string().describe('Search query (case-insensitive).'),
      max_results: z.number().int().min(1).max(20).optional().describe('Maximum results to return. Default: 5.'),
      include_content: z
        .boolean()
        .optional()
        .describe('Include first ~200 words of each match. Default: true. Set false for titles only.'),
    }),
  },
  async ({ query, max_results, include_content }) => {
    const body: Record<string, unknown> = { query };
    if (max_results !== undefined) body.max_results = max_results;
    if (include_content !== undefined) body.include_content = include_content;

    const data = await api('POST', '/docs/search', body);
    return textResult(data);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`PDS MCP client connected → ${API_BASE}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
