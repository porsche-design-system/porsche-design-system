import { sharedTilePropTypes } from './link-tile-utils';

describe('sharedTilePropTypes', () => {
  it('should expose the shared tile prop validators', () => {
    expect(Object.keys(sharedTilePropTypes).sort()).toStrictEqual(
      ['align', 'aspectRatio', 'compact', 'description', 'gradient', 'label', 'size'].sort()
    );
  });
});
