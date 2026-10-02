// Prints the Slack payload that tells design what to change in Figma, or nothing when no line is for design.
// Runs under bare `node` in .github/workflows/figma-code-connect.yml: no dependencies, only erasable TypeScript.
// Rationale: docs/runbooks/figma-code-connect.md.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { libraryUrl } from '../packages/components/projects/figma-code-connect/figma/library.ts';
import { CHANGE, LIBRARY_CHANGE } from '../packages/components/projects/figma-code-connect/figma/messages.ts';

const [logDir, configPath] = process.argv.slice(2);
if (!logDir || !configPath) {
  console.error('usage: node scripts/build-slack-figma-payload.ts <log dir> <figma.config.json>');
  process.exit(1);
}

const channel = process.env.SLACK_CHANNEL_ID;
if (!channel) {
  console.error('SLACK_CHANNEL_ID is required');
  process.exit(1);
}

const fileUrl = libraryUrl(configPath);
const logPath = join(logDir, 'generate.log');
const lines = existsSync(logPath) ? readFileSync(logPath, 'utf8').split('\n') : [];

/** Names are Figma data landing in markdown, so neutralise its control chars. */
const escapeMarkdown = (value: string): string => value.replace(/[\r\n]+/g, ' ').replace(/([\\`*_[\]~])/g, '\\$1');

const nodeUrl = (id: string): string => `${fileUrl}?node-id=${id.replace(':', '-')}`;

/** component name → its changes, in first-seen order */
const actions = new Map<string, { url: string; lines: string[] }>();
const add = (component: string, url: string, line: string): void => {
  const entry = actions.get(component) ?? { url, lines: [] };
  entry.lines.push(line);
  actions.set(component, entry);
};

for (const line of lines) {
  const onComponent = line.match(CHANGE);
  if (onComponent) add(onComponent[1], nodeUrl(onComponent[2]), onComponent[3]);
  // a component set or an icon to add has no node to link; the link is the library itself
  const onLibrary = onComponent ? null : line.match(LIBRARY_CHANGE);
  if (onLibrary) add(onLibrary[1], fileUrl, onLibrary[2]);
}

if (actions.size === 0) {
  process.exit(0); // nothing for design; the workflow keeps the developer-facing issue and summary
}

const components = actions.size;
const changes = [...actions.values()].reduce((sum, { lines }) => sum + lines.length, 0);
const headline = `Code Connect: ${changes} change${changes === 1 ? '' : 's'} on ${components} component${components === 1 ? '' : 's'}`;
const designOnly = [...actions.values()].some(({ lines }) => lines.some((text) => text.includes('→ "fig')));
const message = [
  `:figma: ${headline}`,
  '',
  ...[...actions].flatMap(([component, { url, lines }]) => [
    `*[${escapeMarkdown(component)}](${url})*`,
    ...lines.map((text) => `- ${escapeMarkdown(text)}`),
  ]),
  '',
  ...(designOnly ? ['A fig… name marks a property that only matters in Figma.'] : []),
  'Publish the library and Dev Mode shows the change; a new component or icon follows with the next daily run.',
].join('\n');

console.log(
  JSON.stringify(
    {
      channel,
      // Fallback for notifications and clients that cannot render blocks.
      text: headline,
      blocks: [{ type: 'markdown', text: message }],
    },
    null,
    2
  )
);
