import { diffSnapshots } from '../../../figma/diff';
import type { Component, Definition } from '../../../figma/snapshot';

const set = (definitions: Record<string, Definition>, overrides: Partial<Component> = {}): Component => ({
  id: '1:1',
  name: 'tag',
  componentPropertyDefinitions: definitions,
  ...overrides,
});
const snapshot = (components: Component[], icons: Record<string, string> = {}) => ({ components, icons });

describe('diffSnapshots', () => {
  it('reports nothing when the fresh pull equals the committed snapshot, whatever the node-id suffixes', () => {
    const committed = snapshot([set({ 'compact#1:2': { type: 'BOOLEAN', defaultValue: false } })], { '9:9': 'close' });
    const fresh = snapshot([set({ 'compact#1:3': { type: 'BOOLEAN', defaultValue: false } })], { '9:9': 'close' });
    expect(diffSnapshots(committed, fresh)).toEqual([]);
  });

  it('reports nothing when a republish only lists the same sets, properties or icons in another order', () => {
    const tag = set({ compact: { type: 'BOOLEAN' }, label: { type: 'TEXT' } });
    const button = set({ variant: { type: 'VARIANT', variantOptions: ['primary'] } }, { id: '2:2', name: 'button' });
    const tagReordered = set({ label: { type: 'TEXT' }, compact: { type: 'BOOLEAN' } });
    const committed = snapshot([tag, button], { '9:1': 'close', '9:2': 'globe' });
    const fresh = snapshot([button, tagReordered], { '9:2': 'globe', '9:1': 'close' });
    expect(diffSnapshots(committed, fresh)).toEqual([]);
  });

  it('reports a property added, removed or retyped', () => {
    const committed = snapshot([set({ compact: { type: 'BOOLEAN' }, label: { type: 'TEXT' } })]);
    const fresh = snapshot([set({ dense: { type: 'BOOLEAN' }, label: { type: 'VARIANT', variantOptions: ['a'] } })]);
    expect(diffSnapshots(committed, fresh)).toEqual([
      'tag: property "compact" removed or renamed',
      'tag: property "dense" added',
      'tag: "label" changed type TEXT → VARIANT',
      'tag: "label=a" added',
    ]);
  });

  it('reports a variant option added or removed', () => {
    const committed = snapshot([set({ variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary'] } })]);
    const fresh = snapshot([set({ variant: { type: 'VARIANT', variantOptions: ['primary', 'ghost'] } })]);
    expect(diffSnapshots(committed, fresh)).toEqual(['tag: "variant=ghost" added', 'tag: "variant=secondary" removed']);
  });

  it('reports a changed default, which feeds the icon fallback', () => {
    const committed = snapshot([set({ icon: { type: 'INSTANCE_SWAP', defaultValue: '5:1' } })]);
    const fresh = snapshot([set({ icon: { type: 'INSTANCE_SWAP', defaultValue: '5:2' } })]);
    expect(diffSnapshots(committed, fresh)).toEqual(['tag: "icon" default changed "5:1" → "5:2"']);
  });

  it('reports a component set renamed, added or no longer published', () => {
    const committed = snapshot([set({}), set({}, { id: '2:2', name: 'old-thing' })]);
    const fresh = snapshot([set({}, { name: 'fig-tag' }), set({}, { id: '3:3', name: 'new-thing' })]);
    expect(diffSnapshots(committed, fresh)).toEqual([
      'tag (1:1): component set renamed "tag" → "fig-tag"',
      'new-thing (3:3): new component set',
      'old-thing (2:2): component set no longer published',
    ]);
  });

  it('reports an icon added, removed or renamed', () => {
    const committed = snapshot([], { '9:1': 'close', '9:2': 'globe' });
    const fresh = snapshot([], { '9:1': 'cross', '9:3': 'search' });
    expect(diffSnapshots(committed, fresh)).toEqual([
      'icon 9:1 renamed "close" → "cross"',
      'icon 9:3 "search" added',
      'icon 9:2 "globe" removed',
    ]);
  });

  it('still fails on a difference the readable diff does not know, so nothing slips through', () => {
    const committed = snapshot([set({ compact: { type: 'BOOLEAN' } })]);
    const fresh = snapshot([set({ compact: { type: 'BOOLEAN', somethingNew: 1 } as Definition })]);
    expect(diffSnapshots(committed, fresh)).toEqual([
      'the snapshots differ in a way this diff does not describe — run "npm run figma:pull" and read the file diff',
    ]);
  });
});
