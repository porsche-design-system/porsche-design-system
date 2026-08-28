// @vitest-environment node

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { getWrapperPackageName, SKILL_FRAMEWORKS, type SkillFramework } from '../../../src/registry';

const realBinPath = path.resolve(__dirname, '../../../bin/pds-skill.js');
const DEST = '.claude/skills';
const PACKAGE_NAMES = Object.fromEntries(
  SKILL_FRAMEWORKS.map((framework) => [framework, getWrapperPackageName(framework)])
) as Record<SkillFramework, string>;
const DEFAULT_PACKAGE_NAME = PACKAGE_NAMES.js;
const DEFAULT_SKILL_NAME = 'pds-knowledge-js';
const isWindows = process.platform === 'win32';
const canTestPosixPermissions = !isWindows && process.getuid?.() !== 0;
const canTestRelativeLinks = !isWindows;

const fixtures: string[] = [];

type Fixture = {
  projectDir: string;
  skillsDir: string | null;
  skillDir: string | null;
  skillName: string;
  linkPath: string;
  run: (options?: { args?: string[]; cwd?: string; pnp?: boolean }) => string;
};

/** Derive the skill directory name from a PDS package name: the framework suffix prefixed with `pds-knowledge-`. */
const skillNameFromPackage = (packageName: string): string => {
  const framework = packageName.split('-').pop() as string;
  return `pds-knowledge-${framework}`;
};

