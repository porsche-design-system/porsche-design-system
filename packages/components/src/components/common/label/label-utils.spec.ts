import { descriptionId, LABEL_TAGS, labelId } from './label-utils';

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
