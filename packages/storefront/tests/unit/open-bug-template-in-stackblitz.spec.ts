import OpenBugTemplateInStackBlitz from '@/components/OpenBugTemplateInStackBlitz.vue';

describe('this.getVersions()', () => {
  it('should call global fetch() with correct parameters', async () => {
    const url = 'https://registry.npmjs.org/@porsche-design-system/components-js';
    const spy = jest.spyOn(global, 'fetch');
    const component: any = new OpenBugTemplateInStackBlitz();

    await component['getVersions']();
    expect(spy).toBeCalledWith(url);
  });
});
