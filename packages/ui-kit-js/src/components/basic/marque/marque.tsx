import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils/prefix';

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
    const marqueClasses = cx(
      prefix('marque')
    );

    const path = 'https://cdn.ui.porsche.com/porsche-ui-kit/marque/v2/';

    const sourceTrademark = this.trademark === true ? '_trademark' : '';


    return (
      <picture class={marqueClasses}>
        <source
          media='(min-width: 1000px)'
          srcSet={`
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_large@1x.png 1x,
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_large@2x.png 2x,
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_large@3x.png 3x
          `}
        />
        <source
          srcSet={`
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_small@1x.png 1x,
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_small@2x.png 2x,
            ${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_small@3x.png 3x
          `}
        />
        <img src={`${path}porsche-marque-rgb-digital_S-L_R${sourceTrademark}_large@2x.png`} alt='Porsche' />
      </picture>
    );
  }
}
