// @vitest-environment node

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const realBinPath = path.resolve(__dirname, '../../../bin/pds-skill.js');
const DEST = '.claude/skills';
const PACKAGE_NAMES = {
  js: '@porsche-design-system/components-js',
  angular: '@porsche-design-system/components-angular',
  react: '@porsche-design-system/components-react',
  vue: '@porsche-design-system/components-vue',
} as const;
const DEFAULT_PACKAGE_NAME = PACKAGE_NAMES.js;
const DEFAULT_SKILL_NAME = 'porsche-design-system-components-js';
const canTestPosixPermissions = process.platform !== 'win32' && process.getuid?.() !== 0;

const fixtures: string[] = [];

type Fixture = {
  projectDir: string;
  skillDir: string | null;
  linkName: string;
  linkPath: string;
  run: (options?: { args?: string[]; cwd?: string; pnp?: boolean }) => string;
};

const createFixture = ({
  withPackage = true,
  withSkill = true,
  packageName = DEFAULT_PACKAGE_NAME,
  packageJsonContent,
  skillEntryType = 'file',
}: {
  withPackage?: boolean;
  withSkill?: boolean;
  packageName?: string;
  packageJsonContent?: string;
  skillEntryType?: 'file' | 'directory';
} = {}): Fixture => {
  const root = fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-'));
  fixtures.push(root);

  const binDir = path.join(root, 'executor', 'bin');
  fs.mkdirSync(binDir, { recursive: true });
  const binPath = path.join(binDir, 'pds-skill.js');
  fs.copyFileSync(realBinPath, binPath);

  const projectDir = path.join(root, 'project');
  fs.mkdirSync(projectDir, { recursive: true });

  let skillDir: string | null = null;
  if (withPackage) {
    const packageDir = path.join(projectDir, 'node_modules', ...packageName.split('/'));
    fs.mkdirSync(packageDir, { recursive: true });
    fs.writeFileSync(
      path.join(packageDir, 'package.json'),
      packageJsonContent ??
        JSON.stringify({
          name: packageName,
          exports: {
            './package.json': './package.json',
          },
        })
    );

    if (withSkill) {
      skillDir = path.join(packageDir, 'skill');
      fs.mkdirSync(skillDir, { recursive: true });
      const skillMdPath = path.join(skillDir, 'SKILL.md');
      if (skillEntryType === 'directory') {
        fs.mkdirSync(skillMdPath);
      } else {
        fs.writeFileSync(
          skillMdPath,
          `---\nname: ${packageName.slice(1).replace('/', '-')}\ndescription: test skill\n---\n\n# marker\n`
        );
      }
    }
  }

  return {
    projectDir,
    skillDir,
    linkName: packageName.slice(1).replace('/', '-'),
    linkPath: path.join(projectDir, DEST, packageName.slice(1).replace('/', '-')),
    run: ({
      args = ['--package', packageName, '--location', DEST],
      cwd = projectDir,
      pnp = false,
    }: {
      args?: string[];
      cwd?: string;
      pnp?: boolean;
    } = {}) => {
      const nodeArgs = pnp
        ? [
            '-e',
            `process.versions.pnp = '1'; process.argv.splice(1, 0, ${JSON.stringify(binPath)}); require(${JSON.stringify(binPath)});`,
            '--',
            ...args,
          ]
        : [binPath, ...args];
      return execFileSync('node', nodeArgs, { cwd, encoding: 'utf8', stdio: 'pipe' });
    },
  };
};

