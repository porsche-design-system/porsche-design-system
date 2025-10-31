import { vi } from 'vitest';
import * as loggerUtils from '../../utils/log/logger';
import { warnIfDeprecatedComponentIsUsed } from './warnIfDeprecatedComponentIsUsed';

it('should call consoleWarn() util with correct parameter', () => {
  const host = document.createElement('div');
  const spy = vi.spyOn(loggerUtils, 'consoleWarn').mockImplementation(()=> null);
  warnIfDeprecatedComponentIsUsed(host, 'Use some other component instead.');

  expect(spy).toHaveBeenCalledWith(
    'component div is deprecated and will be removed with next major release.',
    'Use some other component instead.',
    host
  );
});
