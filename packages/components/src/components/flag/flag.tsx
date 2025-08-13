import { FLAGS_MANIFEST } from '@porsche-design-system/assets';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { FlagName, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  TEXT_SIZES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './flag-styles';
import { buildFlagUrl, FLAG_ARIA_ATTRIBUTES, type FlagAriaAttribute, type FlagSize } from './flag-utils';

const propTypes: PropTypes<typeof Flag> = {
  name: AllowedTypes.oneOf<FlagName>(Object.keys(FLAGS_MANIFEST) as FlagName[]),
  size: AllowedTypes.oneOf<FlagSize>(TEXT_SIZES),
  aria: AllowedTypes.aria<FlagAriaAttribute>(FLAG_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-flag',
  shadow: true,
})
export class Flag {
  @Element() public host!: HTMLElement;

  /** Specifies the country flag to display. Use the two-letter ISO 3166-1 alpha-2 country code. */
  @Prop() public name?: FlagName = 'de';

  /** The size of the flag. Pre-defined sizes are aligned with the Porsche Next typescale. */
  @Prop() public size?: FlagSize = 'small';

  /** A map of ARIA attributes to enhance the flag's accessibility. For example, use `{ 'aria-label': 'German flag' }` to provide a descriptive label for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<FlagAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size);

    return (
      <img
        src={buildFlagUrl(this.name)}
        width={24} // improve bootstrapping behaviour
        height={24} // improve bootstrapping behaviour
        loading="lazy"
        alt={parseAndGetAriaAttributes(this.aria)?.['aria-label'] ?? ''}
      />
    );
  }
}
