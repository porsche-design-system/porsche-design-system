import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix, trackEvent } from '../../../utils';
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
    const marqueClasses = cx(prefix('marque'));
    trackEvent('marque', 'render');

    return (
      <picture class={marqueClasses}>
        <source
          media='(min-width: 1300px)'
          srcSet={`
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.medium['1x'] : MARQUES_MANIFEST.porscheMarque.medium['1x']} 1x,
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.medium['2x'] : MARQUES_MANIFEST.porscheMarque.medium['2x']} 2x,
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.medium['3x'] : MARQUES_MANIFEST.porscheMarque.medium['3x']} 3x
          `}
        />
        <source
          srcSet={`
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.small['1x'] : MARQUES_MANIFEST.porscheMarque.small['1x']} 1x,
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.small['2x'] : MARQUES_MANIFEST.porscheMarque.small['2x']} 2x,
            ${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.small['3x'] : MARQUES_MANIFEST.porscheMarque.small['3x']} 3x
          `}
        />
        <img src={`${CDN_BASE_URL}/${this.trademark ? MARQUES_MANIFEST.porscheMarqueTrademark.medium['2x'] : MARQUES_MANIFEST.porscheMarque.medium['2x']}`} alt='Porsche' />
      </picture>
    );
  }
}
