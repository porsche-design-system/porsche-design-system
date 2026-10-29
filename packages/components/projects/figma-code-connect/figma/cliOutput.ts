// What the Code Connect CLI reports about the records Figma refused and the requests that did not reach Figma, read by
// scripts/figmaConnect.ts. tests/unit/specs/cliOutput.spec.ts makes the installed CLI print each of them.

// `preview --output json` marks a failed request with the kind `transport`, a template that does not render with none.
export type PreviewResult = {
  filePath: string;
  success: boolean;
  snippet?: string;
  error?: string;
  errorDetails?: { kind?: string };
};
export const unreachable = (result: PreviewResult): boolean => result.errorDetails?.kind === 'transport';
// The CLI runs Prettier over a snippet Figma rendered. It also fails a nested record Figma renders in another label
// (figma/code-connect#418), so this failure alone does not mean the template is broken.
export const syntaxCheckOnly = (result: PreviewResult): boolean =>
  result.snippet !== undefined && result.error === 'Snippet has syntax errors and may not be valid code';

// Figma's refusals exist only as these CLI log lines: an upload with refused records still exits successfully.
export const validationFailures = (log: string): string[] =>
  [...log.matchAll(/^Validation failed for .+? \((https:\/\/\S+)\): /gm)].map(([, url]) => url);

export type UploadFailure = { component: string; url: string; reason: string };
export const uploadFailures = (log: string): UploadFailure[] => {
  const failures: UploadFailure[] = [];
  let inFailures = false;
  for (const raw of log.split('\n')) {
    // biome-ignore lint/suspicious/noControlCharactersInRegex: the CLI colours the component name and underlines the URL
    const line = raw.replace(/\x1b\[[0-9;]*m/g, '');
    if (/^Failed to upload to Figma, for .+:$/.test(line)) {
      inFailures = true;
      continue;
    }
    const record = line.match(/^-> (.+?) (https:\/\/\S+) \((.*)\)$/);
    if (inFailures && record) failures.push({ component: record[1], url: record[2], reason: record[3] });
    else if (line.trim() && !line.startsWith('->')) inFailures = false;
  }
  return failures;
};

// The validation could not read the nodes; the CLI writes "Failed to to fetch" when the request throws.
export const nodesUnreachable = (log: string): boolean => /^Failed to (?:to )?fetch node info\b/m.test(log);