afterEach(() => {
  for (const root of fixtures.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe('pds-skill bin', () => {
  it('should link the explicitly selected local package skill', () => {
    const { run, linkPath, skillDir } = createFixture();

    run();

    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(fs.readFileSync(path.join(linkPath, 'SKILL.md'), 'utf8')).toContain('# marker');
  });

  it('should select the requested wrapper independently of which package supplied the shared bin', () => {
    const packageName = PACKAGE_NAMES.vue;
    const skillName = 'porsche-design-system-components-vue';
    const { run, projectDir, skillDir } = createFixture({ packageName });

    run();

    const linkPath = path.join(projectDir, DEST, skillName);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(fs.existsSync(path.join(projectDir, DEST, DEFAULT_SKILL_NAME))).toBe(false);
  });

  it('should leave an existing correct symlink unchanged', () => {
    const { run, linkPath, skillDir } = createFixture();

    run();
    const firstTarget = fs.readlinkSync(linkPath);
    expect(run()).toContain('already linked');

    expect(fs.readlinkSync(linkPath)).toBe(firstTarget);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it('should repair a dangling symlink', () => {
    const { run, linkPath, skillDir } = createFixture();

    fs.mkdirSync(path.dirname(linkPath), { recursive: true });
    fs.symlinkSync(path.join(path.dirname(linkPath), 'does-not-exist'), linkPath, 'dir');

    run();

    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it('should repoint a valid stale symlink', () => {
    const { run, linkPath, skillDir, projectDir } = createFixture();
    const staleTarget = path.join(projectDir, 'stale-skill');
    fs.mkdirSync(staleTarget);
    fs.mkdirSync(path.dirname(linkPath), { recursive: true });
    fs.symlinkSync(staleTarget, linkPath, 'dir');

    run();

    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it('should fail when the selected package is not installed from the cwd', () => {
    const { run, projectDir } = createFixture({ withPackage: false });

    expect(() => run()).toThrow(/Cannot find @porsche-design-system\/components-js/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail when the installed package does not ship a skill', () => {
    const { run, projectDir } = createFixture({ withSkill: false });

    expect(() => run()).toThrow(/does not ship a skill/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail clearly when the package manifest contains invalid JSON', () => {
    const { run, projectDir } = createFixture({ packageJsonContent: '{ invalid json\n' });

    expect(() => run()).toThrow(/Cannot read .*package\.json: invalid JSON/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail clearly when the package manifest is not an object', () => {
    const { run, projectDir } = createFixture({ packageJsonContent: 'null\n' });

    expect(() => run()).toThrow(
      /Expected @porsche-design-system\/components-js.*found a package without a name/
    );
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when the package manifest is not readable', () => {
    const { run, projectDir } = createFixture();
    const packageJsonPath = path.join(
      projectDir,
      'node_modules',
      ...DEFAULT_PACKAGE_NAME.split('/'),
      'package.json'
    );
    fs.chmodSync(packageJsonPath, 0o000);

    try {
      expect(() => run()).toThrow(/Cannot read .*package\.json: permission denied/);
      expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
    } finally {
      fs.chmodSync(packageJsonPath, 0o600);
    }
  });

  it('should fail clearly when SKILL.md is not a file', () => {
    const { run, projectDir } = createFixture({ skillEntryType: 'directory' });

    expect(() => run()).toThrow(/SKILL\.md is not a file/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when SKILL.md is not readable', () => {
    const { run, projectDir, skillDir } = createFixture();
    const skillMdPath = path.join(skillDir as string, 'SKILL.md');
    fs.chmodSync(skillMdPath, 0o000);

    try {
      expect(() => run()).toThrow(/Cannot read .*SKILL\.md: permission denied/);
      expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
    } finally {
      fs.chmodSync(skillMdPath, 0o600);
    }
  });

  it('should reject unsupported packages', () => {
    const { run } = createFixture();

    expect(() => run({ args: ['--package', 'unrelated-package', '--location', DEST] })).toThrow(
      /Unsupported package/
    );
  });

  it('should require both package and location options', () => {
    const { run, projectDir } = createFixture();

    expect(() => run({ args: [] })).toThrow(/Missing required options: --package and --location/);
    expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME] })).toThrow(
      /Missing required option: --location/
    );
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should refuse to replace a non-symlink at the link path', () => {
    const { run, linkPath } = createFixture();
    fs.mkdirSync(linkPath, { recursive: true });
    fs.writeFileSync(path.join(linkPath, 'keep.md'), '# do not delete\n');

    expect(() => run()).toThrow(/Refusing to replace/);

    expect(fs.readFileSync(path.join(linkPath, 'keep.md'), 'utf8')).toContain('# do not delete');
  });

  it('should fail clearly when a destination path is a file', () => {
    const { run, projectDir } = createFixture();
    fs.mkdirSync(path.join(projectDir, '.claude'));
    fs.writeFileSync(path.join(projectDir, DEST), 'not a directory\n');

    expect(() => run()).toThrow(/Cannot create/);
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when the destination is not writable', () => {
    const { run, projectDir, linkName } = createFixture();
    const lockedDir = path.join(projectDir, 'locked-skills');
    fs.mkdirSync(lockedDir);
    fs.chmodSync(lockedDir, 0o500);

    try {
      expect(() =>
        run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', lockedDir] })
      ).toThrow(/Cannot create .*porsche-design-system-components-js: permission denied/);
      expect(fs.existsSync(path.join(lockedDir, linkName))).toBe(false);
    } finally {
      fs.chmodSync(lockedDir, 0o700);
    }
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when a destination directory cannot be created', () => {
    const { run, projectDir } = createFixture();
    const lockedDir = path.join(projectDir, 'locked-parent');
    const destination = path.join(lockedDir, 'skills');
    fs.mkdirSync(lockedDir);
    fs.chmodSync(lockedDir, 0o500);

    try {
      expect(() =>
        run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', destination] })
      ).toThrow(/Cannot create .*skills: permission denied/);
      expect(fs.existsSync(destination)).toBe(false);
    } finally {
      fs.chmodSync(lockedDir, 0o700);
    }
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when a stale link cannot be replaced', () => {
    const { run, projectDir, linkName } = createFixture();
    const lockedDir = path.join(projectDir, 'locked-skills');
    const linkPath = path.join(lockedDir, linkName);
    const staleTarget = path.join(projectDir, 'stale-skill');
    fs.mkdirSync(lockedDir);
    fs.mkdirSync(staleTarget);
    fs.symlinkSync(staleTarget, linkPath, 'dir');
    fs.chmodSync(lockedDir, 0o500);

    try {
      expect(() =>
        run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', lockedDir] })
      ).toThrow(/Cannot replace .*porsche-design-system-components-js: permission denied/);
      expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(staleTarget));
    } finally {
      fs.chmodSync(lockedDir, 0o700);
    }
  });

  it('should link into a custom destination directory', () => {
    const { run, projectDir, linkName, skillDir } = createFixture();

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', '.agents'] });

    const linkPath = path.join(projectDir, '.agents', linkName);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should honor an absolute destination directory', () => {
    const { run, projectDir, linkName, skillDir } = createFixture();
    const absoluteDest = path.join(projectDir, 'absolute-skills');

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', absoluteDest] });

    expect(fs.realpathSync(path.join(absoluteDest, linkName))).toBe(fs.realpathSync(skillDir as string));
  });

  it('should support short package and location options', () => {
    const { run, projectDir, linkName, skillDir } = createFixture();

    run({ args: ['-p', DEFAULT_PACKAGE_NAME, '-l', '.agents'] });

    expect(fs.realpathSync(path.join(projectDir, '.agents', linkName))).toBe(fs.realpathSync(skillDir as string));
  });

  it("should reject Yarn Plug'n'Play with actionable guidance", () => {
    const { run } = createFixture();

    expect(() => run({ pnp: true })).toThrow(/Yarn Plug'n'Play is not supported.*nodeLinker: node-modules/);
  });

  it('should reject unknown options and positional arguments', () => {
    const { run } = createFixture();

    expect(() =>
      run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, '--nope'] })
    ).toThrow(/Unknown option/);
    expect(() =>
      run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, 'extra'] })
    ).toThrow(/Unexpected argument/);
  });

  it('should print help without resolving a package', () => {
    const { run } = createFixture({ withPackage: false });

    expect(run({ args: ['--help'] })).toContain('Usage: pds-skill --package <package> --location <dir>');
  });
});
