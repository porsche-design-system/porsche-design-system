import { textMap } from './textMap';

describe('textMap', () => {
  it('should stay the same', () => {
    expect(textMap).toMatchSnapshot();
  });
});
