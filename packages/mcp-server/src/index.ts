#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ── Config ────────────────────────────────────────────────────────

const API_BASE = process.env.PDS_MCP_API_BASE;

if (!API_BASE) {
  console.error('Missing required env variable PDS_MCP_API_BASE');
  process.exit(1);
}

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

const server = new McpServer(
  {
    name: 'pds-mcp',
    version: '1.0.0',
  },
  {
    instructions:
      'Porsche Design System (PDS) documentation server. Use the query tool to search 670+ docs covering components, styles, patterns, framework guides, and more.',
  }
);

server.registerTool(
  'query',
  {
    title: 'Query documentation',
    description:
      'Semantic search over Porsche Design System (PDS) documentation (670+ docs). ' +
      'Use for any question about PDS components, styles, patterns, or guides.\n\n' +
      'Categories: components (73, e.g. button, tabs, modal, select, carousel…), ' +
      'styles (border, typography, spacing…), patterns (forms, header, footer…), ' +
      'must-know (accessibility, performance, versioning…), developing (React, Angular, Vue, Next.js…), ' +
      'partials, Tailwind CSS utilities, AG Grid theme, help/FAQ, news/changelog.\n\n' +
      'Pass a natural-language query. Optionally narrow results with metadata filters.',
    inputSchema: z.object({
      query: z.string().describe('The name of the topic to retrieve. E.g. "button" or "form/checkbox".'),
      category: z
        .string()
        .optional()
        .describe(
          'Filter by top-level category. One of: components, styles, patterns, must-know, developing, partials, tailwindcss, ag-grid, templates, help, news, designing, accessibility-statement, license.'
        ),
      component: z
        .string()
        .optional()
        .describe('Filter by component name (only within category "components"). E.g. "button", "tabs", "modal".'),
      section: z
        .string()
        .optional()
        .describe(
          'Filter by section within a topic. E.g. "introduction", "examples", "api", "usage", "accessibility".'
        ),
      framework: z
        .enum(['react', 'angular', 'vue'])
        .optional()
        .describe('Filter for framework-specific docs. One of: react, angular, vue.'),
      version: z
        .string()
        .optional()
        .describe('Filter for specific version of the documentation. E.g. "3.33.0", "4.0.0".'),
    }),
  },
  async ({ query, category, component, section, framework, version }) => {
    const filter: Record<string, string> = {};
    if (category) filter.category = category;
    if (component) filter.component = component;
    if (section) filter.section = section;
    if (framework) filter.framework = framework;
    if (version) filter.version = version;

    const body: Record<string, unknown> = { query };
    if (Object.keys(filter).length > 0) {
      body.filter = filter;
    }

    const data = await api('POST', '/query', body);
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
