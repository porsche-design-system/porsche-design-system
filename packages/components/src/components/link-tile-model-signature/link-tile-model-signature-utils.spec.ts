import { setRequiredPropsOfSlottedLinks } from './link-tile-model-signature-utils';

describe('setRequiredPropsOfSlottedLinks()', () => {
  it('should set correct theme and variant on passed links', () => {
    const primaryLink: HTMLPLinkElement = document.createElement('p-link');
    const secondaryLink: HTMLPLinkElement = document.createElement('p-link');
    primaryLink.slot = 'primary';
    secondaryLink.slot = 'secondary';

    setRequiredPropsOfSlottedLinks([primaryLink, secondaryLink]);

    expect(primaryLink.theme).toBe('dark');
    expect(secondaryLink.theme).toBe('dark');
    expect(primaryLink.variant).toBe('primary');
    expect(secondaryLink.variant).toBe('secondary');
  });
});
