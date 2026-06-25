// @vitest-environment node

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';
import { afterEach, describe, expect, it } from 'vitest';

// Resolves the real `pds-skill` bin shipped by the components-wrapper. The bin resolves its own
// skill dir relative to `__dirname` (`../skill`), so the fixture mirrors that `bin/`+`skill/` layout.
const realBinPath = path.resolve(__dirname, '../../../projects/components-wrapper/bin/pds-skill.js');
const SKILL_LINK_NAME = 'porsche-design-system-docs';

const fixtures: string[] = [];

type Fixture = {
  /** Directory acting as the consumer project's CWD when the bin runs. */
  projectDir: string;
  /** The package's bundled `skill/` dir the symlink should resolve to (null when omitted). */
  skillDir: string | null;
  /** The expected `.claude/skills/porsche-design-system-docs` path inside the project. */
  linkPath: string;
  /** Runs the fixture's copy of the bin with CWD set to the project dir. */
  run: () => void;
};

const createFixture = ({ withSkill }: { withSkill: boolean }): Fixture => {
  const root = fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-'));
  fixtures.push(root);

  const binDir = path.join(root, 'pkg', 'bin');
  fs.mkdirSync(binDir, { recursive: true });
  const binPath = path.join(binDir, 'pds-skill.js');
  fs.copyFileSync(realBinPath, binPath);

  let skillDir: string | null = null;
  if (withSkill) {
    skillDir = path.join(root, 'pkg', 'skill');
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), '# marker\n');
  }

  const projectDir = path.join(root, 'project');
  fs.mkdirSync(projectDir, { recursive: true });

  return {
    projectDir,
    skillDir,
    linkPath: path.join(projectDir, '.claude', 'skills', SKILL_LINK_NAME),
    run: () => execFileSync('node', [binPath], { cwd: projectDir, stdio: 'pipe' }),
  };
};

afterEach(() => {
  for (const root of fixtures.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe('pds-skill bin', () => {
  it('should create a symlink resolving to the package skill dir', () => {
    const { run, linkPath, skillDir } = createFixture({ withSkill: true });

    run();

    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(fs.readFileSync(path.join(linkPath, 'SKILL.md'), 'utf8')).toContain('# marker');
  });

  it('should be idempotent on re-run and repoint correctly', () => {
    const { run, linkPath, skillDir } = createFixture({ withSkill: true });

    run();
    expect(() => run()).not.toThrow();

    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it('should repair a dangling/stale symlink', () => {
    const { run, linkPath, skillDir } = createFixture({ withSkill: true });

    fs.mkdirSync(path.dirname(linkPath), { recursive: true });
    fs.symlinkSync(path.join(path.dirname(linkPath), 'does-not-exist'), linkPath, 'dir');
    expect(fs.existsSync(linkPath)).toBe(false); // dangling: target missing

    run();

    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it('should no-op cleanly when the package has no skill dir', () => {
    const { run, linkPath } = createFixture({ withSkill: false });

    expect(() => run()).not.toThrow();

    expect(fs.existsSync(path.dirname(linkPath))).toBe(false);
    expect(fs.existsSync(linkPath)).toBe(false);
  });
});
