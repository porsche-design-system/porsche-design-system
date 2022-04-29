import { Text } from './text';
import * as setLineHeightOnSizeInheritModule from '../../../../utils/typography/setLineHeightOnSizeInherit';

describe('text', () => {
  describe('componentDidLoad', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(setLineHeightOnSizeInheritModule, 'setLineHeightOnSizeInherit');
    });

    it('should call setLineHeightOnSizeInherit', () => {
      const component = new Text();
      component.componentDidLoad();

      expect(spy).toBeCalledWith('small', undefined);
    });
  });
});
