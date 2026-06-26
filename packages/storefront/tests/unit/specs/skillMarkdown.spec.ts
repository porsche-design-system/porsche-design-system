import { escapeCell, leadSentence, stripLeadingH1 } from '@/lib/skill/markdown';
import { describe, expect, it } from 'vitest';

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
});

describe('stripLeadingH1', () => {
  it('drops a redundant leading top-level heading', () => {
    expect(stripLeadingH1('# Title\n\nbody')).toBe('body');
  });
});
