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

// The four wrapper packages ship a byte-identical, hand-maintained copy of the bin. Nothing in the
// build generates them, so this is the only thing keeping them in sync.
const wrapperBinPaths: Record<string, string> = {
  js: realBinPath,
  angular: path.resolve(__dirname, '../../../../components-angular/projects/angular-wrapper/bin/pds-skill.js'),
  react: path.resolve(__dirname, '../../../../components-react/projects/react-wrapper/bin/pds-skill.js'),
  vue: path.resolve(__dirname, '../../../../components-vue/projects/vue-wrapper/bin/pds-skill.js'),
};

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

  it('should refuse to replace a real directory at the link path (no destructive delete)', () => {
    const { run, linkPath } = createFixture({ withSkill: true });

    // A real, non-symlink directory a user may have hand-maintained.
    fs.mkdirSync(linkPath, { recursive: true });
    fs.writeFileSync(path.join(linkPath, 'keep.md'), '# do not delete\n');

    expect(() => run()).toThrow();

    expect(fs.lstatSync(linkPath).isDirectory()).toBe(true);
    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(false);
    expect(fs.readFileSync(path.join(linkPath, 'keep.md'), 'utf8')).toContain('# do not delete');
  });

  it('should fail with a clear error when .claude exists as a file (ENOTDIR)', () => {
    const { run, projectDir, linkPath } = createFixture({ withSkill: true });

    // `.claude` occupied by a file blocks creating `.claude/skills`.
    fs.writeFileSync(path.join(projectDir, '.claude'), 'not a dir\n');

    expect(() => run()).toThrow();
    expect(fs.existsSync(linkPath)).toBe(false);
  });
});

describe('pds-skill bin sync', () => {
  it('should ship a byte-identical bin in all four wrapper packages', () => {
    const reference = fs.readFileSync(wrapperBinPaths.js, 'utf8');
    for (const [framework, binPath] of Object.entries(wrapperBinPaths)) {
      expect(fs.existsSync(binPath), `${framework} wrapper is missing bin/pds-skill.js`).toBe(true);
      expect(fs.readFileSync(binPath, 'utf8'), `${framework} wrapper bin/pds-skill.js drifted from js`).toBe(reference);
    }
  });
});

describe('pds-skill npx resolution', () => {
  // The documented install command is `npx --package=<pkg> pds-skill`, which names both the package
  // and the binary explicitly and always resolves. A bare `npx <pkg> pds-skill` instead resolves the
  // package's DEFAULT bin: single-bin packages use it, but a multi-bin package (e.g. components-react,
  // which also ships `patchRemixRunProcessBrowserGlobalIdentifier`) requires a bin named after the
  // package's unscoped basename — none matches, so npx errors with "could not determine executable to
  // run". This asserts the invariant the `--package=` form relies on: every wrapper exposes a
  // `pds-skill` bin pointing at the shipped script.
  const wrapperPkgJsonPaths: Record<string, string> = {
    js: path.resolve(__dirname, '../../../projects/components-wrapper/package.json'),
    angular: path.resolve(__dirname, '../../../../components-angular/projects/angular-wrapper/package.json'),
    react: path.resolve(__dirname, '../../../../components-react/projects/react-wrapper/package.json'),
    vue: path.resolve(__dirname, '../../../../components-vue/projects/vue-wrapper/package.json'),
  };

  it('every wrapper exposes a `pds-skill` bin so `npx --package=<pkg> pds-skill` resolves', () => {
    for (const [framework, pkgJsonPath] of Object.entries(wrapperPkgJsonPaths)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      const binRelPath = pkg.bin?.['pds-skill'];
      expect(binRelPath, `${framework} wrapper package.json has no \`pds-skill\` bin entry`).toBeTruthy();
      const binAbsPath = path.resolve(path.dirname(pkgJsonPath), binRelPath);
      expect(fs.existsSync(binAbsPath), `${framework} wrapper \`pds-skill\` bin ${binRelPath} does not exist`).toBe(
        true
      );
    }
  });
});
