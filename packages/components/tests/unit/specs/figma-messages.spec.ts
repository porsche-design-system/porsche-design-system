import {
  COVERAGE_GAP,
  coverageGapLine,
  printed,
  REASON,
  reasons,
  UNPLACEABLE,
  unplaceableLine,
  WAITING_ON_DESIGN,
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
  });

  it('round-trips a coverage gap, naming a property or an option by its shape', () => {
    const property = printed(coverageGapLine('button', '225:216', 'p-button', 'iconSource'));
    const option = printed(coverageGapLine('button', '225:216', 'p-button', 'variant=destructive'));
    expect(property).toContain('has no Figma property');
    expect(option).toContain('has no Figma option');
    expect(property.match(COVERAGE_GAP)?.slice(1)).toEqual(['button', '225:216', 'iconSource']);
    expect(option.match(COVERAGE_GAP)?.slice(1)).toEqual(['button', '225:216', 'variant=destructive']);
    expect(property).not.toMatch(UNPLACEABLE);
  });

  it('lets figmaConnect.ts read the node id to hold back from either kind of line', () => {
    const unplaceable = printed(unplaceableLine('tag', '106:261', 'p-tag', 'dense', reasons.noProp('VARIANT')));
    const gap = printed(coverageGapLine('button', '225:216', 'p-button', 'iconSource'));
    expect(unplaceable.match(WAITING_ON_DESIGN)?.[1]).toBe('106:261');
    expect(gap.match(WAITING_ON_DESIGN)?.[1]).toBe('225:216');
  });

  it('does not mistake a repository mistake for a component waiting on design', () => {
    for (const line of [
      'src/components/tag/figma/tag.figma.ts is stale — run "npm run figma:generate"',
      'p-tag has no prop "foo" (Figma "foo")',
      'p-tag: two Figma properties map to "label" — add an exception to figma/exceptions.ts',
    ].map(printed)) {
      expect(line).not.toMatch(WAITING_ON_DESIGN);
      expect(line).not.toMatch(UNPLACEABLE);
      expect(line).not.toMatch(COVERAGE_GAP);
    }
  });
});
