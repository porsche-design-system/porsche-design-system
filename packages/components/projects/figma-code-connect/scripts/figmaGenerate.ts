import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { sync as globbySync } from 'fast-glob';
import { acceptedGapsPath, type Dependencies, generate } from '../figma/generate';
import { libraryUrl, pdsVersion } from '../figma/library';
import { printed } from '../figma/messages';
import type { Snapshot } from '../figma/snapshot';
import { pull, pullHistory } from './figmaPull';

// Writes what figma/generate.ts renders from a fresh pull into generated/, and deletes files whose component set is
// gone; `--check` compares instead. Rationale: docs/figma-code-connect.md.
const check = process.argv.includes('--check');
// history only rewords design lines; `--check` and the publish job print lines no one reads
const withHistory = !check && !process.argv.includes('--no-history');
const reason = (error: unknown): string => (error instanceof Error ? error.message : String(error));

const main = async (): Promise<void> => {
  let snapshot: Snapshot;
  try {
    snapshot = await pull();
  } catch (error) {
    console.error(printed(`Figma could not be read: ${reason(error)}`));
    // the workflow tells this outage from a repository mistake by the exit code
    process.exit(2);
  }
  const acceptedGaps: Record<string, string[]> = JSON.parse(readFileSync(acceptedGapsPath, 'utf8'));
  const dependencies: Dependencies = {
    getComponentMeta,
    tags: TAG_NAMES.filter((tag) => !(INTERNAL_TAG_NAMES as readonly string[]).includes(tag)),
    outputRoot: 'generated',
    fileUrl: process.env.FIGMA_PUBLISH_FILE_URL ?? libraryUrl(), // the env points a test run at a branch of the library
    version: pdsVersion(),
  };
  let generated = generate(snapshot, acceptedGaps, dependencies);
  // a property no rule places: history improves its line, and generating never needs it
  if (withHistory && generated.unresolved.length) {
    try {
      const { resolved, steps } = await pullHistory(generated.unresolved);
      console.log(
        `read ${steps} earlier version(s) of ${generated.unresolved.length} component set(s) with a property no rule places`
      );
      generated = generate({ ...snapshot, history: resolved }, acceptedGaps, dependencies);
    } catch (error) {
      console.log(
        `the library's history could not be read, so such properties are reported without it: ${reason(error)}`
      );
    }
  }
  const { files, errors, designLines, skipped, componentCount, acceptedGapCleanup } = generated;
  let written = 0;
  let deleted = 0;

  for (const [file, content] of Object.entries(files)) {
    if (check) {
      // the accepted gaps are neither compared nor written here: a pruned entry is a cleanup line, not a failure
      if (file !== acceptedGapsPath && (!existsSync(file) || readFileSync(file, 'utf8') !== content))
        errors.push(`${file} is stale — run "npm run figma:generate"`);
      continue;
    }
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    written++;
  }

  // a generated file whose component set left the library: flagged by --check, deleted otherwise
  for (const file of globbySync(['generated/templates/**/*.figma.ts', 'generated/icons/*']).filter(
    (f) => !(f in files)
  )) {
    if (check) {
      errors.push(`${file} has no component set in the library — run "npm run figma:generate"`);
      continue;
    }
    unlinkSync(file);
    deleted++;
    if (readdirSync(dirname(file)).length === 0) rmdirSync(dirname(file));
  }

  if (skipped.length)
    console.log(`skipped ${skipped.length} component sets without a PDS component: ${skipped.join(', ')}`);
  if (designLines.length) {
    console.error(designLines.join('\n'));
    console.error(`${designLines.length} change(s) only design can make in Figma`);
  }
  if (acceptedGapCleanup.length) console.error(acceptedGapCleanup.join('\n'));
  if (errors.length) {
    console.error(errors.map(printed).join('\n'));
    process.exit(1);
  }
  console.log(
    check
      ? `generated files for ${componentCount} components are up to date`
      : `generated ${written} files for ${componentCount} components${deleted ? `, deleted ${deleted} stale` : ''}`
  );
};

main();
