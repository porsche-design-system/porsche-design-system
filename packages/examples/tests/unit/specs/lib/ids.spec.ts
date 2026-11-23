import { assertExampleId, componentOf, type ExampleIdKind, getExampleIdError } from '../../../../lib/ids';

describe('getExampleIdError()', () => {
  it.each<[string, ExampleIdKind]>([
    ['components/select/set-value', 'framework'],
    ['components/toast/default', 'framework'],
    ['components/button/default', 'story'],
    ['components/input-text/form', 'story'],
    ['components/button/accessibility/icon-only-button', 'accessibility'],
    ['ag-grid/theme/compact', 'framework'],
    ['ag-grid/theme/default', 'framework'],
    ['patterns/header/overlay', 'pattern'],
    ['templates/landing-page', 'template'],
  ])('accepts %s for a %s example', (id, kind) => {
    expect(getExampleIdError(id, kind)).toBeUndefined();
  });

  it.each([
    'select',
    'components/Select/form',
    'components/select/set_value',
    'components/select/form/',
    '/components/select/form',
    'components//form',
  ])('rejects %s as malformed', (id) => {
    expect(getExampleIdError(id, 'story')).toMatch('is not an example id');
  });

  it('accepts "default" as the last segment only', () => {
    expect(getExampleIdError('components/button/default/form', 'story')).toMatch('"default" before its last segment');
  });

  it.each<ExampleIdKind>(['accessibility', 'pattern', 'template'])('gives a %s example no default', (kind) => {
    const id = kind === 'accessibility' ? 'components/button/accessibility/default' : 'patterns/header/default';
    expect(getExampleIdError(id, kind)).toMatch('only a story or a framework example can be a default example');
  });

  it.each<[string, ExampleIdKind]>([
    ['components/button/accessibility/icon-only', 'story'],
    ['components/tabs-bar/accessibility', 'framework'],
    ['components/button/icon-only', 'accessibility'],
    ['components/button/accessibility/icon-only/nested', 'accessibility'],
    ['patterns/accessibility/header', 'pattern'],
  ])('reserves "accessibility" for components/<component>/accessibility/<slug>: %s as a %s example', (id, kind) => {
    expect(getExampleIdError(id, kind)).toMatch('"accessibility" is reserved');
  });
});

describe('assertExampleId()', () => {
  it('returns a valid id', () => {
    expect(assertExampleId('components/button/form', 'story', 'examples-stories')).toBe('components/button/form');
  });

  it('names the project and the id it rejects', () => {
    expect(() => assertExampleId('components/Button/form', 'story', 'examples-stories')).toThrow(
      '[examples-stories] "components/Button/form" is not an example id'
    );
  });
});

describe('componentOf()', () => {
  it('names the component of an example below components/', () => {
    expect(componentOf('components/select/slots')).toBe('p-select');
    expect(componentOf('components/button/accessibility/icon-only')).toBe('p-button');
  });

  it('names none for an example of something else', () => {
    expect(componentOf('ag-grid/theme/compact')).toBeUndefined();
  });
});