const createFixture = ({
  withPackage = true,
  withSkills = true,
  packageName = DEFAULT_PACKAGE_NAME,
  packageJsonContent,
  skillMdEntryType = 'file',
  skillMdContent,
}: {
  withPackage?: boolean;
  withSkills?: boolean;
  packageName?: string;
  packageJsonContent?: string;
  skillMdEntryType?: 'file' | 'directory';
  skillMdContent?: string;
} = {}): Fixture => {
  // Resolve symlinked ancestors (e.g. /var -> /private/var on macOS) so the fixture paths match
  // the cwd the bin observes, which is what its relative link targets are computed from.
  const root = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-')));
  fixtures.push(root);

  const binDir = path.join(root, 'executor', 'bin');
  fs.mkdirSync(binDir, { recursive: true });
  const binPath = path.join(binDir, 'pds-skill.js');
  fs.copyFileSync(realBinPath, binPath);

  const projectDir = path.join(root, 'project');
  fs.mkdirSync(projectDir, { recursive: true });

  const skillName = skillNameFromPackage(packageName);
  let skillsDir: string | null = null;
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

    if (withSkills) {
      skillsDir = path.join(packageDir, 'skills');
      skillDir = path.join(skillsDir, skillName);
      fs.mkdirSync(skillDir, { recursive: true });
      const skillMdPath = path.join(skillDir, 'SKILL.md');
      if (skillMdEntryType === 'directory') {
        fs.mkdirSync(skillMdPath);
      } else {
        fs.writeFileSync(
          skillMdPath,
          skillMdContent ?? `---\nname: ${skillName}\ndescription: test skill\n---\n\n# marker\n`
        );
      }
    }
  }

  return {
    projectDir,
    skillsDir,
    skillDir,
    skillName,
    linkPath: path.join(projectDir, DEST, skillName),
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

/** Create a fixture with two skills under the same package. */
const createFixtureWithTwoSkills = (): {
  projectDir: string;
  packageDir: string;
  skillsDir: string;
  skillNames: [string, string];
  run: (args?: string[]) => string;
} => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-multi-')));
  fixtures.push(root);

  const binDir = path.join(root, 'executor', 'bin');
  fs.mkdirSync(binDir, { recursive: true });
  const binPath = path.join(binDir, 'pds-skill.js');
  fs.copyFileSync(realBinPath, binPath);

  const projectDir = path.join(root, 'project');
  fs.mkdirSync(projectDir, { recursive: true });

  const packageName = DEFAULT_PACKAGE_NAME;
  const packageDir = path.join(projectDir, 'node_modules', ...packageName.split('/'));
  fs.mkdirSync(packageDir, { recursive: true });
  fs.writeFileSync(path.join(packageDir, 'package.json'), JSON.stringify({ name: packageName }));

  const skillsDir = path.join(packageDir, 'skills');
  const skillNames = ['alpha-skill', 'beta-skill'] as [string, string];
  for (const name of skillNames) {
    const skillDir = path.join(skillsDir, name);
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), `---\nname: ${name}\ndescription: test\n---\n\n# ${name}\n`);
  }

  return {
    projectDir,
    packageDir,
    skillsDir,
    skillNames,
    run: (args = ['--package', packageName, '--location', DEST]) =>
      execFileSync('node', [binPath, ...args], { cwd: projectDir, encoding: 'utf8', stdio: 'pipe' }),
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
    const vueSkillName = 'pds-knowledge-vue';
    const { run, projectDir, skillDir } = createFixture({ packageName });

    run();

    const linkPath = path.join(projectDir, DEST, vueSkillName);
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

  it.runIf(canTestRelativeLinks)('should create a relative link target', () => {
    const { run, linkPath, skillDir } = createFixture();

    run();

    const target = fs.readlinkSync(linkPath);
    expect(path.isAbsolute(target)).toBe(false);
    expect(target).toBe(path.join('..', '..', 'node_modules', DEFAULT_PACKAGE_NAME, 'skills', DEFAULT_SKILL_NAME));
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it.runIf(canTestRelativeLinks)('should compute the target from a symlinked destination directory', () => {
    const { run, projectDir, skillName, skillDir } = createFixture();
    const realDest = path.join(projectDir, '.real-skills');
    const symlinkedDest = path.join(projectDir, '.linked-skills');
    fs.mkdirSync(realDest);
    fs.symlinkSync(realDest, symlinkedDest, 'dir');

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', symlinkedDest] });

    const linkPath = path.join(realDest, skillName);
    expect(fs.readlinkSync(linkPath)).toBe(path.relative(realDest, skillDir as string));
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it.runIf(canTestRelativeLinks)('should use an absolute target when a destination symlink leaves the project', () => {
    const { run, projectDir, skillName, skillDir } = createFixture();
    const outsideDest = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-outside-')));
    fixtures.push(outsideDest);
    const symlinkedDest = path.join(projectDir, '.linked-skills');
    fs.symlinkSync(outsideDest, symlinkedDest, 'dir');

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', symlinkedDest] });

    const linkPath = path.join(outsideDest, skillName);
    expect(fs.readlinkSync(linkPath)).toBe(skillDir);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it.runIf(isWindows)('should create an absolute junction target on Windows', () => {
    const { run, linkPath, skillDir } = createFixture();

    run();

    expect(path.resolve(fs.readlinkSync(linkPath))).toBe(path.resolve(skillDir as string));
  });

  it.runIf(canTestRelativeLinks)('should migrate a pre-existing absolute symlink to a relative one', () => {
    const { run, linkPath, skillDir } = createFixture();
    fs.mkdirSync(path.dirname(linkPath), { recursive: true });
    fs.symlinkSync(skillDir as string, linkPath, 'dir');

    const output = run();

    expect(output).toContain('Linked Porsche Design System skill');
    expect(output).not.toContain('already linked');
    expect(path.isAbsolute(fs.readlinkSync(linkPath))).toBe(false);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
  });

  it.runIf(canTestRelativeLinks)('should keep resolving after the project directory is moved', () => {
    const { run, projectDir, skillName } = createFixture();

    run();
    const movedProjectDir = `${projectDir}-moved`;
    fs.renameSync(projectDir, movedProjectDir);

    const movedLinkPath = path.join(movedProjectDir, DEST, skillName);
    expect(fs.realpathSync(movedLinkPath)).toBe(
      fs.realpathSync(path.join(movedProjectDir, 'node_modules', DEFAULT_PACKAGE_NAME, 'skills', skillName))
    );
    expect(fs.readFileSync(path.join(movedLinkPath, 'SKILL.md'), 'utf8')).toContain('# marker');
  });

  it.runIf(canTestRelativeLinks)('should use an absolute target for a destination outside the project', () => {
    const { run, skillName, skillDir } = createFixture();
    const outsideDest = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), 'pds-skill-outside-')));
    fixtures.push(outsideDest);

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', outsideDest] });

    const linkPath = path.join(outsideDest, skillName);
    expect(fs.readlinkSync(linkPath)).toBe(skillDir);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', outsideDest] })).toContain('already linked');
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

  it('should fail when the installed package does not ship any skills', () => {
    const { run, projectDir } = createFixture({ withSkills: false });

    expect(() => run()).toThrow(/does not ship any skills/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail clearly when the package manifest contains invalid JSON', () => {
    const { run, projectDir } = createFixture({ packageJsonContent: '{ invalid json\n' });

    expect(() => run()).toThrow(/Cannot read .*package\.json: invalid JSON/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail clearly when the package manifest is not an object', () => {
    const { run, projectDir } = createFixture({ packageJsonContent: 'null\n' });

    expect(() => run()).toThrow(/Expected @porsche-design-system\/components-js.*found a package without a name/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when the package manifest is not readable', () => {
    const { run, projectDir } = createFixture();
    const packageJsonPath = path.join(projectDir, 'node_modules', ...DEFAULT_PACKAGE_NAME.split('/'), 'package.json');
    fs.chmodSync(packageJsonPath, 0o000);

    try {
      expect(() => run()).toThrow(/Cannot read .*package\.json: permission denied/);
      expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
    } finally {
      fs.chmodSync(packageJsonPath, 0o600);
    }
  });

  it('should fail clearly when SKILL.md is not a file', () => {
    const { run, projectDir } = createFixture({ skillMdEntryType: 'directory' });

    expect(() => run()).toThrow(/SKILL\.md is not a file/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail when the frontmatter name does not match the skill directory', () => {
    const { run, projectDir } = createFixture({
      skillMdContent: '---\nname: different-skill\ndescription: test skill\n---\n',
    });

    expect(() => run()).toThrow(/has frontmatter name "different-skill" but its directory is "pds-knowledge-js"/);
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should fail when SKILL.md has no frontmatter name', () => {
    const { run, projectDir } = createFixture({ skillMdContent: '# Missing frontmatter\n' });

    expect(() => run()).toThrow(/has frontmatter name "\(none\)" but its directory is "pds-knowledge-js"/);
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

    expect(() => run({ args: ['--package', 'unrelated-package', '--location', DEST] })).toThrow(/Unsupported package/);
  });

  it('should require both package and location options', () => {
    const { run, projectDir } = createFixture();

    expect(() => run({ args: [] })).toThrow(/Missing required options: --package and --location/);
    expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME] })).toThrow(/Missing required option: --location/);
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
    const { run, projectDir, skillName } = createFixture();
    const lockedDir = path.join(projectDir, 'locked-skills');
    fs.mkdirSync(lockedDir);
    fs.chmodSync(lockedDir, 0o500);

    try {
      expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', lockedDir] })).toThrow(
        new RegExp(`Cannot create .*${skillName}: permission denied`)
      );
      expect(fs.existsSync(path.join(lockedDir, skillName))).toBe(false);
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
      expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', destination] })).toThrow(
        /Cannot create .*skills: permission denied/
      );
      expect(fs.existsSync(destination)).toBe(false);
    } finally {
      fs.chmodSync(lockedDir, 0o700);
    }
  });

  it.runIf(canTestPosixPermissions)('should fail clearly when a stale link cannot be replaced', () => {
    const { run, projectDir, skillName } = createFixture();
    const lockedDir = path.join(projectDir, 'locked-skills');
    const linkPath = path.join(lockedDir, skillName);
    const staleTarget = path.join(projectDir, 'stale-skill');
    fs.mkdirSync(lockedDir);
    fs.mkdirSync(staleTarget);
    fs.symlinkSync(staleTarget, linkPath, 'dir');
    fs.chmodSync(lockedDir, 0o500);

    try {
      expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', lockedDir] })).toThrow(
        new RegExp(`Cannot replace .*${skillName}: permission denied`)
      );
      expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(staleTarget));
    } finally {
      fs.chmodSync(lockedDir, 0o700);
    }
  });

  it('should link into a custom destination directory', () => {
    const { run, projectDir, skillName, skillDir } = createFixture();

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', '.agents'] });

    const linkPath = path.join(projectDir, '.agents', skillName);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(fs.existsSync(path.join(projectDir, '.claude'))).toBe(false);
  });

  it('should honor an absolute destination directory', () => {
    const { run, projectDir, skillName, skillDir } = createFixture();
    const absoluteDest = path.join(projectDir, 'absolute-skills');

    run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', absoluteDest] });

    const linkPath = path.join(absoluteDest, skillName);
    expect(fs.realpathSync(linkPath)).toBe(fs.realpathSync(skillDir as string));
    expect(path.isAbsolute(fs.readlinkSync(linkPath))).toBe(isWindows);
  });

  it('should support short package and location options', () => {
    const { run, projectDir, skillName, skillDir } = createFixture();

    run({ args: ['-p', DEFAULT_PACKAGE_NAME, '-l', '.agents'] });

    expect(fs.realpathSync(path.join(projectDir, '.agents', skillName))).toBe(fs.realpathSync(skillDir as string));
  });

  it("should reject Yarn Plug'n'Play with actionable guidance", () => {
    const { run } = createFixture();

    expect(() => run({ pnp: true })).toThrow(/Yarn Plug'n'Play is not supported.*nodeLinker: node-modules/);
  });

  it('should reject unknown options and positional arguments', () => {
    const { run } = createFixture();

    expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, '--nope'] })).toThrow(
      /Unknown option/
    );
    expect(() => run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, 'extra'] })).toThrow(
      /Unexpected argument/
    );
  });

  it('should print help without resolving a package', () => {
    const { run } = createFixture({ withPackage: false });

    expect(run({ args: ['--help'] })).toContain('Usage: pds-skill --package <package> --location <dir>');
  });

  it('should install only the requested skill when --skill is used', () => {
    const { projectDir, skillsDir, skillNames, run } = createFixtureWithTwoSkills();

    run(['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, '--skill', skillNames[0]]);

    expect(fs.lstatSync(path.join(projectDir, DEST, skillNames[0])).isSymbolicLink()).toBe(true);
    expect(fs.existsSync(path.join(projectDir, DEST, skillNames[1]))).toBe(false);
    expect(fs.realpathSync(path.join(projectDir, DEST, skillNames[0]))).toBe(
      fs.realpathSync(path.join(skillsDir, skillNames[0]))
    );
  });

  it('should install all discovered skills when no --skill filter is given', () => {
    const { projectDir, skillsDir, skillNames, run } = createFixtureWithTwoSkills();

    run();

    for (const name of skillNames) {
      expect(fs.lstatSync(path.join(projectDir, DEST, name)).isSymbolicLink()).toBe(true);
      expect(fs.realpathSync(path.join(projectDir, DEST, name))).toBe(fs.realpathSync(path.join(skillsDir, name)));
    }
  });

  it('should fail clearly when an unknown skill is requested', () => {
    const { run, projectDir } = createFixture();

    expect(() =>
      run({ args: ['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, '--skill', 'no-such-skill'] })
    ).toThrow(/Unknown skill.*no-such-skill/);
    expect(fs.existsSync(path.join(projectDir, DEST))).toBe(false);
  });

  it('should support the short -s option for --skill', () => {
    const { projectDir, skillsDir, skillNames, run } = createFixtureWithTwoSkills();

    run(['--package', DEFAULT_PACKAGE_NAME, '--location', DEST, '-s', skillNames[1]]);

    expect(fs.lstatSync(path.join(projectDir, DEST, skillNames[1])).isSymbolicLink()).toBe(true);
    expect(fs.existsSync(path.join(projectDir, DEST, skillNames[0]))).toBe(false);
  });

  it('should preflight all destinations before any mutation — a blocked link prevents all links', () => {
    const { projectDir, skillNames, run } = createFixtureWithTwoSkills();

    // Block the second link destination with a real directory.
    const blockedPath = path.join(projectDir, DEST, skillNames[1]);
    fs.mkdirSync(blockedPath, { recursive: true });
    fs.writeFileSync(path.join(blockedPath, 'keep.txt'), 'protected\n');

    expect(() => run()).toThrow(/Refusing to replace/);

    // The first skill must NOT have been linked (preflight rejected before any mutation).
    expect(fs.existsSync(path.join(projectDir, DEST, skillNames[0]))).toBe(false);
    // The blocked directory must be intact.
    expect(fs.readFileSync(path.join(blockedPath, 'keep.txt'), 'utf8')).toContain('protected');
  });
});
