import { throwIfInvalidLinkUsage } from './link-validation';

let span: HTMLElement;
let anchor: HTMLAnchorElement;

beforeEach(() => {
  span = document.createElement('span');
  anchor = document.createElement('a');
});

it('should throw error when used without href and slottedAnchor', () => {
  expect(() => throwIfInvalidLinkUsage(document.createElement('p-link'), undefined)).toThrowErrorMatchingInlineSnapshot(
    `"Usage of p-link is not valid. Please provide a href property or a slotted anchor."`
  );
});

it('should throw error when used with href on host and anchor', () => {
  span.appendChild(anchor);
  anchor.href = '#';

  expect(() => throwIfInvalidLinkUsage(span, '#')).toThrowErrorMatchingInlineSnapshot(
    `"Usage of span is not valid. Please use with href property OR slotted anchor."`
  );
});

it('should not throw error if used with slottedAnchor', () => {
  span.appendChild(anchor);
  expect(() => throwIfInvalidLinkUsage(span, undefined)).not.toThrow();
});

it('should not throw error when href is defined', () => {
  expect(() => throwIfInvalidLinkUsage(span, '#')).not.toThrow();
});
