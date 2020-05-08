import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { cdn, marque } from '@porsche-design-system/marque';

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

    return (
      <picture class={marqueClasses}>
        <source
          media='(min-width: 1300px)'
          srcSet={`
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.medium['1x'] : marque.porscheMarque.medium['1x']} 1x,
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.medium['2x'] : marque.porscheMarque.medium['2x']} 2x,
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.medium['3x'] : marque.porscheMarque.medium['3x']} 3x
          `}
        />
        <source
          srcSet={`
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.small['1x'] : marque.porscheMarque.small['1x']} 1x,
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.small['2x'] : marque.porscheMarque.small['2x']} 2x,
            ${cdn}/${this.trademark ? marque.porscheMarqueTrademark.small['3x'] : marque.porscheMarque.small['3x']} 3x
          `}
        />
        <img src={`${cdn}/${this.trademark ? marque.porscheMarqueTrademark.medium['2x'] : marque.porscheMarque.medium['2x']}`} alt='Porsche' />
      </picture>
    );
  }
}
