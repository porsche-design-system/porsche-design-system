import { throwIfInvalidLinkUsage } from './link-validation';

it('should throw error when used without href and slottedAnchor', () => {
  expect(() => throwIfInvalidLinkUsage(document.body, undefined)).toThrowErrorMatchingInlineSnapshot(
    `"Usage of body is not valid. Please provide a href property or a slotted anchor."`
  );
});

it('should not throw error if used with slottedAnchor', () => {
  document.body.appendChild(document.createElement('a'));
  expect(() => throwIfInvalidLinkUsage(document.body, undefined)).not.toThrow();
});

it('should not throw error when href is defined', () => {
  expect(() => throwIfInvalidLinkUsage(document.body, '#')).not.toThrow();
});
