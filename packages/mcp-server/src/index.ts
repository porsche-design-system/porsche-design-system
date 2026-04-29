#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const API_BASE = process.env.PDS_MCP_API_BASE || 'https://37w7yuiql4.execute-api.eu-central-1.amazonaws.com/prod/';

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
    instructions: 'Porsche Design System (PDS) documentation server. Use the query tool to search the docs.',
  }
);

server.registerTool(
  'query',
  {
    title: 'Query documentation',
    description: 'Semantic search over Porsche Design System (PDS) documentation. Pass a natural-language query and optionally narrow results with the metadata filters below.',
    inputSchema: z.object({
      query: z.string().describe('The name of the topic to retrieve. E.g. "button" or "form/checkbox".'),
      category: z
        .enum([
          'components',
          'styles',
          'patterns',
          'must-know',
          'developing',
          'partials',
          'tailwindcss',
          'ag-grid',
          'templates',
          'help',
          'news',
          'designing',
          'accessibility-statement',
          'license',
        ])
        .optional()
        .describe('Filter by top-level category.'),
      component: z
        .enum([
          'accordion',
          'banner',
          'button',
          'button-group',
          'button-pure',
          'button-tile',
          'canvas',
          'carousel',
          'checkbox',
          'checkbox-wrapper',
          'content-wrapper',
          'crest',
          'display',
          'divider',
          'drilldown',
          'fieldset',
          'fieldset-wrapper',
          'flag',
          'flex',
          'flyout',
          'grid',
          'heading',
          'headline',
          'icon',
          'inline-notification',
          'input-date',
          'input-email',
          'input-month',
          'input-number',
          'input-password',
          'input-search',
          'input-tel',
          'input-text',
          'input-time',
          'input-url',
          'input-week',
          'link',
          'link-pure',
          'link-social',
          'link-tile',
          'link-tile-model-signature',
          'link-tile-product',
          'marque',
          'modal',
          'model-signature',
          'multi-select',
          'pagination',
          'pin-code',
          'popover',
          'radio-button-wrapper',
          'radio-group',
          'scroller',
          'segmented-control',
          'select',
          'select-wrapper',
          'sheet',
          'spinner',
          'stepper-horizontal',
          'switch',
          'table',
          'tabs',
          'tabs-bar',
          'tag',
          'tag-dismissible',
          'text',
          'text-field-wrapper',
          'text-list',
          'textarea',
          'textarea-wrapper',
          'toast',
          'wordmark',
        ])
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
