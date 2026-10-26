import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { generate } from '../../../figma/generate';

// Generated templates rendered with the real helpers against the `figma` stand-in, as Dev Mode renders a record.
const project = mkdtempSync(join(tmpdir(), 'figma-snippets-'));
cpSync(resolve(__dirname, '../../../figma/helpers'), join(project, 'figma/helpers'), { recursive: true });
afterAll(() => rmSync(project, { recursive: true, force: true }));

const { files } = generate(
  {
    components: ['checkbox', 'button', 'accordion', 'banner', 'textarea'].map((name, i) => ({
      id: `1:${i + 1}`,
      name,
      componentPropertyDefinitions: {},
    })),
    icons: {},
  },
  {},
  {
    getComponentMeta,
    tags: [],
    outputRoot: 'generated',
    fileUrl: 'https://www.figma.com/design/KEY/Library',
    version: '0',
  }
);
const snippet = async (name: string, suffix: string, instance: typeof globalThis.selectedInstance): Promise<string> => {
  const file = join(project, `generated/templates/${name}/${name}${suffix}.figma.ts`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, files[`generated/templates/${name}/${name}${suffix}.figma.ts`]);
  globalThis.selectedInstance = instance;
  vi.resetModules();
  return (await import(file)).default.example;
};

// a designer's text holding what some label's markup reads as code: quotes, angle brackets, braces, @ and entities
const label = `Don't say "hi" &copy;`;
const text = 'a < b > c {d} @if &copy;';
const asAttribute = `Don't say &quot;hi&quot; &amp;copy;`;
const asText = 'a &lt; b &gt; c &#123;d&#125; &#64;if &amp;copy;';

const kebab = (name: string): string => `p-${name}`;
const pascal = (name: string): string => `P${name[0].toUpperCase()}${name.slice(1)}`;

// a slot holding one connected instance, whose record renders `example` as one CODE section
const holding = (slot: string, example: string): typeof globalThis.selectedInstance => ({
  properties: { [slot]: { value: { guid: {} }, type: 'SLOT' } },
  getSlot: () => ({
    connectedInstances: [{ executeTemplate: () => ({ example: [{ type: 'CODE', code: example }] }) }],
  }),
  findLayers: () => [],
});

describe.each([
  { suffix: '', tag: kebab, open: 'open="true"', closed: 'open="false"' },
  { suffix: '.react', tag: pascal, open: 'open={true}', closed: 'open={false}' },
  { suffix: '.angular', tag: kebab, open: '[open]="true"', closed: '[open]="false"' },
  { suffix: '.vue', tag: pascal, open: ':open="true"', closed: ':open="false"' },
])('snippet$suffix', ({ suffix, tag, open, closed }) => {
  it('prints a required boolean prop as true when Figma has no property for it', async () => {
    expect(await snippet('banner', suffix, { properties: {} })).toBe(`<${tag('banner')} ${open}></${tag('banner')}>`);
  });

  it('prints a required boolean prop as false when Figma turns it off', async () => {
    const properties = { open: { value: false, type: 'BOOLEAN' } };
    expect(await snippet('banner', suffix, { properties })).toBe(`<${tag('banner')} ${closed}></${tag('banner')}>`);
  });

  it('prints a required text prop empty when Figma has no property for it', async () => {
    expect(await snippet('textarea', suffix, { properties: {} })).toBe(
      `<${tag('textarea')} name=""></${tag('textarea')}>`
    );
  });

  it("prints a required text prop as the designer's text when Figma has a property for it", async () => {
    const properties = { name: { value: 'comment', type: 'TEXT' } };
    expect(await snippet('textarea', suffix, { properties })).toBe(
      `<${tag('textarea')} name="comment"></${tag('textarea')}>`
    );
  });

  it("prints a designer's text in an attribute as that text", async () => {
    const properties = { label: { value: label, type: 'TEXT' } };
    expect(await snippet('checkbox', suffix, { properties })).toBe(
      `<${tag('checkbox')} label="${asAttribute}"></${tag('checkbox')}>`
    );
  });

  it("prints a designer's text in the default slot as that text", async () => {
    const properties = { 'slot-default': { value: text, type: 'TEXT' } };
    expect(await snippet('button', suffix, { properties })).toBe(`<${tag('button')}>${asText}</${tag('button')}>`);
  });

  it('prints a text layer in a named slot in a span carrying the slot', async () => {
    const instance = {
      properties: { 'slot-summary': { value: { guid: {} }, type: 'SLOT' } },
      getSlot: () => ({ connectedInstances: [] }),
      findLayers: (selector: (layer: unknown) => boolean) =>
        [{ type: 'TEXT', textContent: text, __containingSlotName__: 'slot-summary' }].filter(selector),
    };
    expect(await snippet('accordion', suffix, instance)).toBe(
      `<${tag('accordion')}><span slot="summary">${asText}</span></${tag('accordion')}>`
    );
  });

  it('prints an instance in a named slot carrying the slot on its own tag', async () => {
    const heading = `<${tag('heading')} size="sm">Summary</${tag('heading')}>`;
    expect(await snippet('accordion', suffix, holding('slot-summary', heading))).toBe(
      `<${tag('accordion')}><${tag('heading')} slot="summary" size="sm">Summary</${tag('heading')}></${tag('accordion')}>`
    );
  });

  it('prints an instance in the default slot as it renders', async () => {
    const text = `<${tag('text')} size="sm">Details</${tag('text')}>`;
    expect(await snippet('accordion', suffix, holding('slot-default', text))).toBe(
      `<${tag('accordion')}>${text}</${tag('accordion')}>`
    );
  });
});
