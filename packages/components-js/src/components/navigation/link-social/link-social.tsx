import { Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  prefix,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses
} from '../../../utils';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { LinkTarget, Theme } from '../../../types';

@Component({
  tag: 'p-link-social',
  styleUrl: 'link-social.scss',
  shadow: true
})
export class LinkSocial {
  @Element() public host!: HTMLElement;

  /** The icon shown. */
  @Prop() public icon?:
  'logo-facebook'
  | 'logo-google'
  | 'logo-instagram'
  | 'logo-linkedin'
  | 'logo-pinterest'
  | 'logo-twitter'
  | 'logo-wechat'
  | 'logo-whatsapp'
  | 'logo-xing'
  | 'logo-youtube'
  | 'logo-baidu'
  | 'logo-delicious'
  | 'logo-digg'
  | 'logo-foursquare'
  | 'logo-gmail'
  | 'logo-hatena'
  | 'logo-kaixin'
  | 'logo-qq-share'
  | 'logo-qq'
  | 'logo-skyrock'
  | 'logo-sohu'
  | 'logo-tecent'
  | 'logo-telegram'
  | 'logo-tumblr'
  | 'logo-viber'
  | 'logo-vk'
  | 'logo-weibo'
  | 'logo-yahoo'
  | 'logo-youku' = undefined;

  /** A custom URL path to a custom social icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Adapts the icon color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** Show or hide label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public componentWillLoad(): void {
    this.addSlottedStyles();
    improveFocusHandlingForCustomElement(this.host);
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
          target: this.target,
          rel: this.rel
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

  private addSlottedStyles(): void {
    const tagName= this.host.tagName.toLowerCase();
    const style = `a:focus ${tagName} {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;
    insertSlottedStyles(this.host, style);
  }
}
