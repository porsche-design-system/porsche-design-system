import { getCrossBrowserTester } from '../helpers/setup';

describe('Overview', () => {
  it('should have no visual regression in Edge 18', async () => {
    const cbt = getCrossBrowserTester();
    expect(await cbt.test('overview', '/overview')).toBeFalsy();
  });
});
