import { getInitialStyles } from '../../../src';
import { render } from '@testing-library/react';

describe('getInitialStyles()', () => {
  it('should return style element with Porsche Design System components', () => {
    const result = getInitialStyles();
    expect(result).toContain('<style>');
    expect(result).toContain('p-button');
    expect(result).toContain('p-textarea-wrapper');
  });

  it('should return core styles without style tag', () => {
    const result = getInitialStyles({ withoutTags: true });

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
      const { container } = render(getInitialStyles({ format: 'jsx' }));
      const result = container.innerHTML;

      expect(result).toContain('<style>');
      expect(result).toContain('p-button');
      expect(result).toContain('p-textarea-wrapper');
    });

    it('should add custom prefix', () => {
      const { container } = render(getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' }));
      const result = container.innerHTML;

      expect(result).toContain('custom-prefix-p-button');
      expect(result).toContain('custom-prefix-p-textarea-wrapper');
    });
  });
});
