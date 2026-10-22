import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  assertExampleFolders,
  readDescription,
  toExampleId,
  toGeneratedDir,
  toIdUnion,
  writeExampleModule,
} from '../../../../lib/build';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'examples-lib-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const write = (file: string, content = ''): void => {
  fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
  fs.writeFileSync(path.join(dir, file), content);
};

describe('toExampleId()', () => {
  it('is the folder of the file, joined by "/"', () => {
    expect(toExampleId(path.join('components', 'button', 'form', 'story.ts'))).toBe('components/button/form');
  });
});

describe('toIdUnion()', () => {
  it('lists every id as a member of the union', () => {
    expect(toIdUnion(['components/button/form', 'components/button/default'])).toBe(
      "  | 'components/button/form'\n  | 'components/button/default'"
    );
  });

  it('is never without an id', () => {
    expect(toIdUnion([])).toBe('  never');
  });
});

describe('toGeneratedDir()', () => {
  it('climbs from the module of an example to generated/', () => {
    expect(toGeneratedDir('components/button/form')).toBe('../../../');
    expect(toGeneratedDir('patterns/footer')).toBe('../../');
  });
});

describe('readDescription()', () => {
  it('reads the example.mdx of the example', () => {
    write('components/button/form/example.mdx', 'A form.\n');
    expect(readDescription(dir, 'components/button/form', 'test')).toBe('A form.\n');
  });

  it('is undefined without one', () => {
    expect(readDescription(dir, 'components/button/form', 'test')).toBeUndefined();
  });

  it('fails for an empty one', () => {
    write('components/button/form/example.mdx', '\n  \n');
    expect(() => readDescription(dir, 'components/button/form', 'test')).toThrow(
      '[test] the example.mdx of "components/button/form" is empty'
    );
  });
});

describe('assertExampleFolders()', () => {
  const allowed = { 'components/button/form': ['story.ts', 'example.mdx'] };

  it('accepts the files of the examples', () => {
    write('components/button/form/story.ts');
    write('components/button/form/example.mdx');
    expect(() => assertExampleFolders(dir, allowed, 'test')).not.toThrow();
  });

  it('fails for a file an example does not allow, or outside of every example', () => {
    write('components/button/form/story.ts');
    write('components/button/form/helper.ts');
    write('components/button/README.md');
    expect(() => assertExampleFolders(dir, allowed, 'test')).toThrow(
      `[test] files outside of an example:\n${path.join('components', 'button', 'README.md')}\n${path.join('components', 'button', 'form', 'helper.ts')}`
    );
  });
});

describe('writeExampleModule()', () => {
  it('writes the module below generated/examples/, named by the id', () => {
    writeExampleModule(dir, 'components/button/form', ['// header', 'export default {};']);
    expect(fs.readFileSync(path.join(dir, 'examples', 'components', 'button', 'form.ts'), 'utf8')).toBe(
      '// header\nexport default {};\n'
    );
  });
});
