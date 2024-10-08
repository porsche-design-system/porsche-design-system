import { isDeprecatedComponent } from './isDeprecatedComponent';

describe('isDeprecatedComponent', () => {
  it('should return true and the correct deprecation message for a single-line comment', () => {
    const fileContent = `/**
     * @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead.
     */
    @Component({
      tag: 'p-content-wrapper',
      shadow: true,
    })`;

    const result = isDeprecatedComponent(fileContent);

    expect(result).toEqual([
      true,
      'since v3.0.0, will be removed with next major release. Use native CSS Grid instead.',
    ]);
  });

  it('should return true and the correct deprecation message for a multi-line comment', () => {
    const fileContent = `/**
     * @slot {"name": "", "description": "Default slot for main content." }
     * @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead.
     * Additional comment.
     */
    @Component({
      tag: 'p-content-wrapper',
      shadow: true,
    })`;

    const result = isDeprecatedComponent(fileContent);

    expect(result).toEqual([
      true,
      'since v3.0.0, will be removed with next major release. Use native CSS Grid instead.',
    ]);
  });

  it('should return false and an empty string if no deprecation message is present', () => {
    const fileContent = `/**
     * This is a normal component without deprecation.
     */
    @Component({
      tag: 'p-content-wrapper',
      shadow: true,
    })`;

    const result = isDeprecatedComponent(fileContent);

    expect(result).toEqual([false, '']);
  });
});
