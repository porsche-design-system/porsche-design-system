import 'jasmine';
import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(async () => {
    cbt = await getCrossBrowserTester();
  });

  it('basic should have no visual regression in IE11', async () => {
    expect(await cbt.test('basic', '/basic')).toBeFalsy();
  });
  it('action should have no visual regression in IE11', async () => {
    expect(await cbt.test('action', '/action')).toBeFalsy();
  });
  it('feedback should have no visual regression in IE11', async () => {
    expect(await cbt.test('feedback', '/feedback')).toBeFalsy();
  });
  it('icon should have no visual regression in IE11', async () => {
    expect(await cbt.test('icon', '/icon')).toBeFalsy();
  });
  it('layout should have no visual regression in IE11', async () => {
    expect(await cbt.test('layout', '/layout')).toBeFalsy();
  });
  it('navigation should have no visual regression in IE11', async () => {
    expect(await cbt.test('navigation', '/navigation')).toBeFalsy();
  });
});
