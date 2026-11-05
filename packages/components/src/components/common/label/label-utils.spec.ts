import { descriptionId, isEventInInteractiveLabelContent, LABEL_TAGS, labelId } from './label-utils';

describe('labelId', () => {
  it('should be the label element id', () => {
    expect(labelId).toBe('label');
  });
});

describe('descriptionId', () => {
  it('should be the description element id', () => {
    expect(descriptionId).toBe('description');
  });
});

describe('LABEL_TAGS', () => {
  it('should list supported label tags', () => {
    expect(LABEL_TAGS).toStrictEqual(['label', 'div']);
  });
});

describe('isEventInInteractiveLabelContent()', () => {
  it('should return false when composedPath only contains non-interactive elements up to currentTarget', () => {
    const label = document.createElement('label');
    const span = document.createElement('span');
    const event = {
      currentTarget: label,
      composedPath: () => [span, label, document.body],
    } as unknown as MouseEvent;

    expect(isEventInInteractiveLabelContent(event)).toBe(false);
  });

  it('should return true when composedPath contains a link with href before currentTarget', () => {
    const label = document.createElement('label');
    const link = document.createElement('a');
    link.href = '#';
    const span = document.createElement('span');
    const event = {
      currentTarget: label,
      composedPath: () => [span, link, label, document.body],
    } as unknown as MouseEvent;

    expect(isEventInInteractiveLabelContent(event)).toBe(true);
  });

  it('should return true when composedPath contains a button inside a shadow root before currentTarget', () => {
    const label = document.createElement('label');
    const customLink = document.createElement('p-link-pure');
    const innerAnchor = document.createElement('a');
    innerAnchor.href = '#';
    const event = {
      currentTarget: label,
      composedPath: () => [innerAnchor, customLink, label, document.body],
    } as unknown as MouseEvent;

    expect(isEventInInteractiveLabelContent(event)).toBe(true);
  });

  it('should ignore interactive elements above currentTarget in composedPath', () => {
    const label = document.createElement('label');
    const span = document.createElement('span');
    const outerButton = document.createElement('button');
    const event = {
      currentTarget: label,
      composedPath: () => [span, label, outerButton, document.body],
    } as unknown as MouseEvent;

    expect(isEventInInteractiveLabelContent(event)).toBe(false);
  });
});
