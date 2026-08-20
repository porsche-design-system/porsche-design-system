import { CANVAS_BACKGROUNDS } from './canvas-utils';

describe('CANVAS_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(CANVAS_BACKGROUNDS).toStrictEqual(['canvas', 'surface']);
  });
});
