import OpenBugTemplateInStackBlitz from '@/components/OpenBugTemplateInStackBlitz.vue';

describe('this.fetchVersions()', () => {
  it('should call global fetch() with correct parameters', async () => {
    const url = 'https://registry.npmjs.org/@porsche-design-system/components-js';
    const spy = jest.spyOn(global, 'fetch');
    const component: any = new OpenBugTemplateInStackBlitz();

    await component['fetchVersions']();
    expect(spy).toBeCalledWith(url);
  });
});

describe('this.getFilteredKeys()', () => {
  it('should return filtered keys', async () => {
    const component: any = new OpenBugTemplateInStackBlitz();
    expect(component['getFilteredKeys']({ '1.2.3-rc.1': 'test', '1.2.3': 'test', '1.2.3-beta.0': 'test' })).toEqual([
      '1.2.3',
    ]);
  });
});
