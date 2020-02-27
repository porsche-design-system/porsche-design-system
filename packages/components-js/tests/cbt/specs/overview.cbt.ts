import 'jasmine';
import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(async () => {
    cbt = await getCrossBrowserTester();
  });

  it('basic should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-basic', '/index.html#basic')).toBeFalsy();
  });
  it('action should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-action', '/index.html#action')).toBeFalsy();
  });
  it('feedback should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-feedback', '/index.html#feedback')).toBeFalsy();
  });
  it('icon should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-icon', '/index.html#icon')).toBeFalsy();
  });
  it('layout should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-layout', '/index.html#layout')).toBeFalsy();
  });
  it('navigation should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-navigation', '/index.html#navigation')).toBeFalsy();
  });
});
