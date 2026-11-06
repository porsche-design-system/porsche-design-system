// What the Code Connect CLI reports about the records Figma refused and the requests that did not reach Figma, read by
// scripts/figmaConnect.ts. tests/unit/specs/cliOutput.spec.ts makes the installed CLI print each of them.

// `preview --output json` marks a failed request with the kind `transport`, a template that does not render with none.
export type PreviewResult = { filePath: string; success: boolean; error?: string; errorDetails?: { kind?: string } };
export const unreachable = (result: PreviewResult): boolean => result.errorDetails?.kind === 'transport';

// Figma's refusals exist only as these CLI log lines: an upload with refused records still exits successfully.
export const validationFailures = (log: string): string[] =>
  [...log.matchAll(/^Validation failed for .+? \((https:\/\/\S+)\): /gm)].map(([, url]) => url);

export type UploadFailure = { component: string; url: string; reason: string };
// Under each label's header the CLI indents a paragraph with a record's name and URL, then one with its reason.
export const uploadFailures = (log: string): UploadFailure[] => {
  const failures: UploadFailure[] = [];
  // biome-ignore lint/suspicious/noControlCharactersInRegex: the CLI colours the component name and underlines the URL
  const plain = `${log.replace(/\x1b\[[0-9;]*m/g, '')}\n`;
  for (const [, section] of plain.matchAll(/^Failed to upload to Figma, for .+:\n((?: {2}.*\n|\n)*)/gm)) {
    for (const paragraph of section.split(/\n\s*\n/)) {
      const lines = paragraph
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const last = failures[failures.length - 1];
      if (lines.length === 2 && /^https:\/\/\S+$/.test(lines[1])) {
        failures.push({ component: lines[0], url: lines[1], reason: '' });
      } else if (last && lines.length) {
        last.reason = [last.reason, ...lines].filter(Boolean).join(' ');
      }
    }
  }
  return failures;
};

// The validation could not read the nodes; the CLI writes "Failed to to fetch" when the request throws.
export const nodesUnreachable = (log: string): boolean => /^Failed to (?:to )?fetch node info\b/m.test(log);
