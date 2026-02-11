import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = path.resolve(__dirname, '..', 'context-snapshots');
const META_PATH = path.join(SNAPSHOTS_DIR, 'snapshot-meta.json');

// In-memory index built at startup for fast search
interface DocEntry {
  /** Relative path like "components/button/usage" */
  path: string;
  /** File content */
  content: string;
}

interface SnapshotMeta {
  version: string;
  generatedAt: string;
  documentCount: number;
  categories: string[];
}

let docsIndex: DocEntry[] = [];
let snapshotMeta: SnapshotMeta | null = null;

async function loadMeta(): Promise<SnapshotMeta | null> {
  try {
    const raw = await fs.readFile(META_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function buildIndex(dir: string, relative = ''): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = relative ? `${relative}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await buildIndex(fullPath, relPath);
    } else if (entry.isFile() && entry.name === 'page.mdx') {
      const content = await fs.readFile(fullPath, 'utf-8');
      const docPath = relative;
      docsIndex.push({ path: docPath, content });
    }
  }
}

function buildCategoryTree(): Record<string, string[]> {
  const tree: Record<string, string[]> = {};

  for (const doc of docsIndex) {
    const parts = doc.path.split('/');
    const category = parts[0];
    if (!tree[category]) {
      tree[category] = [];
    }
    tree[category].push(doc.path);
  }

  for (const key of Object.keys(tree)) {
    tree[key].sort();
  }

  return tree;
}

// --- Tool handlers ---

function handleListDocs(args: Record<string, unknown>) {
  const category = args.category as string | undefined;
  const tree = buildCategoryTree();

  if (category) {
    const entries = tree[category];
    if (!entries) {
      const available = Object.keys(tree).join(', ');
      return {
        content: [{ type: 'text', text: `Category "${category}" not found. Available categories: ${available}` }],
      };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ [category]: entries }, null, 2) }] };
  }

  const summary = Object.entries(tree).map(([cat, paths]) => `${cat} (${paths.length} pages)`);
  return {
    content: [
      {
        type: 'text',
        text: `Available documentation categories:\n${summary.join('\n')}\n\n${JSON.stringify(tree, null, 2)}`,
      },
    ],
  };
}

function handleGetDoc(args: Record<string, unknown>) {
  const docPath = (args.path as string).replace(/^\/+|\/+$/g, '');

  const doc = docsIndex.find((d) => d.path === docPath);
  if (!doc) {
    const candidates = docsIndex.filter((d) => d.path.includes(docPath)).map((d) => d.path);
    if (candidates.length > 0) {
      return {
        content: [
          {
            type: 'text',
            text: `Document "${docPath}" not found. Did you mean one of these?\n${candidates.join('\n')}`,
          },
        ],
      };
    }
    return {
      content: [{ type: 'text', text: `Document "${docPath}" not found. Use list-docs to see available pages.` }],
    };
  }

  return { content: [{ type: 'text', text: doc.content }] };
}

function handleSearchDocs(args: Record<string, unknown>) {
  const query = args.query as string;
  const maxResults = (args.max_results as number) ?? 10;
  const queryLower = query.toLowerCase();
  const results: { path: string; excerpt: string }[] = [];

  for (const doc of docsIndex) {
    const contentLower = doc.content.toLowerCase();
    const idx = contentLower.indexOf(queryLower);
    if (idx === -1) continue;

    const start = Math.max(0, idx - 100);
    const end = Math.min(doc.content.length, idx + query.length + 200);
    const excerpt =
      (start > 0 ? '...' : '') + doc.content.slice(start, end).trim() + (end < doc.content.length ? '...' : '');

    results.push({ path: doc.path, excerpt });
    if (results.length >= maxResults) break;
  }

  if (results.length === 0) {
    return { content: [{ type: 'text', text: `No results found for "${query}".` }] };
  }

  const formatted = results.map((r) => `### ${r.path}\n${r.excerpt}`).join('\n\n---\n\n');
  return { content: [{ type: 'text', text: `Found ${results.length} result(s) for "${query}":\n\n${formatted}` }] };
}

function handleGetComponentOverview(args: Record<string, unknown>) {
  const component = (args.component as string).toLowerCase().replace(/^p-/, '');
  const prefix = `components/${component}`;
  const sections = docsIndex.filter((d) => d.path.startsWith(prefix));

  if (sections.length === 0) {
    const components = [
      ...new Set(docsIndex.filter((d) => d.path.startsWith('components/')).map((d) => d.path.split('/')[1])),
    ];
    return {
      content: [
        {
          type: 'text',
          text: `Component "${component}" not found. Available components:\n${components.sort().join(', ')}`,
        },
      ],
    };
  }

  const sectionOrder = ['usage', 'examples', 'api', 'configurator', 'accessibility'];
  const sorted = sections.sort((a, b) => {
    const aSection = a.path.split('/').pop() || '';
    const bSection = b.path.split('/').pop() || '';
    return sectionOrder.indexOf(aSection) - sectionOrder.indexOf(bSection);
  });

  const combined = sorted.map((s) => {
    const section = s.path.split('/').pop() || 'overview';
    return `${'='.repeat(60)}\n## ${section.toUpperCase()}\n${'='.repeat(60)}\n\n${s.content}`;
  });

  return { content: [{ type: 'text', text: `# Component: ${component}\n\n${combined.join('\n\n')}` }] };
}

function handleGetSnapshotVersion() {
  if (!snapshotMeta) {
    return { content: [{ type: 'text', text: 'No snapshot metadata available. Run prepare-context to generate it.' }] };
  }
  return { content: [{ type: 'text', text: JSON.stringify(snapshotMeta, null, 2) }] };
}

// --- Tool definitions (plain JSON Schema, no Zod) ---

const TOOLS = [
  {
    name: 'list-docs',
    description:
      'List all available Porsche Design System documentation pages, organized by category. Returns the full tree of documentation paths that can be fetched with get-doc.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: {
          type: 'string',
          description:
            'Optional category filter. e.g. "components", "styles", "must-know". Omit to list all categories.',
        },
      },
    },
  },
  {
    name: 'get-doc',
    description:
      'Get the full content of a Porsche Design System documentation page. Use list-docs first to discover available paths.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        path: {
          type: 'string',
          description: 'Documentation path, e.g. "components/button/usage" or "styles/typography"',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'search-docs',
    description:
      'Full-text search across all Porsche Design System documentation. Returns matching excerpts with their document paths. Use this to find relevant components, styles, or guidelines.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Search query. Matches against document content (case-insensitive).',
        },
        max_results: {
          type: 'number',
          description: 'Maximum number of results to return. Defaults to 10.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get-component-overview',
    description:
      'Get a comprehensive overview of a specific Porsche Design System component, combining all available documentation sections (usage, examples, API, accessibility) into a single response.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        component: {
          type: 'string',
          description: 'Component name, e.g. "button", "input-text", "tabs"',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'get-snapshot-version',
    description:
      'Get metadata about the current documentation snapshot, including version, generation timestamp, and source commit.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
];

// --- MCP Server setup ---

const server = new Server({ name: 'porsche-design-system-docs', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  switch (name) {
    case 'list-docs':
      return handleListDocs(args);
    case 'get-doc':
      return handleGetDoc(args);
    case 'search-docs':
      return handleSearchDocs(args);
    case 'get-component-overview':
      return handleGetComponentOverview(args);
    case 'get-snapshot-version':
      return handleGetSnapshotVersion();
    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
});

// --- Start server ---

async function main() {
  try {
    await buildIndex(SNAPSHOTS_DIR);
    docsIndex = docsIndex.filter((d) => d.path !== '');
  } catch (err) {
    console.error(`Failed to build docs index from ${SNAPSHOTS_DIR}:`, err);
    console.error('Run "yarn prepare-context" first to generate the documentation snapshots.');
    process.exit(1);
  }

  snapshotMeta = await loadMeta();

  console.error(
    `PDS MCP Server loaded ${docsIndex.length} docs` +
      (snapshotMeta ? ` (snapshot v${snapshotMeta.version}, ${snapshotMeta.generatedAt})` : '')
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
