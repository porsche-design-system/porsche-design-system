import { readdirSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { version } from '@porsche-design-system/components/package.json';

// Paths (resolved relative to the monorepo root)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '..', '..', '..', '..');

export const sourceDir = path.join(monorepoRoot, 'packages/storefront/src/app/');
export const outputDir = path.join(monorepoRoot, `packages/mcp-server/v${version}`);
export const examplesDir = path.join(monorepoRoot, 'packages/shared/src/examples');
export const changelogSourcePath = path.join(monorepoRoot, 'packages/components/CHANGELOG.md');
export const componentMetaPath = path.join(monorepoRoot, 'packages/component-meta/src/lib/componentMeta.ts');
export const storefrontSrcDir = path.join(monorepoRoot, 'packages/storefront/src');

// Constants

export const FRAMEWORKS = ['vanilla-js', 'react', 'angular', 'vue'] as const;
export type Framework = (typeof FRAMEWORKS)[number];

/** Maximum number of version entries to keep in the changelog */
export const CHANGELOG_MAX_VERSIONS = 2;

/** Pages with fewer meaningful characters than this are removed */
export const MIN_PAGE_CONTENT_CHARS = 100;

/** Props with more allowed values than this get a shared reference page instead of inline values */
export const LARGE_ENUM_THRESHOLD = 20;

/** Directories to skip entirely during source traversal */
export const SKIP_DIRECTORIES = ['-', '[component]'];

/** All top-level category directory names from the storefront source */
export const CATEGORIES = readdirSync(sourceDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP_DIRECTORIES.includes(d.name))
  .map((d) => d.name);

export type BedrockMetadataValue =
  | { type: 'STRING'; stringValue: string }
  | { type: 'NUMBER'; numberValue: number }
  | { type: 'BOOLEAN'; booleanValue: boolean };

export interface BedrockMetadataAttribute {
  value: BedrockMetadataValue;
  includeForEmbedding: boolean;
}

// Shared mutable state (populated during the pipeline)

/** Caches loaded example files to avoid repeated disk reads */
export const examplesCache: Record<string, { frameworkMarkup: Record<string, string> }> = {};

/** Component meta cache (loaded once from the TS module) */
export let componentMetaCache: Record<string, any> | null = null;
export const setComponentMetaCache = (value: Record<string, any>) => {
  componentMetaCache = value;
};

/** Raw MDX source for every examples/page.mdx — needed to re-process per framework */
export const rawExamplesContent: Record<string, string> = {};

/** Raw MDX source for pages containing ComponentStory — needed to re-process per framework */
export const rawStoriesContent: Record<string, string> = {};

/** Caches generated story framework markup to avoid re-importing story modules */
export const storiesCache: Record<string, Record<string, string>> = {};

export const VERSION: string = version;
