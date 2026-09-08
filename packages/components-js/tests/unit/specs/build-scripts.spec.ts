import * as path from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
  globbySync: vi.fn(),
}));

vi.mock('fs', () => ({
  readFileSync: mocks.readFileSync,
  writeFileSync: mocks.writeFileSync,
  mkdirSync: mocks.mkdirSync,
}));
vi.mock('fast-glob', () => ({ sync: mocks.globbySync }));

const packageDir = path.resolve(__dirname, '../../..');
const wrapperDir = path.resolve(packageDir, 'dist/components-wrapper');
const tmpDir = path.resolve(packageDir, 'dist/components-tmp');
const cdnDir = path.resolve(packageDir, 'dist/components');
const coreFileName = 'porsche-design-system.v4.6.0.abc.js';

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('resolves build directories independently of the calling workspace', async () => {
  vi.spyOn(process, 'cwd').mockReturnValue(path.resolve(packageDir, 'projects/partials'));

  const { cdnDistPath, npmDistPath, npmDistTmpPath } = await import('../../../projects/components-wrapper/environment');

  expect(cdnDistPath).toBe(cdnDir);
  expect(npmDistPath).toBe(wrapperDir);
  expect(npmDistTmpPath).toBe(tmpDir);
});

it('replaces CDN placeholders only in local build outputs', async () => {
  mocks.readFileSync.mockReturnValue('const url="%%%CDN_BASE_URL_DYNAMIC%%%/components";');
  mocks.globbySync.mockReturnValue([path.resolve(cdnDir, coreFileName)]);

  await import('../../../scripts/replaceCdnBaseUrlDynamicPlaceholder');

  const expectedPaths = [
    path.resolve(wrapperDir, 'cjs/index.cjs'),
    path.resolve(wrapperDir, 'esm/index.mjs'),
    path.resolve(wrapperDir, 'index.js'),
    path.resolve(tmpDir, 'index.js'),
    path.resolve(cdnDir, coreFileName),
  ];
  expect(mocks.globbySync).toHaveBeenCalledWith(path.resolve(cdnDir, 'porsche-design-system.v*'));
  expect(mocks.readFileSync.mock.calls).toEqual(expectedPaths.map((file) => [file, 'utf8']));
  expect(mocks.writeFileSync.mock.calls).toEqual(
    expectedPaths.map((file) => [file, 'const url=document.porscheDesignSystem.cdn.url+"/components";'])
  );
});

it('reports a missing core chunk before modifying any build outputs', async () => {
  mocks.globbySync.mockReturnValue([]);

  await expect(import('../../../scripts/replaceCdnBaseUrlDynamicPlaceholder')).rejects.toThrow(
    `No core chunk found in ${cdnDir}`
  );
  expect(mocks.writeFileSync).not.toHaveBeenCalled();
});

it('generates the chunk manifest from the local loader and core chunk', async () => {
  mocks.readFileSync.mockImplementation((file: string) => {
    if (file === path.resolve(wrapperDir, 'cjs/index.cjs')) {
      return `const url="/components/${coreFileName}";`;
    }
    if (file === path.resolve(cdnDir, coreFileName)) {
      return 'const url="porsche-design-system."+chunk+"."+{button:"abc",icon:"def"}[chunk]+".js";';
    }
    throw new Error(`Unexpected build input: ${file}`);
  });

  await import('../../../scripts/generateChunksManifest');

  expect(mocks.writeFileSync).toHaveBeenCalledWith(
    path.resolve(packageDir, 'projects/components-wrapper/lib/chunksManifest.ts'),
    expect.stringContaining(
      JSON.stringify({
        core: coreFileName,
        button: 'porsche-design-system.button.abc.js',
        icon: 'porsche-design-system.icon.def.js',
      })
    )
  );
});

it('embeds the local temporary loader in the loader script partial', async () => {
  mocks.readFileSync.mockReturnValue('window.porscheDesignSystem={};');

  const { generateLoaderScriptPartial } = await import(
    '../../../projects/partials/scripts/generateLoaderScriptPartial'
  );
  const partial = generateLoaderScriptPartial();

  expect(mocks.readFileSync).toHaveBeenCalledWith(path.resolve(tmpDir, 'index.js'), 'utf8');
  expect(partial).toContain(JSON.stringify('window.porscheDesignSystem={};'));
});
