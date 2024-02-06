import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Listen, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  isDisabledOrLoading,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './switch-styles';
import type { SwitchAlignLabel, SwitchAlignLabelDeprecated, SwitchUpdateEventDetail } from './switch-utils';
import { getSwitchButtonAriaAttributes } from './switch-utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { use } from 'typescript-mix';
import { LoadingBaseComponent } from '../../abstract-components';

// a bit messy now but should be solvable maybe via private/public check or so
const propTypes: Omit<PropTypes<typeof Switch>, 'this' | 'initialLoading'> = {
  alignLabel: AllowedTypes.breakpoint<SwitchAlignLabel>(ALIGN_LABELS),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  stretch: AllowedTypes.breakpoint('boolean'),
  checked: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

// trick typing with interface inheritance and declaration merging
export interface Switch extends Partial<LoadingBaseComponent> {}

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
  @Event({ bubbles: false }) public switchChange: EventEmitter<SwitchUpdateEventDetail>;

  /** Emitted when checked status is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<SwitchUpdateEventDetail>;

  // this is where the magic happens
  @use(LoadingBaseComponent) this: LoadingBaseComponent;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const alignLabelDeprecationMap: Record<
      SwitchAlignLabelDeprecated,
      Exclude<SwitchAlignLabel, SwitchAlignLabelDeprecated>
    > = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Switch, SwitchAlignLabelDeprecated, SwitchAlignLabel>(
      this,
      'alignLabel',
      alignLabelDeprecationMap
    );

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
      <Host>
        <button
          {...getSwitchButtonAriaAttributes(this.disabled, this.loading, this.checked)}
          id="switch"
          type="button"
          role="switch"
          aria-labelledby="label" // only relevant for axe-core because of https://github.com/dequelabs/axe-core/issues/1393
          aria-describedby={this.loading ? loadingId : undefined}
          onClick={this.onSwitchClick}
        >
          {/* it's necessary to always render toggle and a conditionally nested spinner, for smooth transitions */}
          <span class="toggle">
            {this.loading && (
              <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
            )}
          </span>
        </button>
        <label id="label" htmlFor="switch">
          <slot />
        </label>
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </Host>
    );
  }

  private onSwitchClick = (): void => {
    this.update.emit({ checked: !this.checked });
    this.switchChange.emit({ checked: !this.checked });
  };
}
