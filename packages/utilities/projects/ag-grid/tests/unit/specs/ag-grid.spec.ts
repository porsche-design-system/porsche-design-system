import { Part, _asThemeImpl } from 'ag-grid-community';
import { pdsTheme } from '../../../src';
import { checkboxStyle, pdsSvgIcons, toggleButtonStyle } from '../../../src/parts';

describe('pdsTheme', () => {
  const theme = _asThemeImpl(pdsTheme);
  const parts: Part[] = [checkboxStyle, toggleButtonStyle, pdsSvgIcons];

  it('should match the snapshot for CSS Class Names', () => {
    const classNames = theme._getCssClass();
    expect(classNames).toMatchSnapshot();
  });

  it('should match the snapshot for CSS Chunk', () => {
    const cssChunk = theme._getPerGridCss('some-class-name');
    expect(cssChunk).toMatchSnapshot();
  });

  it('should match the snapshot for mode params', () => {
    const modeParams = theme._getModeParams();
    expect(modeParams).toMatchSnapshot();
  });

  parts.forEach((part) => {
    it(`should match the snapshot for ${part.feature ?? 'pdsSvgIcons'} CSS`, () => {
      expect(part.css).toMatchSnapshot();
    });
  });
});
