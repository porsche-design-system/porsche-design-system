/**
 * Builds the `chat.postMessage` payload that tells design what to change in Figma so Code Connect
 * can follow. Used by .github/workflows/figma-code-connect.yml.
 *
 * SLACK_CHANNEL_ID=C0... node scripts/build-slack-figma-payload.ts <log dir> <components.json>
 *
 * Reads `generate.log` from the log dir (the output of `figma:generate --check` on the current
 * snapshot) and turns each design line into one imperative line per component with a link to the
 * component in Figma. Nothing about GitHub is in the message: designers have no GitHub account.
 * Prints nothing when no line is for design, so the workflow can skip the Send step.
 *
 * The line shapes come from packages/components/figma/messages.ts, the one module the generator and
 * this reader share. No dependencies and no TypeScript needing a transform, so the workflow runs it
 * with bare `node`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COMPONENT_GAP, COVERAGE_GAP, REASON, UNPLACEABLE } from '../packages/components/figma/messages.ts';

type Snapshot = { fileUrl: string };

const [logDir, snapshotPath] = process.argv.slice(2);
if (!logDir || !snapshotPath) {
  console.error('usage: node scripts/build-slack-figma-payload.ts <log dir> <components.json>');
  process.exit(1);
}

const channel = process.env.SLACK_CHANNEL_ID;
if (!channel) {
  console.error('SLACK_CHANNEL_ID is required');
  process.exit(1);
}

const snapshot: Snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
const logPath = join(logDir, 'generate.log');
const lines = existsSync(logPath) ? readFileSync(logPath, 'utf8').split('\n') : [];

/** Names are Figma data landing in markdown, so neutralise its control chars. */
const escapeMarkdown = (value: string): string => value.replace(/[\r\n]+/g, ' ').replace(/([\\`*_[\]~])/g, '\\$1');

const nodeUrl = (id: string): string => `${snapshot.fileUrl}?node-id=${id.replace(':', '-')}`;

/** component name → its actions, in first-seen order */
const actions = new Map<string, { url: string; lines: string[] }>();
const add = (component: string, url: string, line: string): void => {
  const entry = actions.get(component) ?? { url, lines: [] };
  entry.lines.push(line);
  actions.set(component, entry);
};

// A Figma property no rule places. Only these lines and the coverage gaps are Figma-side; stale templates and exception
// typos are repository problems and never reach this file.
const unplaceableAction = (prop: string, reason: string): string => {
  let match = reason.match(REASON.noProp);
  if (match) {
    return `property "${prop}" (${match[1]}) has no PDS prop — rename it to the PDS prop it stands for, or prefix it with "fig" if it is design-only`;
  }
  if (REASON.slotMissing.test(reason)) {
    return `slot property "${prop}" has no PDS slot — rename it to "slot-<PDS slot name>", or prefix it with "fig"`;
  }
  match = reason.match(REASON.disallowedValues);
  if (match)
    return `property "${prop}" has options PDS does not have: ${match[1]} — remove them, or tell us which PDS value each means`;
  match = reason.match(REASON.typeMismatch);
  if (match) return `property "${prop}" is ${match[1]} in Figma but ${match[2]} in PDS — change its type, or tell us`;
  if (REASON.deprecated.test(reason)) return `property "${prop}" is deprecated in PDS — remove it from Figma`;
  match = reason.match(REASON.deprecatedValues);
  if (match) return `property "${prop}" has options deprecated in PDS: ${match[1]} — remove them from Figma`;
  return `property "${prop}" ${reason}`;
};
// A PDS prop, slot or allowed value the library lacks that figma/coverage-baseline.json does not list; `name` is the
// property name Figma needs, with the type and options the rules place, or `prop=value` for a missing variant option.
const coverageAction = (name: string, type?: string, options?: string): string => {
  const [prop, value] = name.split('=');
  if (value !== undefined)
    return `add the option "${value}" to "${prop}" — PDS allows it and the Figma component does not`;
  return `add a ${type} property named "${prop}"${options ? ` with the options ${options}` : ''} — PDS has it and the Figma component does not`;
};
for (const line of lines) {
  const match = line.match(UNPLACEABLE);
  if (match) add(match[1], nodeUrl(match[2]), unplaceableAction(match[3], match[4]));
  const gap = line.match(COVERAGE_GAP);
  if (gap) add(gap[1], nodeUrl(gap[2]), coverageAction(gap[3], gap[4], gap[5]));
  // a PDS component with no Figma component set has no node to link; the link is the library itself
  const set = line.match(COMPONENT_GAP);
  if (set)
    add(
      set[1],
      snapshot.fileUrl,
      `add a component set named "${set[1].replace(/^p-/, '')}" — PDS has the component and the library does not`
    );
}

if (actions.size === 0) {
  process.exit(0); // nothing for design; the workflow keeps the developer-facing issue and summary
}

const count = actions.size;
const headline = `Code Connect needs a Figma change on ${count} component${count === 1 ? '' : 's'}`;
const message = [
  `:figma: ${headline}`,
  '',
  ...[...actions].flatMap(([component, { url, lines }]) => [
    `*[${escapeMarkdown(component)}](${url})*`,
    ...lines.map((text) => `- ${escapeMarkdown(text)}`),
  ]),
  '',
  'When it is done, reply here; a developer then pulls the change into the repository.',
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
