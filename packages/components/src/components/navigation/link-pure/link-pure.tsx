import { Host, Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  calcLineHeightForElement,
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  isDark,
  mapBreakpointPropToClasses,
  transitionListener,
  hasVisibleIcon,
  hasSlottedSubline,
} from '../../../utils';
import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  LinkTarget,
  TextSize,
  TextWeight,
  Theme,
} from '../../../types';
import { isSizeInherit } from '../../basic/typography/text/text-utils';
import { addComponentCss, addSlottedCss } from './link-pure-styles';

@Component({
  tag: 'p-link-pure',
  styleUrl: 'link-pure.scss',
  shadow: true,
})
export class LinkPure {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: AlignLabel = 'right';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. By choosing 'none', no icon is displayed */
  @Prop() public icon?: LinkButtonPureIconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Display link in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  private linkTag: HTMLElement;
  private iconTag: HTMLElement;

  public connectedCallback(): void {
    addSlottedCss(this.host);
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.stretch);
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    if (isSizeInherit(this.size)) {
      transitionListener(this.linkTag, 'font-size', () => {
        const size = `${calcLineHeightForElement(this.linkTag)}em`;
        this.iconTag.style.width = size;
        this.iconTag.style.height = size;
      });
    }
  }

  public render(): JSX.Element {
    const hasIcon = hasVisibleIcon(this.icon);
    const hasSubline = hasSlottedSubline(this.host);
    const TagType = this.href === undefined ? 'span' : 'a';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--active']: this.active,
      ['root--with-icon']: hasIcon,
      ...mapBreakpointPropToClasses('root--size', this.size),
      ...(!hasSubline && {
        ...mapBreakpointPropToClasses('root-', this.stretch, ['stretch-on', 'stretch-off']),
        ...mapBreakpointPropToClasses('root--label-align', this.alignLabel),
      }),
      ...(hasIcon && mapBreakpointPropToClasses('root-', this.hideLabel, ['without-label', 'with-label'])),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <TagType
          class={rootClasses}
          {...(TagType === 'a' && {
            href: this.href,
            target: this.target,
            download: this.download,
            rel: this.rel,
          })}
          ref={(el) => (this.linkTag = el)}
        >
          {hasIcon && (
            <PrefixedTagNames.pIcon
              class="icon"
              color="inherit"
              size="inherit"
              name={this.icon}
              source={this.iconSource}
              ref={(el) => (this.iconTag = el)}
              aria-hidden="true"
            />
          )}
          <PrefixedTagNames.pText class="label" tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </PrefixedTagNames.pText>
        </TagType>
        {hasSubline && (
          <PrefixedTagNames.pText class="subline" color="inherit" size="inherit" tag="div">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }
}
