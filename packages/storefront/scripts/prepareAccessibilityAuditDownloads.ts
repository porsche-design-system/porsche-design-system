import { ZipArchive } from 'archiver';
import console from 'node:console';
import * as fs from 'node:fs';
import { createWriteStream } from 'node:fs';
import * as path from 'node:path';

export type PrepareAccessibilityAuditDownloadsOptions = {
  skillSource: string;
  downloadsDir: string;
};

export const createZip = (outputPath: string, cwd: string, entries: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on('close', () => resolve());
    output.on('error', reject);
    archive.on('error', reject);
    archive.pipe(output);

    for (const entry of entries) {
      const entryPath = path.join(cwd, entry);
      if (fs.statSync(entryPath).isDirectory()) {
        archive.directory(entryPath, entry);
      } else {
        archive.file(entryPath, { name: entry });
      }
    }

    void archive.finalize();
  });

export const prepareAccessibilityAuditDownloads = async ({
  skillSource,
  downloadsDir,
}: PrepareAccessibilityAuditDownloadsOptions): Promise<void> => {
  const skillDest = path.join(downloadsDir, 'accessibility-audit');
  const zipPath = path.join(downloadsDir, 'accessibility-audit.zip');
  const bundleReadme = path.join(downloadsDir, 'accessibility-audit-bundle-README.md');
  const zipReadme = path.join(downloadsDir, 'README.md');
  const reportTemplateSource = path.join(skillSource, 'references/report-template.md');
  const reportTemplateDest = path.join(downloadsDir, 'accessibility-audit-report-template.md');

  if (!fs.existsSync(skillSource)) {
    throw new Error(`Missing canonical skill source: ${skillSource}`);
  }

  if (!fs.existsSync(reportTemplateSource)) {
    throw new Error(`Missing report template: ${reportTemplateSource}`);
  }

  fs.rmSync(skillDest, { recursive: true, force: true });
  fs.cpSync(skillSource, skillDest, { recursive: true });
  fs.copyFileSync(reportTemplateSource, reportTemplateDest);

  const requiredPaths = [
    path.join(downloadsDir, 'accessibility-audit', 'SKILL.md'),
    path.join(downloadsDir, 'accessibility-audit', 'references'),
    path.join(downloadsDir, 'accessibility-audit', 'references', 'report-template.md'),
    reportTemplateDest,
    bundleReadme,
  ];

  const missing = requiredPaths.filter((filePath) => !fs.existsSync(filePath));
  if (missing.length > 0) {
    throw new Error(`Missing accessibility audit download files:\n${missing.join('\n')}`);
  }

  fs.copyFileSync(bundleReadme, zipReadme);

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  const zipEntries = ['README.md', 'accessibility-audit'];
  await createZip(zipPath, downloadsDir, zipEntries);

  fs.unlinkSync(zipReadme);
};

const repoRoot = path.resolve(__dirname, '../../..');
const defaultSkillSource = path.join(repoRoot, '.agents/skills/accessibility-audit');
const defaultDownloadsDir = path.resolve(__dirname, '../public/assets/downloads');

const runAsScript = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (runAsScript) {
  prepareAccessibilityAuditDownloads({
    skillSource: defaultSkillSource,
    downloadsDir: defaultDownloadsDir,
  })
    .then(() => {
      console.log('Synced skill from .agents/skills/accessibility-audit');
      console.log('Generated: public/assets/downloads/accessibility-audit.zip');
    })
    .catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    });
}
