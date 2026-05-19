import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { z } from 'zod';
import { version } from '../package.json';
import categories from './generated/categories.json';

const COMPONENT_NAMES = TAG_NAMES.map((tag) => tag.replace(/^p-/, ''));
const CATEGORIES: string[] = categories;
const API_BASE = process.env.PDS_MCP_API_BASE || 'https://37w7yuiql4.execute-api.eu-central-1.amazonaws.com/prod/';

const api = async <T = unknown>(method: 'GET' | 'POST', path: string, body?: Record<string, unknown>): Promise<T> => {
  const url = new URL(path, API_BASE);

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
};

const textResult = (data: unknown) => {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
};

const server = new McpServer(
  {
    name: 'pds-mcp',
    version: version,
  },
  {
    instructions: 'Porsche Design System (PDS) documentation server. Use the query tool to search the docs.',
  }
);

server.registerTool(
  'list-components',
  {
    title: 'List of components',
    description: 'List of all components',
  },
  async () => {
    return textResult([...COMPONENT_NAMES]);
  }
);

server.registerTool(
  'query',
  {
    title: 'Query documentation',
    description:
      'Semantic search over Porsche Design System (PDS) documentation. Pass a natural-language query and optionally narrow results with the metadata filters below.',
    inputSchema: z.object({
      query: z.string().describe('The name of the topic to retrieve. E.g. "button" or "form/checkbox".'),
      category: z
        .enum([...CATEGORIES] as [string, ...string[]])
        .optional()
        .describe('Filter by top-level category.'),
      component: z
        .enum([...COMPONENT_NAMES] as [string, ...string[]])
        .optional()
        .describe('Filter by component name (only within category "components").'),
      framework: z
        .enum(['react', 'angular', 'vue', 'vanilla-js'])
        .optional()
        .describe('Filter for framework-specific docs.'),
      version: z.string().describe('Filter for specific version of the documentation. E.g. "3.33.0", "4.0.0".'),
    }),
  },
  async ({ query, category, component, framework, version }) => {
    const filter: Record<string, string> = {};
    if (category) filter.category = category;
    if (component) filter.component = component;
    if (framework) filter.framework = framework;
    if (version) filter.version = version;

    const body: Record<string, unknown> = { query };
    if (Object.keys(filter).length > 0) {
      body.filter = filter;
    }

    const data = await api('POST', 'query', body);
    return textResult(data);
  }
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`PDS MCP client connected. Listening for queries…`);
};

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
