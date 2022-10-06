import { Component, Element, h, Prop } from '@stencil/core';
import { ThemeExtendedElectric } from '../../utils/theme';
import { LinkTarget } from '../../utils/link-button/link-target';
import { SelectedAriaAttributes } from '../../types';
import { LinkAriaAttributes } from '../link/link-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../utils';
import { getComponentCss } from './tile-link-styles';

@Component({
  tag: 'p-tile-link',
  shadow: { delegatesFocus: true },
})
export class TileLink {
  @Element() public host!: HTMLElement;

  /** Size of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public size?: 'inherit';

  /** Label of the <a />. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of link and description. */
  @Prop() public align?: 'top' | 'bottom' = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the tile-link as compact version with description and link icon only. */
  @Prop() public compact?: boolean = false;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public componentWillRender(): void {
    // TODO add validate Props
    attachComponentCss(
      this.host,
      getComponentCss
      // this.size,
      // this.label,
      // this.description,
      // this.align,
      // this.gradient,
      // this.compact,
      // this.href,
      // this.target,
      // this.download,
      // this.rel,
      // this.aria,
      // this.theme,
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <span>
        <slot />
        <p>{this.description}</p>
        <PrefixedTagNames.pLink href={this.href} variant="tertiary">
          {this.label}
        </PrefixedTagNames.pLink>
      </span>
    );
  }
}
