import { Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { LinkTarget, Theme } from '../../../types';

@Component({
  tag: 'p-link',
  styleUrl: 'link.scss',
  shadow: true
})
export class Link {
  @Element() public element!: HTMLElement;

  /** The style variant of the link. */
  @Prop() public variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-right-hair';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);

    /**
     * only apply workaround if not safari force touch
     * browser (force touch wouldn't work and they do
     * support shadow dom anyway)
     */
    if (!(MouseEvent as any).WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN) {
      /**
       * IE11/Edge (not chromium based) workaround to
       * fix the event target of click events (which normally
       * shadow dom takes care of)
       */
      this.element.addEventListener('click', (event: MouseEvent): void => {
        if (event.target !== this.element) {
          event.stopPropagation();

          if (window.navigator.userAgent.indexOf('Trident/') < 0) {
            /**
             * for ie11 (which is trident engine) we can not
             * prevent the default, because clicks from js
             * are not going to follow links
             */
            event.preventDefault();
          }

          this.element.click();
        }
      }, true);
    }
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = cx(
      prefix('link'),
      prefix(`link--${this.variant}`),
      mapBreakpointPropToPrefixedClasses('link-', this.hideLabel, ['without-label', 'with-label']),
      prefix(`link--theme-${this.theme}`)
    );
    const iconClasses = prefix('link__icon');
    const labelClasses = prefix('link__label');

    return (
      <TagType
        class={linkClasses}
        {...(TagType === 'a' ? { href: this.href, target: `${this.target}`, download: this.download, rel: this.rel } : null)}
      >
        <p-icon
          class={iconClasses}
          size='inherit'
          name={this.icon}
          source={this.iconSource}
        />
        <p-text tag='span' color='inherit' class={labelClasses}>
          <slot/>
        </p-text>
      </TagType>
    );
  }
}
