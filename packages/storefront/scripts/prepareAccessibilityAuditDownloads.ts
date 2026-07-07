import { execFileSync } from 'node:child_process';
import console from 'node:console';
import * as fs from 'node:fs';
import * as path from 'node:path';

const repoRoot = path.resolve(__dirname, '../../..');
const skillSource = path.join(repoRoot, '.agents/skills/accessibility-audit');
const downloadsDir = path.resolve(__dirname, '../public/assets/downloads');
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

execFileSync('zip', ['-r', zipPath, ...zipEntries], { cwd: downloadsDir, stdio: 'inherit' });

fs.unlinkSync(zipReadme);

console.log(`Synced skill from .agents/skills/accessibility-audit`);
console.log(`Generated: public/assets/downloads/accessibility-audit.zip`);
