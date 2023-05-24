import {
  getLinkOrSlottedAnchorElement,
  LINK_TILE_MODEL_SIGNATURE_MODELS,
  setRequiredPropsOfSlottedLinks,
} from './link-tile-model-signature-utils';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';

describe('LINK_TILE_MODEL_SIGNATURE_MODELS', () => {
  it('should contain all elements of MODEL_SIGNATURE_MODELS', () => {
    expect(LINK_TILE_MODEL_SIGNATURE_MODELS).toEqual(MODEL_SIGNATURE_MODELS);
  });

  it('should not be a reference of MODEL_SIGNATURE_MODELS', () => {
    expect(LINK_TILE_MODEL_SIGNATURE_MODELS).not.toBe(MODEL_SIGNATURE_MODELS);
  });
});

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

describe('getLinkOrSlottedAnchorElement()', () => {
  it('should return link parameter if href is defined', () => {
    const link: HTMLPLinkElement = document.createElement('p-link');
    link.href = '#';

    expect(getLinkOrSlottedAnchorElement(link)).toBe(link);
  });

  it('should return anchor child if href not defined', () => {
    const link: HTMLPLinkElement = document.createElement('p-link');
    const child1 = document.createElement('span');
    const child2 = document.createElement('a');
    const child3 = document.createElement('span');
    link.append(child1);
    link.append(child2);
    link.append(child3);

    expect(getLinkOrSlottedAnchorElement(link)).toBe(child2);
  });
});
