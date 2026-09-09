import { escapeCell, headingSlug, leadSentence, markdownTable, stripLeadingH1 } from '@skills/shared/markdown';
import { describe, expect, it } from 'vitest';

describe('headingSlug', () => {
  it('lower-cases, drops punctuation, and hyphenates whitespace', () => {
    expect(headingSlug('CSS Variables')).toBe('css-variables');
    expect(headingSlug('  Spaced   Out  ')).toBe('spaced-out');
    expect(headingSlug('p-button (deprecated)')).toBe('p-button-deprecated');
    // Runs of whitespace collapse to a *single* hyphen — a minor divergence from GitHub (which would
    // keep a hyphen per space) that is harmless for the single-word token categories linked today.
    expect(headingSlug('Slots & Events')).toBe('slots-events');
  });
});

describe('markdownTable', () => {
  it('emits a header, a separator row, and one row per data entry', () => {
    expect(markdownTable(['Name', 'Type'], [['open', 'boolean']])).toBe(
      ['| Name | Type |', '| --- | --- |', '| open | boolean |'].join('\n')
    );
  });

  it('emits just the header and separator when there are no rows', () => {
    expect(markdownTable(['A', 'B'], [])).toBe(['| A | B |', '| --- | --- |'].join('\n'));
  });
});

describe('leadSentence', () => {
  it('returns the first sentence of the leading paragraph', () => {
    expect(leadSentence('The `p-button` performs actions. It can submit forms.')).toBe(
      'The `p-button` performs actions.'
    );
  });

  it('does not truncate at a dotted abbreviation mid-sentence', () => {
    expect(leadSentence('Provides feedback messages (e.g. confirmations) to the user. More detail follows.')).toBe(
      'Provides feedback messages (e.g. confirmations) to the user.'
    );
    expect(leadSentence('Useful in some cases, i.e. when validating. Next sentence.')).toBe(
      'Useful in some cases, i.e. when validating.'
    );
  });

  it('only considers the leading paragraph', () => {
    expect(leadSentence('A short summary.\n\nA second paragraph that is ignored.')).toBe('A short summary.');
  });

  it('falls back to the whole paragraph when there is no sentence boundary', () => {
    expect(leadSentence('No terminator here')).toBe('No terminator here');
  });
});

describe('escapeCell', () => {
  it('escapes pipes and collapses whitespace', () => {
    expect(escapeCell('a |  b\nc')).toBe('a \\| b c');
  });

  it('escapes backslashes before pipes so an escaped pipe is not misread as a delimiter', () => {
    expect(escapeCell('a \\| b')).toBe('a \\\\\\| b');
    expect(escapeCell('trailing \\')).toBe('trailing \\\\');
  });
});

describe('stripLeadingH1', () => {
  it('drops a redundant leading top-level heading', () => {
    expect(stripLeadingH1('# Title\n\nbody')).toBe('body');
  });
});
