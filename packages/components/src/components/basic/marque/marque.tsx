import { JSX, Component, Prop, h, Element, Fragment } from '@stencil/core';
import { MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/assets';
import { improveFocusHandlingForCustomElement } from '../../../utils';
import { LinkTarget } from '../../../types';
import { breakpoint } from '@porsche-design-system/utilities';

@Component({
  tag: 'p-marque',
  styleUrl: 'marque.scss',
  shadow: true,
})
export class Marque {
  @Element() public host!: HTMLElement;

  /** Show/hide trademark sign. */
  @Prop() public trademark?: boolean = true;

  /** Adapts sizing of marque. */
  @Prop() public size?: 'responsive' | 'small' | 'medium' = 'responsive';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  public connectedCallback(): void {
    improveFocusHandlingForCustomElement(this.host);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const cdnBaseUrl =
      ROLLUP_REPLACE_IS_STAGING === 'production' ? MARQUES_CDN_BASE_URL : 'http://localhost:3001/marque';
    const manifestPath: { [size: string]: { [resolution: string]: string } } =
      MARQUES_MANIFEST[`porscheMarque${this.trademark ? 'Trademark' : ''}`];

    const buildSrcSet = (size: 'small' | 'medium'): string =>
      Object.entries(manifestPath[size])
        .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName} ${resolution}`)
        .join(',');

    return (
      <picture>
        {this.size === 'responsive' ? (
          <Fragment>
            <source srcSet={buildSrcSet('medium')} media={`(min-width: ${breakpoint.l}px)`} />
            <source srcSet={buildSrcSet('small')} />
          </Fragment>
        ) : (
          <source srcSet={buildSrcSet(this.size)} />
        )}
        <TagType
          {...(TagType === 'a' && {
            href: this.href,
            target: this.target,
          })}
        >
          <img src={`${cdnBaseUrl}/${manifestPath.medium['2x']}`} alt="Porsche" />
        </TagType>
      </picture>
    );
  }
}
