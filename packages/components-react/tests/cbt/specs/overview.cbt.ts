import { CrossBrowserTester } from '@porsche-ui/cross-browser-tester';
import { getCrossBrowserTester } from '../helpers/setup';

describe('Components Overview', () => {
  let cbt: CrossBrowserTester;

  beforeAll(() => {
    cbt = getCrossBrowserTester();
  });

  it('should have no visual regression in Edge 18 for basic', async () => {
    expect(await cbt.test('overview-basic', '/basic')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for action', async () => {
    expect(await cbt.test('overview-action', '/action')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for form', async () => {
    expect(await cbt.test('overview-form', '/form')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for feedback', async () => {
    expect(await cbt.test('overview-feedback', '/feedback')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for icon', async () => {
    expect(await cbt.test('overview-icon', '/icon')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for layout', async () => {
    expect(await cbt.test('overview-layout', '/layout')).toBeFalsy();
  });
  it('should have no visual regression in Edge 18 for navigation', async () => {
    expect(await cbt.test('overview-navigation', '/navigation')).toBeFalsy();
  });
});
