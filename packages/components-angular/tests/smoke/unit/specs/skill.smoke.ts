import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const distDir = path.resolve(__dirname, '../../../../dist/angular-wrapper');
const canonicalBinPath = path.resolve(distDir, '../../../storefront/projects/skills/bin/pds-skill.js');

describe('angular-wrapper skill distribution', () => {
  test.each(['skills/pds-knowledge-angular/SKILL.md', 'bin/pds-skill.js'])('should contain %s', (file) => {
    expect(fs.existsSync(path.resolve(distDir, file))).toBe(true);
  });

  test('should expose the canonical pds-skill binary', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(distDir, 'package.json'), 'utf8'));
    expect(packageJson.bin?.['pds-skill']).toBe('./bin/pds-skill.js');
    expect(fs.readFileSync(path.resolve(distDir, 'bin/pds-skill.js'))).toEqual(fs.readFileSync(canonicalBinPath));
  });
});
