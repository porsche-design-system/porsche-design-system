import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(() => {
    cbt = getCrossBrowserTester();
  });

  it('should have no visual regression in IE11 for basic', async () => {
    expect(await cbt.test('overview-basic', '/index.html#basic')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for action', async () => {
    expect(await cbt.test('overview-action', '/index.html#action')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for content', async () => {
    expect(await cbt.test('overview-content', '/index.html#content')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for feedback', async () => {
    expect(await cbt.test('overview-form', '/index.html#form')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for feedback', async () => {
    expect(await cbt.test('overview-feedback', '/index.html#feedback')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for icon', async () => {
    expect(await cbt.test('overview-icon', '/index.html#icon')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for layout', async () => {
    expect(await cbt.test('overview-layout', '/index.html#layout')).toBeFalsy();
  });
  it('should have no visual regression in IE11 for navigation', async () => {
    expect(await cbt.test('overview-navigation', '/index.html#navigation')).toBeFalsy();
  });
});
