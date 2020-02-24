import 'jasmine';
import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(async () => {
    cbt = await getCrossBrowserTester();
  });

  it('basic should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-basic', '/src/#basic')).toBeFalsy();
  });
  it('action should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-action', '/src/#action')).toBeFalsy();
  });
  it('feedback should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-feedback', '/src/#feedback')).toBeFalsy();
  });
  it('icon should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-icon', '/src/#icon')).toBeFalsy();
  });
  it('layout should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-layout', '/src/#layout')).toBeFalsy();
  });
  it('navigation should have no visual regression in IE11', async () => {
    expect(await cbt.test('overview-navigation', '/src/#navigation')).toBeFalsy();
  });
});
