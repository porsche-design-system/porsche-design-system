import { warnIfDeprecatedComponentIsUsed } from './warnIfDeprecatedComponentIsUsed';
import * as loggerUtils from '../../utils/log/logger';

it('should call consoleWarn() util with correct parameter', () => {
  const host = document.createElement('div');
  const spy = jest.spyOn(loggerUtils, 'consoleWarn').mockImplementation();
  warnIfDeprecatedComponentIsUsed(host, 'Use some other component instead.');

  expect(spy).toHaveBeenCalledWith(
    'component "div" is deprecated and will be removed with next major release.',
    'Use some other component instead.'
  );
});
