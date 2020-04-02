import { Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  prefix,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses
} from '../../../utils';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { Theme } from '../../../types';

@Component({
  tag: 'p-link-social',
  styleUrl: 'link-social.scss',
  shadow: true
})
export class LinkSocial {
  @Element() public element!: HTMLElement;

  /** The social icon shown. */
  @Prop() public icon?: 'logo-facebook' | 'logo-google' | 'logo-linkedin' | 'logo-pinterest' | 'logo-instagram' | 'logo-twitter' | 'logo-wechat' | 'logo-youtube' = 'logo-default';

  /** A custom URL path to a custom social icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing a social share url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Adapts the icon color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Show or hide label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public componentDidLoad() {
    const tagName= this.element.tagName.toLowerCase();
    const style = `a:focus ${tagName} {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.element, style);
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = cx(
      prefix('link-social'),
      mapBreakpointPropToPrefixedClasses('link-social-', this.hideLabel, ['without-label', 'with-label']),
      prefix(`link-social--${this.icon}`),
      prefix(`link-social--theme-${this.theme}`)
    );
    const iconClasses = prefix('link-social__icon');
    const labelClasses = prefix('link-social__label');

    return (
      <TagType
        class={linkClasses}
        {...(TagType === 'a' ? {
          href: this.href,
          target: '_blank',
          rel: 'nofollow noopener'
        } : null)}
      >
        <p-icon
          class={iconClasses}
          size='inherit'
          name={this.icon}
          source={this.iconSource}
          color='inherit'
          aria-hidden='true'
        />
        <p-text tag='span' color='inherit' class={labelClasses}>
          <slot/>
        </p-text>
      </TagType>
    );
  }
}
