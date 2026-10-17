import fs from 'node:fs';
import path from 'node:path';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describe, expect, it } from 'vitest';
import { INITIAL_CLOSED_OVERLAY_TAG_NAMES } from '../../../src/initial';

const libDir = path.resolve(__dirname, '../../../lib');
const readCss = (file: string) => fs.readFileSync(path.join(libDir, file), 'utf-8');

const initialCss = readCss('initial.css');

// The tag names listed in the `:is(…)` of the rule declaring `property: value`.
const getTagNamesOfRule = (property: string, value: string): string[] => {
  const rule = new RegExp(`:is\\(([^)]*)\\):not\\(:defined, \\[data-ssr\\]\\)\\s*{\\s*${property}: ${value};\\s*}`);
  const [, tagNames = ''] = rule.exec(initialCss) ?? [];
  return tagNames
    .split(',')
    .map((tagName) => tagName.trim())
    .filter(Boolean);
};

const publicTagNames = TAG_NAMES.filter((tagName) => !INTERNAL_TAG_NAMES.includes(tagName));

// Reads the source of a component by its tag, the same way the tag names are generated.
const componentsSourceDirectory = path.resolve(__dirname, '../../../../../src/components');
const getComponentSource = (tagName: string): string => {
  const file = fs
    .readdirSync(componentsSourceDirectory, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.tsx') && !file.includes('-utils') && !file.endsWith('.spec.tsx'))
    .map((file) => path.join(componentsSourceDirectory, file))
    .find((file) => fs.readFileSync(file, 'utf8').includes(`tag: '${tagName}'`));
  if (!file) {
    throw new Error(`No component source found for ${tagName}`);
  }
  return fs.readFileSync(file, 'utf8');
};

it('should match compiled initial css', () => {
  expect(initialCss).toMatchSnapshot();
});

it('should not be part of index css', () => {
  expect(readCss('index.css')).not.toContain(initialCss);
  expect(readCss('cn/index.css')).not.toContain(initialCss);
});

it('should never match elements that are not PDS components', () => {
  expect(initialCss).not.toMatch(/(^|[\s,}]):not\(:defined/);
  expect(initialCss).not.toContain('next-route-announcer');
});

describe('visibility rule', () => {
  const tagNames = getTagNamesOfRule('visibility', 'hidden');

  it('should hide every public component', () => {
    expect(tagNames).toEqual(publicTagNames);
  });

  it('should not list components that only render inside the Shadow DOM of other components', () => {
    for (const tagName of INTERNAL_TAG_NAMES) {
      expect(tagNames).not.toContain(tagName);
    }
  });
});

describe('display rule', () => {
  const tagNames = getTagNamesOfRule('display', 'none');

  it('should take every closed overlay out of the layout', () => {
    expect(tagNames).toEqual([...INITIAL_CLOSED_OVERLAY_TAG_NAMES]);
  });

  it.each(INITIAL_CLOSED_OVERLAY_TAG_NAMES)('should list %s which is a public component', (tagName) => {
    expect(publicTagNames).toContain(tagName);
  });

  it.each(INITIAL_CLOSED_OVERLAY_TAG_NAMES)(
    'should list %s which renders a dialog that is closed by default',
    (tagName) => {
      const source = getComponentSource(tagName);
      expect(source).toMatch(/@Prop\(\) public open\??: boolean = false;/);
      expect(source).toMatch(/<dialog\b|<DialogBase\b/);
    }
  );
});
