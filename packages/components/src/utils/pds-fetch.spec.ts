import { pdsFetch } from './pds-fetch';

describe('pdsFetch()', () => {
  it('should call global fetch', async () => {
    const url =
      'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.92184fae44511ceda8320443c17110b1@2x.png';
    const spy = jest.spyOn(global, 'fetch');
    await pdsFetch(url, undefined);
    expect(spy).toBeCalledWith(url, undefined);
  });
});
