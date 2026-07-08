import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { prepareAccessibilityAuditDownloads } from '../../../scripts/prepareAccessibilityAuditDownloads';

type Fixture = {
  root: string;
  skillSource: string;
  downloadsDir: string;
};

const createFixture = (): Fixture => {
  const root = mkdtempSync(join(tmpdir(), 'pds-a11y-audit-'));
  const skillSource = join(root, 'skill');
  const downloadsDir = join(root, 'downloads');

  mkdirSync(join(skillSource, 'references'), { recursive: true });
  writeFileSync(join(skillSource, 'SKILL.md'), '# Accessibility Audit Skill');
  writeFileSync(join(skillSource, 'references', 'report-template.md'), '# Report Template');
  mkdirSync(downloadsDir, { recursive: true });
  writeFileSync(join(downloadsDir, 'accessibility-audit-bundle-README.md'), '# Bundle README');

  return { root, skillSource, downloadsDir };
};

const assertZipContains = (zipPath: string, entryName: string): void => {
  expect(readFileSync(zipPath).includes(Buffer.from(entryName))).toBe(true);
};

describe('prepareAccessibilityAuditDownloads()', () => {
  let fixture: Fixture | undefined;

  afterEach(() => {
    if (fixture) {
      rmSync(fixture.root, { recursive: true, force: true });
      fixture = undefined;
    }
  });

  it('syncs skill files, report template, and creates a valid zip bundle', async () => {
    fixture = createFixture();
    const { skillSource, downloadsDir } = fixture;
    const zipPath = join(downloadsDir, 'accessibility-audit.zip');

    await prepareAccessibilityAuditDownloads({ skillSource, downloadsDir });

    expect(existsSync(join(downloadsDir, 'accessibility-audit', 'SKILL.md'))).toBe(true);
    expect(existsSync(join(downloadsDir, 'accessibility-audit', 'references', 'report-template.md'))).toBe(true);
    expect(existsSync(join(downloadsDir, 'accessibility-audit-report-template.md'))).toBe(true);
    expect(existsSync(join(downloadsDir, 'README.md'))).toBe(false);
    expect(existsSync(zipPath)).toBe(true);

    const zipBuffer = readFileSync(zipPath);
    expect(zipBuffer.subarray(0, 2).toString()).toBe('PK');
    assertZipContains(zipPath, 'README.md');
    assertZipContains(zipPath, 'accessibility-audit/SKILL.md');
    assertZipContains(zipPath, 'accessibility-audit/references/report-template.md');
  });

  it('throws when the canonical skill source is missing', async () => {
    fixture = createFixture();

    await expect(
      prepareAccessibilityAuditDownloads({
        skillSource: join(fixture.root, 'missing-skill'),
        downloadsDir: fixture.downloadsDir,
      })
    ).rejects.toThrow('Missing canonical skill source');
  });

  it('throws when the bundle readme is missing', async () => {
    fixture = createFixture();
    rmSync(join(fixture.downloadsDir, 'accessibility-audit-bundle-README.md'));

    await expect(
      prepareAccessibilityAuditDownloads({
        skillSource: fixture.skillSource,
        downloadsDir: fixture.downloadsDir,
      })
    ).rejects.toThrow('Missing accessibility audit download files');
  });
});
