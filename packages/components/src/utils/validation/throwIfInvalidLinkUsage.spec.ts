import { throwIfInvalidLinkUsage } from './throwIfInvalidLinkUsage';

const errorMessage = `[Error: [Porsche Design System] usage of div is not valid. Please provide either a href property or a slotted <a> element, but not both.]`;

it('should throw error with href value and direct anchor', () => {
  const host = document.createElement('div');
  host.append(document.createElement('a'));
  expect(() => throwIfInvalidLinkUsage(host, '#')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should throw error with empty href value and direct anchor', () => {
  const host = document.createElement('div');
  host.append(document.createElement('a'));
  expect(() => throwIfInvalidLinkUsage(host, '')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should not throw error with href value and label', () => {
  const host = document.createElement('div');
  host.append('Some label');
  expect(() => throwIfInvalidLinkUsage(host, '#')).not.toThrow();
});

it('should not throw error without href value and with direct anchor', () => {
  const host = document.createElement('div');
  host.append(document.createElement('a'));
  expect(() => throwIfInvalidLinkUsage(host, undefined as any)).not.toThrow();
});
