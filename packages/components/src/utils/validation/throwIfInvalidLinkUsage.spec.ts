import { throwIfInvalidLinkUsage } from './throwIfInvalidLinkUsage';

const errorMessage =
  '"Usage of div is not valid. Please provide a href property or a single and direct \'a\' child element."';

describe('with href value', () => {
  const href = '#';

  it('should throw error with any child', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'));
    expect(() => throwIfInvalidLinkUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should not throw error without any children', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });
});

describe('without href value', () => {
  const href = undefined;

  it('should throw error without any child', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should throw error with multiple children', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'), document.createElement('a'));
    expect(() => throwIfInvalidLinkUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should throw error with nested anchor', () => {
    const host = document.createElement('div');
    const child = document.createElement('p');
    child.append(document.createElement('a'));
    host.append(child);

    // TODO: workaround until jsdom actually returns null for this case
    // https://github.com/jsdom/jsdom/issues/2998
    jest.spyOn(host, 'querySelector').mockReturnValue(null);

    expect(() => throwIfInvalidLinkUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should not throw error with direct and only anchor', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'));
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });
});
