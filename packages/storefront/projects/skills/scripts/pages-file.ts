import path from 'node:path';
import type { Page } from '@porsche-design-system/docs-components/markdown';

/** The pages `collect-pages.ts` renders and `build-skills.ts` writes into the skills. Plain data, so JSON holds it. */
export type CollectedPages = { routes: string[]; pages: Page[] };

export const PAGES_FILE = path.resolve(__dirname, '../generated/pages.json');
