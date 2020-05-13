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

  private manifestPath = MARQUES_MANIFEST[`porscheMarque${this.trademark ? 'Trademark' : ''}`];

  public render(): JSX.Element {
    const marqueClasses = cx(prefix('marque'));

    return (
      <picture class={marqueClasses}>
        <source srcSet={this.buildSrcSet('medium')} media='(min-width: 1300px)' />
        <source srcSet={this.buildSrcSet('small')} />
        <img src={`${CDN_BASE_URL}/${this.manifestPath.medium['2x']}`} alt='Porsche' />
      </picture>
    );
  }

  private buildSrcSet = (size: 'small' | 'medium'): string =>
    Object.entries(this.manifestPath[size]).map(([key, value]) => `${CDN_BASE_URL}/${value} ${key}`).join(',');
}
