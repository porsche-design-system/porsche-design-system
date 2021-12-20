import { validateLinkUsage } from './link-validation';

it('should throw error when used without href and slottedAnchor', () => {
  expect(() => validateLinkUsage(document.body, undefined)).toThrowErrorMatchingInlineSnapshot(
    `"Usage of ${document.body.tagName} is not valid. Please provide a href property. For further information see https://designsystem.porsche.com/v2/"`
  );
});

it('should not throw error if used with slottedAnchor', () => {
  document.body.appendChild(document.createElement('a'));
  expect(() => validateLinkUsage(document.body, undefined)).not.toThrow();
});

it('should not throw error when href is defined', () => {
  expect(() => validateLinkUsage(document.body, '#')).not.toThrow();
});
