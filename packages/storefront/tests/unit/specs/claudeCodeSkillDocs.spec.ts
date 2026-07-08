import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Guards the documented install command on the Claude Code skill page. `components-react` ships more
 * than one bin, so a bare `npx @porsche-design-system/components-react pds-skill` cannot determine the
 * executable to run and fails. The page must use the `npx --package=<pkg> pds-skill` form, which names
 * the bin explicitly and resolves for all four wrappers. See the `pds-skill npx resolution` spec in
 * components-js for the package-side invariant.
 */
const PAGE_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../src/app/(main)/developing/claude-code-skill/page.mdx'
);

describe('claude-code-skill docs page', () => {
  const page = fs.readFileSync(PAGE_PATH, 'utf8');
  const FRAMEWORKS = ['js', 'angular', 'react', 'vue'];

  it('documents the `npx --package=<pkg> pds-skill` install form for every wrapper', () => {
    for (const framework of FRAMEWORKS) {
      expect(page).toContain(`npx --package=@porsche-design-system/components-${framework} pds-skill`);
    }
  });

  it('never uses the bare `npx <pkg> pds-skill` command form (fails for multi-bin components-react)', () => {
    // Anchored to line start so it targets command lines, not the inline prose that explains why the
    // bare form is unsafe.
    const bareCommand = /^npx\s+@porsche-design-system\/components-[a-z{|}-]+\s+pds-skill/m;
    expect(bareCommand.test(page)).toBe(false);
  });
});
