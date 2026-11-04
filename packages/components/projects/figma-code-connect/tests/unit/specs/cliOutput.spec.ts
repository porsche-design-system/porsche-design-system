import { spawn } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createServer, type IncomingMessage } from 'node:http';
import { createRequire } from 'node:module';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  nodesUnreachable,
  type PreviewResult,
  unreachable,
  uploadFailures,
  validationFailures,
} from '../../../figma/cliOutput';
import { generate } from '../../../figma/generate';

// The installed CLI against a local stand-in for Figma's API: an update that changes what it prints fails here, in the
// update's own pull request, which gets no dry run.
const packageRoot = resolve(__dirname, '../../..');
// the package's exports hide bin/, so it is found from the main entry, dist/react/index_react.js
const entry = createRequire(resolve(packageRoot, 'package.json')).resolve('@figma/code-connect');
const cli = resolve(dirname(entry), '../../bin/figma');
const fileUrl = 'https://www.figma.com/design/KEY/Library';
const url = `${fileUrl}?node-id=1-1`;
const template = 'generated/templates/tag/tag.figma.ts';

let answer: (request: IncomingMessage) => [number, unknown] | undefined;
const figmaApi = createServer((request, response) => {
  request.resume().on('end', () => {
    const [status, body] = answer(request) ?? [404, { status: 404, err: 'Not found' }];
    response.writeHead(status, { 'Content-Type': 'application/json' }).end(JSON.stringify(body));
  });
});
let project: string;

type Run = { status: number | null; stdout: string; log: string };
const connect = (args: string[]): Promise<Run> =>
  new Promise((done) => {
    const apiUrl = `http://127.0.0.1:${(figmaApi.address() as AddressInfo).port}/v1`;
    let stdout = '';
    let stderr = '';
    const child = spawn(
      process.execPath,
      [
        cli,
        'connect',
        ...args,
        '--config',
        'figma.config.json',
        '--exit-on-unreadable-files',
        '--skip-update-check',
        '--api-url',
        apiUrl,
      ],
      { cwd: project, env: { ...process.env, FIGMA_ACCESS_TOKEN: 'test' }, stdio: ['ignore', 'pipe', 'pipe'] }
    );
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('close', (status) => done({ status, stdout, log: `${stdout}\n${stderr}` }));
  });

beforeAll(async () => {
  // one record, p-tag at node 1:1, written as figma:generate writes it
  project = mkdtempSync(join(tmpdir(), 'figma-code-connect-cli-'));
  cpSync(resolve(packageRoot, 'figma/helpers'), join(project, 'figma/helpers'), { recursive: true });
  cpSync(resolve(packageRoot, 'figma.config.json'), join(project, 'figma.config.json'));
  const pull = { components: [{ id: '1:1', name: 'tag', componentPropertyDefinitions: {} }], icons: {} };
  const { files } = generate(
    pull,
    {},
    { getComponentMeta, tags: ['p-tag'], outputRoot: 'generated', fileUrl, version: '0.0.0' }
  );
  mkdirSync(dirname(join(project, template)), { recursive: true });
  writeFileSync(join(project, template), files[template]);
  await new Promise<void>((listening) => figmaApi.listen(0, '127.0.0.1', listening));
});

afterAll(() => {
  figmaApi.close();
  rmSync(project, { recursive: true, force: true });
});

describe('the Code Connect CLI', () => {
  it('names the record whose node fails validation', async () => {
    answer = ({ url: path }) => (path?.includes('/nodes?') ? [200, { nodes: { '1:1': null } }] : undefined);
    const { log } = await connect(['publish', '--dry-run']);
    expect(validationFailures(log)).toEqual([url]);
    expect(nodesUnreachable(log)).toBe(false);
  }, 30_000);

  it('tells a validation that could not read the nodes', async () => {
    answer = ({ url: path }) => (path?.includes('/nodes?') ? [500, { status: 500, err: 'Internal error' }] : undefined);
    const { log } = await connect(['publish', '--dry-run']);
    expect(nodesUnreachable(log)).toBe(true);
    expect(validationFailures(log)).toEqual([]);
  }, 30_000);

  it('exits 0 and names every record the upload refused', async () => {
    const refused = { meta: { published_nodes: [], failed_nodes: [{ figmaNode: url, reason: 'Some reason' }] } };
    answer = ({ method, url: path }) =>
      method === 'POST' && path?.includes('/code_connect?') ? [200, refused] : undefined;
    const { status, log } = await connect(['publish', '--force', '--skip-validation']);
    expect(status).toBe(0);
    expect(uploadFailures(log)).toEqual([{ component: 'p-tag', url, reason: 'Some reason' }]);
  }, 30_000);

  it('marks a preview request that failed, and previews that file again on its own', async () => {
    answer = ({ url: path }) =>
      path?.includes('/preview_snippets?') ? [500, { status: 500, message: 'Internal error' }] : undefined;
    const failed: PreviewResult[] = JSON.parse((await connect(['preview', '--output', 'json'])).stdout);
    expect(failed.map(unreachable)).toEqual([true]);

    const rendered = { meta: { results: [{ nodeId: '1:1', snippet: '<p-tag></p-tag>', language: 'html' }] } };
    answer = ({ url: path }) => (path?.includes('/preview_snippets?') ? [200, rendered] : undefined);
    const again: PreviewResult[] = JSON.parse(
      (await connect(['preview', '--output', 'json', '--file', failed[0].filePath])).stdout
    );
    expect(again.map(({ filePath, success }) => [filePath, success])).toEqual([[template, true]]);
  }, 30_000);

  it('does not mark a template that does not render', async () => {
    const broken = { meta: { results: [{ nodeId: '1:1', error: 'TypeError: boom' }] } };
    answer = ({ url: path }) => (path?.includes('/preview_snippets?') ? [200, broken] : undefined);
    const results: PreviewResult[] = JSON.parse((await connect(['preview', '--output', 'json'])).stdout);
    expect(results.map((result) => [result.success, unreachable(result)])).toEqual([[false, false]]);
  }, 30_000);
});
