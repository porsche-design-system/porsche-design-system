import { execFileSync } from 'node:child_process';
import console from 'node:console';
import * as fs from 'node:fs';
import * as path from 'node:path';

const downloadsDir = path.resolve(__dirname, '../public/assets/downloads');
const zipPath = path.join(downloadsDir, 'accessibility-audit.zip');
const bundleReadme = path.join(downloadsDir, 'accessibility-audit-bundle-README.md');
const zipReadme = path.join(downloadsDir, 'README.md');

const requiredPaths = [
  path.join(downloadsDir, 'accessibility-audit', 'SKILL.md'),
  path.join(downloadsDir, 'accessibility-audit', 'references'),
  path.join(downloadsDir, 'accessibility-audit.instructions.md'),
  path.join(downloadsDir, 'accessibility-audit.claude.md'),
  path.join(downloadsDir, 'accessibility-audit-report-template.md'),
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

const zipEntries = [
  'README.md',
  'accessibility-audit',
  'accessibility-audit.instructions.md',
  'accessibility-audit.claude.md',
  'accessibility-audit-report-template.md',
];

execFileSync('zip', ['-r', zipPath, ...zipEntries], { cwd: downloadsDir, stdio: 'inherit' });

fs.unlinkSync(zipReadme);

console.log(`Generated: public/assets/downloads/accessibility-audit.zip`);
