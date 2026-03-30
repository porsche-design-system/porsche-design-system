import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// ──────────────────────────────────────────────────────────────────────────────
// Paths (resolved relative to the monorepo root)
// ──────────────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '..', '..', '..', '..');

export const sourceDir = path.join(monorepoRoot, 'packages/storefront/src/app/');
export const outputDir = path.join(monorepoRoot, 'packages/mcp-server/context-snapshots');
export const examplesDir = path.join(monorepoRoot, 'packages/shared/src/examples');
export const componentMetaPath = path.join(monorepoRoot, 'packages/component-meta/src/lib/componentMeta.ts');
export const storefrontSrcDir = path.join(monorepoRoot, 'packages/storefront/src');

// ──────────────────────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────────────────────

export const FRAMEWORKS = ['vanilla-js', 'react', 'angular', 'vue'] as const;
export type Framework = (typeof FRAMEWORKS)[number];

/** Maximum number of version entries to keep in the changelog */
export const CHANGELOG_MAX_VERSIONS = 10;

/** Pages with less meaningful content (bytes) than this are removed */
export const MIN_PAGE_CONTENT_BYTES = 100;

/** Props with more allowed values than this get a shared reference page instead of inline values */
export const LARGE_ENUM_THRESHOLD = 20;

/** Directories to skip entirely during source traversal */
export const SKIP_DIRECTORIES = ['-', '[component]'];

export type BedrockMetadataValue =
  | { type: 'STRING'; stringValue: string }
  | { type: 'NUMBER'; numberValue: number }
  | { type: 'BOOLEAN'; booleanValue: boolean };

export interface BedrockMetadataAttribute {
  value: BedrockMetadataValue;
  includeForEmbedding: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// Shared mutable state (populated during the pipeline)
// ──────────────────────────────────────────────────────────────────────────────

/** Caches loaded example files to avoid repeated disk reads */
export const examplesCache: Record<string, { frameworkMarkup: Record<string, string> }> = {};

/** Component meta cache (loaded once from the TS module) */
export let componentMetaCache: Record<string, any> | null = null;
export function setComponentMetaCache(value: Record<string, any>) {
  componentMetaCache = value;
}

/** Descriptions extracted from configurator pages before they are dropped */
export const componentDescriptions: Record<string, string> = {};

/** Raw MDX source for every examples/page.mdx — needed to re-process per framework */
export const rawExamplesContent: Record<string, string> = {};

/** Raw MDX source for pages containing ComponentStory — needed to re-process per framework */
export const rawStoriesContent: Record<string, string> = {};

/** Caches generated story framework markup to avoid re-importing story modules */
export const storiesCache: Record<string, Record<string, string>> = {};
