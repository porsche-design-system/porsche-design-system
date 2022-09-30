import { JSX, Component, Prop, h, Element, Event, EventEmitter, Listen } from '@stencil/core';
import type { AlignLabel, BreakpointCustomizable, PropTypes, ThemeExtendedElectric } from '../../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  THEMES_EXTENDED_ELECTRIC,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './switch-styles';
import { getButtonAriaAttributes } from './switch-utils';

export type SwitchChangeEvent = { checked: boolean };

const propTypes: PropTypes<typeof Switch> = {
  alignLabel: AllowedTypes.breakpoint<AlignLabel>(ALIGN_LABELS),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  stretch: AllowedTypes.breakpoint('boolean'),
  checked: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  tabbable: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
};

@Component({
  tag: 'p-switch',
  shadow: { delegatesFocus: true },
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: AlignLabel = 'right';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Stretches the contents to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Visualize the switch with on/off status. */
  @Prop() public checked?: boolean = false;

  /** Disables the switch. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the switch and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** To remove the element from tab order.
   * @deprecated since v2.8.0, use `tabindex="-1"` instead
   */
  @Prop() public tabbable?: boolean = true;

  /** Adapts the switch color depending on the theme. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Emitted when checked status is changed. */
  @Event({ bubbles: false }) public switchChange: EventEmitter<SwitchChangeEvent>;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => 'button',
      () => this.isDisabledOrLoading
    );
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.alignLabel,
      this.hideLabel,
      this.stretch,
      this.checked,
      this.loading,
      this.isDisabledOrLoading,
      this.theme
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <label class="root">
        <span id="label" class="text">
          <slot />
        </span>
        <button
          {...getButtonAriaAttributes(this.disabled, this.loading, this.checked)}
          type="button"
          role="switch"
          tabindex={this.tabbable ? this.host.getAttribute('tabindex') : -1}
          onClick={this.onSwitchClick}
        >
          <span class="toggle">
            {this.loading && (
              <PrefixedTagNames.pSpinner
                class="spinner"
                size="inherit"
                theme={this.checked ? 'light' : 'dark'}
                aria={{ 'aria-label': 'Loading state' }}
              />
            )}
          </span>
        </button>
      </label>
    );
  }

  private onSwitchClick = (): void => {
    this.switchChange.emit({ checked: !this.checked });
  };
}
