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

  it('should return false and an empty string if no component deprecation message is present', () => {
    const fileContent = `/**
 * @slot {"name": "", "description": "Default slot for main content." }
 */
@Component({
  tag: 'p-content-wrapper',
  shadow: true,
})
export class ContentWrapper {
  @Element() public host!: HTMLElement;

  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: ContentWrapperWidth = 'extended';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public backgroundColor?: ContentWrapperBackgroundColor = 'transparent';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public theme?: Theme = 'light';`;

    const result = isDeprecatedComponent(fileContent);

    expect(result).toEqual([false, '']);
  });
});
