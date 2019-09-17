import 'jasmine';
import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(async () => {
    cbt = await getCrossBrowserTester();
  });

  it('should have no visual regression in IE11', async () => {
    expect(await cbt.test('/index.html', 'overview')).toBeFalsy();
  });
});
