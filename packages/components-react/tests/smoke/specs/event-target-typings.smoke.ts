import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { expect, test } from 'vitest';

test('types custom-event targets through the published React and SSR entry points', () => {
  const fixturePath = fileURLToPath(new URL('../fixtures/event-target-typings.tsx', import.meta.url));
  const fixture = fs.readFileSync(fixturePath, 'utf8');
  const sources = new Map(
    ['csr', 'ssr'].map((entryPoint) => [
      path.join(path.dirname(fixturePath), `event-target-typings.${entryPoint}.tsx`),
      fixture.replace(
        "'@porsche-design-system/components-react'",
        `'@porsche-design-system/components-react${entryPoint === 'ssr' ? '/ssr' : ''}'`
      ),
    ])
  );
  const options: ts.CompilerOptions = {
    noEmit: true,
    noUnusedLocals: true,
    strict: true,
    skipLibCheck: true,
    types: ['react'],
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    jsx: ts.JsxEmit.ReactJSX,
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    const source = sources.get(fileName);
    return source === undefined
      ? getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile)
      : ts.createSourceFile(fileName, source, languageVersion, true);
  };
  const program = ts.createProgram([...sources.keys()], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  expect(
    diagnostics.map((diagnostic) => {
      const position =
        diagnostic.file && diagnostic.start !== undefined
          ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
          : undefined;
      return `${diagnostic.file?.fileName}:${position ? position.line + 1 : ''} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
    })
  ).toEqual([]);
}, 30_000);
