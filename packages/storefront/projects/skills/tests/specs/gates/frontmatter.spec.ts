import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILL_IDS } from '@skills/registry';
import { renderFrontmatter } from '@skills/shared/frontmatter';
import { FRAMEWORKS, stagedSkillDir } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

/**
 * Conformance of every shipped `SKILL.md` to the Agent Skills specification:
 * https://agentskills.io/specification#skill-md-format
 *
 * Gated on the generated artifact rather than on the builders, so a skill added later is covered
 * without anyone remembering to extend this file — the loop is over `SKILL_IDS`.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../../../..');

/** Spec `name` rules: 1-64 chars, lowercase alphanumerics and hyphens, no leading/trailing/double hyphen. */
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The specification's fields, plus the one client extension this repository relies on. */
const ALLOWED_FIELDS = [
  'name',
  'description',
  'license',
  'compatibility',
  'metadata',
  'allowed-tools',
  'disable-model-invocation',
];

const TREES = SKILL_IDS.flatMap((skillId) =>
  FRAMEWORKS.map((framework) => ({ skillId, framework, dir: stagedSkillDir(skillId, framework) }))
);

/** The frontmatter block and the `key: value` pairs of a generated SKILL.md. */
const frontmatterOf = (dir: string): { block: string; fields: Record<string, string> } => {
  const content = fs.readFileSync(path.join(REPO_ROOT, dir, 'SKILL.md'), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  expect(match, `${dir}/SKILL.md has no frontmatter block`).not.toBeNull();
  const block = (match as RegExpMatchArray)[1] as string;
  const fields = Object.fromEntries(
    block
      .split('\n')
      .filter((line) => !line.startsWith('  '))
      .map((line) => {
        const separator = line.indexOf(': ');
        return separator === -1 ? [line.replace(/:$/, ''), ''] : [line.slice(0, separator), line.slice(separator + 2)];
      })
  );
  return { block, fields };
};

describe('SKILL.md frontmatter conforms to the Agent Skills specification', () => {
  it('has trees to gate against', () => {
    expect(TREES.length).toBe(SKILL_IDS.length * FRAMEWORKS.length);
  });

  for (const { skillId, framework, dir } of TREES) {
    describe(`${skillId} ${framework}`, () => {
      it('opens with a frontmatter block', () => {
        expect(fs.existsSync(path.join(REPO_ROOT, dir, 'SKILL.md')), `${dir}/SKILL.md missing`).toBe(true);
        expect(frontmatterOf(dir).block.length).toBeGreaterThan(0);
      });

      it('has a spec-valid name that matches its directory', () => {
        const { name } = frontmatterOf(dir).fields;
        expect(name).toMatch(NAME_PATTERN);
        expect(name.length).toBeLessThanOrEqual(64);
        // The spec requires the name to match the parent directory; ours is derived from the registry,
        // which also names the directory — this asserts the two never drift apart.
        expect(name).toBe(path.basename(dir));
      });

      it('has a non-empty description within the 1024-character limit', () => {
        const { description } = frontmatterOf(dir).fields;
        expect(description.length).toBeGreaterThan(0);
        expect(description.length).toBeLessThanOrEqual(1024);
      });

      it('carries only specification fields plus the documented client extension', () => {
        const unknown = Object.keys(frontmatterOf(dir).fields).filter((key) => !ALLOWED_FIELDS.includes(key));
        expect(unknown, `unknown frontmatter fields in ${dir}`).toStrictEqual([]);
      });

      it('keeps every frontmatter value on one line', () => {
        // A value carrying an unescaped `: ` or newline silently changes the parsed frontmatter rather
        // than failing, so a skill could ship with a truncated description and look fine.
        for (const line of frontmatterOf(dir).block.split('\n')) {
          expect(line, `unparsable frontmatter line in ${dir}: ${line}`).toMatch(/^ {0,2}[\w-]+:( .*)?$/);
        }
      });
    });
  }
});

describe('renderFrontmatter', () => {
  it('emits only the required fields when nothing optional is set', () => {
    expect(renderFrontmatter({ name: 'a-skill', description: 'Does a thing.' })).toBe(
      '---\nname: a-skill\ndescription: Does a thing.\n---'
    );
  });

  it('emits optional fields in specification order', () => {
    expect(
      renderFrontmatter({
        name: 'a-skill',
        description: 'Does a thing.',
        license: 'Apache-2.0',
        compatibility: 'Requires git',
        metadata: { author: 'example-org', version: '1.0' },
        allowedTools: 'Read Bash(git:*)',
        disableModelInvocation: true,
      })
    ).toBe(
      [
        '---',
        'name: a-skill',
        'description: Does a thing.',
        'license: Apache-2.0',
        'compatibility: Requires git',
        'metadata:',
        '  author: example-org',
        '  version: 1.0',
        'allowed-tools: Read Bash(git:*)',
        'disable-model-invocation: true',
        '---',
      ].join('\n')
    );
  });

  it('omits the extension key when model invocation is left enabled', () => {
    expect(renderFrontmatter({ name: 'a', description: 'b', disableModelInvocation: false })).not.toContain(
      'disable-model-invocation'
    );
  });

  it('quotes values a plain scalar would misread', () => {
    // `: ` is the real hazard: unquoted, YAML reads everything before it as a key, so the description
    // would parse as a different field entirely instead of failing loudly.
    expect(renderFrontmatter({ name: 'a', description: 'Extract text: and tables' })).toContain(
      'description: "Extract text: and tables"'
    );
    expect(renderFrontmatter({ name: 'a', description: 'line one\nline two' })).toContain(
      'description: "line one\\nline two"'
    );
  });

  it('leaves ordinary values unquoted so the shipped file stays readable', () => {
    expect(renderFrontmatter({ name: 'a', description: 'Extracts text, tables and forms.' })).toContain(
      'description: Extracts text, tables and forms.'
    );
  });
});
