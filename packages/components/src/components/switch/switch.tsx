import { Component, Element, Event, type EventEmitter, h, type JSX, Listen, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  hasPropValueChanged,
  isDisabledOrLoading,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './switch-styles';
import { getSwitchButtonAriaAttributes } from './switch-utils';
import type { SwitchAlignLabel, SwitchUpdateEvent } from './switch-utils';

const propTypes: PropTypes<typeof Switch> = {
  alignLabel: AllowedTypes.breakpoint<SwitchAlignLabel>(ALIGN_LABELS),
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
  @Prop() public alignLabel?: BreakpointCustomizable<SwitchAlignLabel> = 'end';

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

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when checked status is changed. */
  @Event({ bubbles: false }) public switchChange: EventEmitter<SwitchUpdateEvent>;

  /** Emitted when checked status is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<SwitchUpdateEvent>;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    improveButtonHandlingForCustomElement(
      this.host,
      () => 'button',
      () => isDisabledOrLoading(this.disabled, this.loading)
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
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button
        {...getSwitchButtonAriaAttributes(this.disabled, this.loading, this.checked)}
        class="root"
        type="button"
        role="switch"
        onClick={this.onSwitchClick}
      >
        <span class="switch">
          {/* it's necessary to always render toggle and a conditionally nested spinner, for smooth transitions */}
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
        </span>
        <span class="label">
          <slot />
        </span>
      </button>
    );
  }

  private onSwitchClick = (): void => {
    this.update.emit({ checked: !this.checked });
    this.switchChange.emit({ checked: !this.checked });
  };
}
