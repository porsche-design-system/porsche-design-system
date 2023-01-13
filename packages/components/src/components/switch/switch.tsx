import { Component, Element, Event, EventEmitter, h, JSX, Listen, Prop } from '@stencil/core';
import type { AlignLabel, BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './switch-styles';
import { getSwitchButtonAriaAttributes } from './switch-utils';

export type SwitchChangeEvent = { checked: boolean };

const propTypes: PropTypes<typeof Switch> = {
  alignLabel: AllowedTypes.breakpoint<AlignLabel>(ALIGN_LABELS),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  stretch: AllowedTypes.breakpoint('boolean'),
  checked: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-switch',
  shadow: { delegatesFocus: true },
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<AlignLabel> = 'right';

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

  /** Adapts the switch color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

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

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.alignLabel,
      this.hideLabel,
      this.stretch,
      this.checked,
      this.disabled,
      this.loading,
      this.isDisabledOrLoading,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <label class="root">
        <span id="label" class="text">
          <slot />
        </span>
        <button
          {...getSwitchButtonAriaAttributes(this.disabled, this.loading, this.checked)}
          type="button"
          role="switch"
          onClick={this.onSwitchClick}
        >
          <span class="toggle">
            {this.loading && (
              <PrefixedTagNames.pSpinner
                class="spinner"
                size="inherit"
                theme={this.theme}
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
