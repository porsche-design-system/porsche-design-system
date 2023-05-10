import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, Watch } from '@stencil/core';

import { FLYOUT_ARIA_ATTRIBUTES, FLYOUT_POSITIONS, FlyoutAriaAttribute, FlyoutPosition } from './flyout-utils';
import { getComponentCss } from './flyout-styles';

import { attachComponentCss, getPrefixedTagNames, hasNamedSlot, parseAndGetAriaAttributes, THEMES } from '../../utils';
import { AllowedTypes, PropTypes, validateProps } from '../../utils/validation/validateProps';
import { SelectedAriaAttributes, Theme } from '../../types';
import { clickStartedInScrollbarTrack } from '../modal/modal-utils';

const propTypes: PropTypes<typeof Flyout> = {
  open: AllowedTypes.boolean,
  position: AllowedTypes.oneOf<FlyoutPosition>(FLYOUT_POSITIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<FlyoutAriaAttribute>(FLYOUT_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-flyout',
  shadow: true,
})
export class Flyout {
  @Element() public host!: HTMLElement;

  /** If true, the flyout is open. */
  @Prop() public open: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** The position of the flyout */
  @Prop() public position?: FlyoutPosition = 'right';

  /** Adapts the flyout color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private dialog: HTMLElement;
  private hasHeader: boolean;
  private hasFooter: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    this.updateScrollLock(isOpen);

    if (isOpen) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public componentDidLoad(): void {
    // in case flyout is rendered with open prop
    if (this.open) {
      this.updateScrollLock(true);
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.position,
      this.hasHeader,
      this.hasFooter,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    this.hasHeader = hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');

    return (
      <Host onMouseDown={this.onMouseDown}>
        <PrefixedTagNames.pButtonPure class="dismiss" type="button" hideLabel icon="close" onClick={this.dismissFlyout}>
          Dismiss flyout
        </PrefixedTagNames.pButtonPure>
        <div
          class="root"
          role="dialog"
          {...parseAndGetAriaAttributes({
            'aria-modal': true,
            'aria-hidden': !this.open,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          tabIndex={-1}
          ref={(el) => (this.dialog = el)}
        >
          {this.hasHeader && (
            <div class="header">
              <slot name="header" />
            </div>
          )}
          <div class="content">
            <slot />
          </div>
          {this.hasFooter && <slot name="footer" />}
        </div>
      </Host>
    );
  }

  private onMouseDown = (e: MouseEvent): void => {
    if ((e.composedPath() as HTMLElement[])[0] === this.host && !clickStartedInScrollbarTrack(this.host, e)) {
      this.dismissFlyout();
    }
  };

  private updateScrollLock = (isOpen: boolean) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  private dismissFlyout = (): void => {
    this.dismiss.emit();
  };
}
