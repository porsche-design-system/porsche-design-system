import { getInitialStyles } from '../../../src';

describe('getInitialStyles()', () => {
  it('should return style element with Porsche Design System components', () => {
    const result = getInitialStyles();
    expect(result).toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should return core styles without style tag', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const result = getInitialStyles({ withoutTags: true });

    expect(spy).toBeCalledWith(
      'The option "{ withoutTags: true }" of partial getInitialStyles() is deprecated and will be removed in v3'
    );

    expect(result).not.toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should be minified', () => {
    const result = getInitialStyles();
    expect(result).not.toContain(' ');
    expect(result).not.toContain('\n');
  });

  it('should add custom prefixes to style names', () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).not.toContain(',p-button');
    expect(result).toContain('custom-prefix-p-textarea-wrapper');
  });
  describe('format jsx', () => {
    it('should return core styles', () => {
      const result = getInitialStyles({ format: 'jsx' });
      expect(result).toMatchSnapshot();
    });
    it('should add custom prefix', () => {
      const result = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
      expect(result).toMatchSnapshot();
    });
  });
});
