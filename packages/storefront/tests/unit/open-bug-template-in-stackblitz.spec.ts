import OpenBugTemplateInStackBlitz from '@/components/OpenBugTemplateInStackBlitz.vue';

describe('OpenBugTemplateInStackBlitz.vue', () => {
  describe('fetchVersions()', () => {
    it('should call global fetch() with correct parameters', async () => {
      const url = 'https://registry.npmjs.org/@porsche-design-system/components-js';
      const fetchSpy = jest.spyOn(global, 'fetch');
      const component: any = new OpenBugTemplateInStackBlitz();

      const result = await component['fetchVersions']();

      expect(fetchSpy).toBeCalledWith(url, { headers: { accept: 'application/vnd.npm.install-v1+json' } });

      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('2.17.0');
    });
  });

  describe('getFilteredVersions()', () => {
    it('should return filtered versions', async () => {
      const component: any = new OpenBugTemplateInStackBlitz();
      expect(
        component['getFilteredVersions']([
          '1.2.3-rc.1',
          '1.2.3',
          '1.2.4',
          '1.2.5',
          '11.2.5',
          '1.22.5',
          '1.2.55',
          '11.22.33',
          '1.2.3-beta.0',
          '1.2.3-alpha.0',
        ])
      ).toEqual(['11.22.33', '11.2.5', '1.22.5', '1.2.55', '1.2.5', '1.2.4', '1.2.3']);
    });
  });
});
