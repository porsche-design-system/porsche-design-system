import { throwIfInvalidLinkUsage } from './throwIfInvalidLinkUsage';

const errorMessage = `[Error: [Porsche Design System] usage of div is not valid. Please provide either a href property or a slotted <a> element, but not both.]`;

describe('with href value', () => {
  const href = '#';

  it('should throw error with direct anchor', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'));
    expect(() => throwIfInvalidLinkUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should not throw error without any children', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });

  it('should not throw error with text content only', () => {
    const host = document.createElement('div');
    host.append('Some label');
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });

  it('should not throw error with a child that is not an anchor', () => {
    const host = document.createElement('div');
    host.append(document.createElement('span'));
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });
});

describe('without href value', () => {
  const href: any = undefined;

  it('should not throw error without any children, since href can still be set later', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });

  it('should not throw error with text content only, since href can still be set later', () => {
    const host = document.createElement('div');
    host.append('Some label');
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });

  it('should not throw error with a child that is not an anchor', () => {
    const host = document.createElement('div');
    host.append(document.createElement('span'));
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });

  it('should not throw error with direct anchor', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'));
    expect(() => throwIfInvalidLinkUsage(host, href)).not.toThrow();
  });
});
