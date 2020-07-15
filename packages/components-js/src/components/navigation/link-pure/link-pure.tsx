import { Host, Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  calcLineHeightForElement,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../utils';
import { IconName, LinkTarget, TextSize, TextWeight, ComponentTheme } from '../../../types';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';

@Component({
  tag: 'p-link-pure',
  styleUrl: 'link-pure.scss',
  shadow: true
})
export class LinkPure {
  @Element() public host!: HTMLElement;

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
  @Prop() public theme?: ComponentTheme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  private linkTag: HTMLElement;
  private iconTag: HTMLElement;
  private subline: HTMLElement;

  public componentWillLoad(): void {
    this.setSubline();
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    transitionListener(this.linkTag, 'font-size', () => {
      const size = calcLineHeightForElement(this.linkTag);
      this.iconTag.style.width = `${size}em`;
      this.iconTag.style.height = `${size}em`;
    });
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkPureClasses = cx(
      prefix('link-pure'),
      mapBreakpointPropToPrefixedClasses('link-pure--size', this.size),
      prefix(`link-pure--theme-${this.theme}`),
      this.active && prefix('link-pure--active')
    );

    const iconClasses = cx(prefix('link-pure__icon'));

    const labelClasses = cx(
      prefix('link-pure__label'),
      mapBreakpointPropToPrefixedClasses('link-pure__label-', this.hideLabel, ['hidden', 'visible'])
    );
    const sublineClasses = cx(
      prefix('link-pure__subline'),
      mapBreakpointPropToPrefixedClasses('link-pure__subline-', this.hideLabel, ['hidden', 'visible'])
    );

    return (
      <Host>
        <TagType
          class={linkPureClasses}
          {...(TagType === 'a'
            ? {
              href: this.href,
              target: this.target,
              download: this.download,
              rel: this.rel
            }
            : null)}
          ref={(el) => (this.linkTag = el as HTMLElement)}
        >
          <p-icon
            class={iconClasses}
            color="inherit"
            size="inherit"
            name={this.icon}
            source={this.iconSource}
            ref={(el) => (this.iconTag = el as HTMLElement)}
            aria-hidden="true"
          />
          <p-text class={labelClasses} tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </p-text>
        </TagType>
        {this.subline && (
          <p-text class={sublineClasses} color="inherit" size="inherit" tag="div">
            <slot name="subline" />
          </p-text>
        )}
      </Host>
    );
  }
  private setSubline(): void {
    this.subline = this.host.querySelector('[slot="subline"]');
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `a:focus ${tagName} {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }

    /* only for IE11/Edge */
    ${tagName} a {
      text-decoration: none !important;
    }
    ${tagName} a:focus {
      outline: none !important;
    }

    /* this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-( */
    ${tagName} a::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: block !important;
      outline: transparent none !important;
      transition: outline-color 0.24s ease !important;
    }

    ${tagName} a:focus::before {
      outline-offset: 1px !important;
      outline: #00d5b9 solid 2px !important;
    }
    `;

    insertSlottedStyles(this.host, style);
  }
}
