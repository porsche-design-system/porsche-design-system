import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// ── Types (from our DB schema) ────────────────────────────────────

interface BaseItem {
  PK: string;
  SK: string;
}

export interface LatestPointer extends BaseItem {
  PK: 'LATEST';
  SK: 'POINTER';
  version: string;
}

export interface VersionMeta extends BaseItem {
  SK: 'META';
  version: string;
  generatedAt: string;
  docCount: number;
  sourceCommit?: string;
}

export interface CategoryItemEntry {
  name: string;
  sections: string[];
  frameworks: string[];
}

export interface CategoryIndex extends BaseItem {
  SK: `CAT#${string}`;
  category: string;
  items: CategoryItemEntry[];
}

export interface DocEntry extends BaseItem {
  SK: `DOC#${string}`;
  category: string;
  name: string;
  section: string;
  title: string;
  s3Key: string;
  searchText: string;
}

export type PdsDocsItem = LatestPointer | VersionMeta | CategoryIndex | DocEntry;

// ── Constants ─────────────────────────────────────────────────────

const KNOWN_SECTIONS = new Set([
  'quick-ref',
  'usage',
  'api',
  'examples',
  'examples-react',
  'examples-angular',
  'examples-vue',
  'accessibility',
]);

const FRAMEWORK_SECTIONS: Record<string, string> = {
  'examples-react': 'react',
  'examples-angular': 'angular',
  'examples-vue': 'vue',
  examples: 'vanilla-js',
};

// ── Parsing ───────────────────────────────────────────────────────

export interface SeedConfig {
  version: string; // "3.32.0"
  outputDir: string; // root dir of prepared context
  sourceCommit?: string;
}

function parseDocPath(docPath: string): {
  category: string;
  name: string;
  section: string;
} {
  const segments = docPath.split('/');
  const category = segments[0];

  // Components can have nested names (form/input-text) and known sections
  if (segments.length >= 3) {
    const lastSegment = segments[segments.length - 1];
    if (KNOWN_SECTIONS.has(lastSegment)) {
      return {
        category,
        name: segments.slice(1, -1).join('/'),
        section: lastSegment,
      };
    }
  }

  // Single-page doc or unknown section → no section
  return {
    category,
    name: segments.slice(1).join('/'),
    section: '',
  };
}

function extractTitle(content: string, fallbackName: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallbackName;
}

function buildSearchText(title: string, name: string, category: string, section: string, content: string): string {
  const stripped = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/[#*`[\]()>|_~-]/g, '') // remove markdown syntax
    .substring(0, 500);

  return [title, name, category, section, stripped].join(' ').toLowerCase().replace(/\s+/g, ' ').trim();
}

// ── Parse single file → DocEntry ──────────────────────────────────

async function parseDocFile(filePath: string, config: SeedConfig): Promise<DocEntry> {
  const content = await fs.readFile(filePath, 'utf-8');
  const versionKey = `v${config.version}`;

  const docPath = path
    .relative(config.outputDir, filePath)
    .replace(/\.mdx$/, '')
    .replace(/\/page$/, '');

  const { category, name, section } = parseDocPath(docPath);
  const title = extractTitle(content, name);
  const searchText = buildSearchText(title, name, category, section, content);

  return {
    PK: versionKey,
    SK: `DOC#${docPath}` as `DOC#${string}`,
    category,
    name,
    section,
    title,
    s3Key: `${versionKey}/${docPath}/page.mdx`,
    searchText,
  };
}

// ── Recursively collect all DocEntries ─────────────────────────────

async function collectDocEntries(dir: string, config: SeedConfig): Promise<DocEntry[]> {
  const entries: DocEntry[] = [];

  async function walk(currentDir: string): Promise<void> {
    const dirEntries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of dirEntries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name === 'page.mdx') {
        entries.push(await parseDocFile(fullPath, config));
      }
    }
  }

  await walk(dir);
  return entries;
}

// ── Build all 4 item types from DocEntries ─────────────────────────

function buildCategoryIndexes(docs: DocEntry[], versionKey: string): CategoryIndex[] {
  // Group docs by category → name
  const categoryMap = new Map<string, Map<string, { sections: Set<string>; frameworks: Set<string> }>>();

  for (const doc of docs) {
    if (!categoryMap.has(doc.category)) {
      categoryMap.set(doc.category, new Map());
    }
    const nameMap = categoryMap.get(doc.category);
    if (!nameMap) continue;

    if (!nameMap.has(doc.name)) {
      nameMap.set(doc.name, { sections: new Set(), frameworks: new Set() });
    }
    const entry = nameMap.get(doc.name);
    if (!entry) continue;

    if (doc.section) {
      entry.sections.add(doc.section);
    }

    // Derive framework from section name
    const framework = FRAMEWORK_SECTIONS[doc.section];
    if (framework) {
      entry.frameworks.add(framework);
    }
  }

  // Convert to CategoryIndex items
  const indexes: CategoryIndex[] = [];

  for (const [category, nameMap] of Array.from(categoryMap.entries())) {
    const items: CategoryItemEntry[] = [];

    for (const [name, data] of Array.from(nameMap.entries())) {
      items.push({
        name,
        sections: [...data.sections].sort(),
        frameworks: [...data.frameworks].sort(),
      });
    }

    // Sort items by name for consistent output
    items.sort((a, b) => a.name.localeCompare(b.name));

    indexes.push({
      PK: versionKey,
      SK: `CAT#${category}` as `CAT#${string}`,
      category,
      items,
    });
  }

  return indexes;
}

export async function buildAllItems(config: SeedConfig): Promise<PdsDocsItem[]> {
  const versionKey = `v${config.version}`;
  const docs = await collectDocEntries(config.outputDir, config);

  // 1. LATEST pointer
  const latest: LatestPointer = {
    PK: 'LATEST',
    SK: 'POINTER',
    version: config.version,
  };

  // 2. Version metadata
  const meta: VersionMeta = {
    PK: versionKey,
    SK: 'META',
    version: config.version,
    generatedAt: new Date().toISOString(),
    docCount: docs.length,
    ...(config.sourceCommit && { sourceCommit: config.sourceCommit }),
  };

  // 3. Category indexes (aggregated from docs)
  const categoryIndexes = buildCategoryIndexes(docs, versionKey);

  // 4. Doc entries (already built)
  return [latest, meta, ...categoryIndexes, ...docs];
}
