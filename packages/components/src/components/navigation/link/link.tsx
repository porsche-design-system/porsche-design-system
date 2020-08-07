import { Component, Element, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  insertSlottedStyles,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../utils';
import { IconName, LinkTarget, Theme } from '../../../types';

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
  @Prop() public icon?: IconName = 'arrow-head-right';

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

  public componentDidLoad(): void {
    const tagName = this.element.tagName.toLowerCase();
    const style = `
      a:focus ${tagName} {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }

    /* this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-( */
    ${tagName} a::before {
      content: "" !important;
      position: absolute !important;
      top: -1px !important;
      left: -1px !important;
      right: -1px !important;
      bottom: -1px !important;
      display: block !important;
      transition: outline-color 0.24s ease !important;
    }

    ${tagName} a:focus::before {
      outline-offset: 1px !important;
      outline: #00d5b9 solid 2px !important;
    }
    `;

    insertSlottedStyles(this.element, style);
    improveFocusHandlingForCustomElement(this.element);
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

    const PrefixedTagNames = getPrefixedTagNames(this.element, ['p-icon', 'p-text']);

    return (
      <TagType
        class={linkClasses}
        {...(TagType === 'a' && {
          href: this.href,
          target: `${this.target}`,
          download: this.download,
          rel: this.rel
        })}
      >
        <PrefixedTagNames.pIcon
          class={iconClasses}
          size="inherit"
          name={this.icon}
          source={this.iconSource}
          color="inherit"
          aria-hidden="true"
        />
        <PrefixedTagNames.pText tag="span" color="inherit" class={labelClasses}>
          <slot />
        </PrefixedTagNames.pText>
      </TagType>
    );
  }
}
