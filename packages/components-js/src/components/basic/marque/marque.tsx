import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/marque';

@Component({
  tag: 'p-marque',
  styleUrl: 'marque.scss',
  shadow: true
})
export class Marque {
  /**
   * Show/hide trademark sign.
   */
  @Prop() public trademark?: boolean = true;

  public render(): JSX.Element {
    const cdnBaseUrl = process.env.NODE_ENV === 'production'
      ? CDN_BASE_URL
      : 'http://localhost:3001/marque';
    const manifestPath: { [size: string]: { [resolution: string]: string } } =
      MARQUES_MANIFEST[`porscheMarque${this.trademark ? 'Trademark' : ''}`];

    const buildSrcSet = (size: 'small' | 'medium'): string =>
      Object.entries(manifestPath[size])
        .map(([resolution, fileName]) => `${cdnBaseUrl}/${fileName} ${resolution}`)
        .join(',');

    const marqueClasses = cx(prefix('marque'));
    return (
      <picture class={marqueClasses}>
        <source srcSet={buildSrcSet('medium')} media="(min-width: 1300px)" />
        <source srcSet={buildSrcSet('small')} />
        <img src={`${cdnBaseUrl}/${manifestPath.medium['2x']}`} alt="Porsche" />
      </picture>
    );
  }
}
