import { throwIfInvalidLinkPureUsage } from './throwIfInvalidLinkPureUsage';

const errorMessage = '"Usage of span is not valid. Please provide a href property or a slotted anchor."';

it('should throw error when used without href and anchor', () => {
  const spanElement = document.createElement('span');
  expect(() => throwIfInvalidLinkPureUsage(spanElement, undefined)).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should throw error when used with href and anchor', () => {
  const spanElement = document.createElement('span');
  const anchorElement = document.createElement('a');
  anchorElement.href = '#';

  spanElement.appendChild(anchorElement);

  expect(() => throwIfInvalidLinkPureUsage(spanElement, '#')).toThrowErrorMatchingInlineSnapshot(errorMessage);
});

it('should not throw error if used without href and with anchor', () => {
  const spanElement = document.createElement('span');
  const anchorElement = document.createElement('a');

  spanElement.appendChild(anchorElement);
  expect(() => throwIfInvalidLinkPureUsage(spanElement, undefined)).not.toThrow();
});

it('should not throw error when href is defined without anchor', () => {
  const spanElement = document.createElement('span');

  expect(() => throwIfInvalidLinkPureUsage(spanElement, '#')).not.toThrow();
});
