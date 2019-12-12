import { Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { LinkTarget, TextSize, TextWeight, Theme } from '../../../types';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-link-pure',
  styleUrl: 'link-pure.scss',
  shadow: true
})
export class LinkPure {
  @Element() public element!: HTMLElement;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Display link in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkPureClasses = cx(
      prefix('link-pure'),
      mapBreakpointPropToPrefixedClasses('link-pure-', this.hideLabel, ['without-label', 'with-label']),
      mapBreakpointPropToPrefixedClasses('link-pure--size', this.size),
      prefix(`link-pure--theme-${this.theme}`),
      this.active && prefix(`link-pure--active`)
    );

    const iconClasses = cx(
      prefix('link-pure__icon')
    );

    const labelClasses = cx(
      prefix('link-pure__label')
    );

    return (
      <TagType
        class={linkPureClasses}
        {...(TagType === 'a' ? {
          href: this.href,
          target: this.target,
          download: this.download,
          rel: this.rel
        } : null)}
      >
        <p-icon
          class={iconClasses}
          color='inherit'
          size='inherit'
          name={this.icon}
          source={this.iconSource}
        />
        <p-text
          class={labelClasses}
          tag='span'
          color='inherit'
          size='inherit'
          weight={this.weight}
        >
          <slot/>
        </p-text>
      </TagType>
    );
  }
}
