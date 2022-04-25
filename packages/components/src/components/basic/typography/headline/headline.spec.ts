import { Headline } from './headline';
import * as setLineHeightOnSizeInheritModule from '../../../../utils/typography/setLineHeightOnSizeInherit';

describe('headline', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(setLineHeightOnSizeInheritModule, 'setLineHeightOnSizeInherit');
    });

    it('should call setLineHeightOnSizeInherit', () => {
      const component = new Headline();
      component.componentDidLoad();

      expect(spy).toBeCalledWith('headline-1', undefined);
    });
  });
});
