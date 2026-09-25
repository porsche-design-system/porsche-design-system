import {
  COMPONENT_GAP,
  componentGapLine,
  COVERAGE_GAP,
  coverageGapLine,
  printed,
  REASON,
  reasons,
  UNPLACEABLE,
  unplaceableLine,
} from '../../../figma/messages';

describe('figma messages', () => {
  it('round-trips a Figma property the rules cannot place into the parts the Slack builder needs', () => {
    const line = printed(unplaceableLine('tag', '106:261', 'p-tag', 'dense', reasons.noProp('VARIANT')));
    expect(line.match(UNPLACEABLE)?.slice(1)).toEqual(['tag', '106:261', 'dense', '(VARIANT) has no PDS prop']);
    expect(line).not.toMatch(COVERAGE_GAP);
  });

  it('gives every reason a matcher that captures what the design action needs', () => {
    expect(reasons.slotMissing).toMatch(REASON.slotMissing);
    expect(reasons.noProp('TEXT').match(REASON.noProp)?.slice(1)).toEqual(['TEXT']);
    expect(reasons.disallowedValues(['mixed', 'other']).match(REASON.disallowedValues)?.slice(1)).toEqual([
      'mixed, other',
    ]);
    expect(reasons.typeMismatch('TEXT', 'boolean').match(REASON.typeMismatch)?.slice(1)).toEqual(['TEXT', 'boolean']);
    expect(reasons.deprecated).toMatch(REASON.deprecated);
    expect(reasons.deprecatedValues(['tertiary']).match(REASON.deprecatedValues)?.slice(1)).toEqual(['tertiary']);
    expect(reasons.deprecatedValues(['tertiary'])).not.toMatch(REASON.disallowedValues);
  });

  it('round-trips a PDS component with no Figma component set, which has no node id to name', () => {
    const line = printed(componentGapLine('p-sheet'));
    expect(line).toBe('✖ p-sheet has no Figma component set — add it in Figma');
    expect(line.match(COMPONENT_GAP)?.[1]).toBe('p-sheet');
    expect(line).not.toMatch(UNPLACEABLE);
    expect(line).not.toMatch(COVERAGE_GAP);
  });

  it('round-trips a coverage gap with the property type design must add, or the option', () => {
    const text = printed(coverageGapLine('button', '225:216', 'p-button', 'iconSource', { type: 'TEXT' }));
    const variant = printed(
      coverageGapLine('button', '225:216', 'p-button', 'size', { type: 'VARIANT', options: ['small', 'medium'] })
    );
    const slot = printed(coverageGapLine('button', '225:216', 'p-button', 'slot-footer', { type: 'SLOT' }));
    const option = printed(coverageGapLine('button', '225:216', 'p-button', 'variant=destructive'));
    expect(text).toContain('has no Figma TEXT property — add it in Figma');
    expect(variant).toContain('has no Figma VARIANT property with the options small, medium — add it in Figma');
    expect(option).toContain('has no Figma option — add it in Figma');
    expect(text.match(COVERAGE_GAP)?.slice(1)).toEqual(['button', '225:216', 'iconSource', 'TEXT', undefined]);
    expect(variant.match(COVERAGE_GAP)?.slice(1)).toEqual(['button', '225:216', 'size', 'VARIANT', 'small, medium']);
    expect(slot.match(COVERAGE_GAP)?.slice(1)).toEqual(['button', '225:216', 'slot-footer', 'SLOT', undefined]);
    expect(option.match(COVERAGE_GAP)?.slice(1)).toEqual([
      'button',
      '225:216',
      'variant=destructive',
      undefined,
      undefined,
    ]);
    expect(text).not.toMatch(UNPLACEABLE);
  });

  it('does not mistake a repository mistake for a design line', () => {
    for (const line of [
      'src/components/tag/figma/tag.figma.ts is stale — run "npm run figma:generate"',
      'p-tag has no prop "foo" (Figma "foo")',
      'p-tag: two Figma properties map to "label" — add an exception to figma/exceptions.ts',
    ].map(printed)) {
      expect(line).not.toMatch(UNPLACEABLE);
      expect(line).not.toMatch(COVERAGE_GAP);
      expect(line).not.toMatch(COMPONENT_GAP);
    }
  });
});
