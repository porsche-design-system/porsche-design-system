import { Component, Element, Event, type EventEmitter, type JSX, Prop, h } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
  attachComponentCss,
  getPrefixedTagNames,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  onCancelDialog,
  onClickDialog,
  parseAndGetAriaAttributes,
  setDialogVisibility,
  setScrollLock,
  validateProps,
  warnIfAriaAndHeadingPropsAreUndefined,
} from '../../utils';
import { onTransitionEnd } from '../../utils/dialog/dialog';
import { getComponentCss } from './action-sheet-styles';
import {
  ACTION_SHEET_ARIA_ATTRIBUTES,
  type ActionSheetAriaAttribute,
  type ActionSheetMotionHiddenEndEventDetail,
  type ActionSheetMotionVisibleEndEventDetail,
} from './action-sheet-utils';

const propTypes: PropTypes<typeof ActionSheet> = {
  open: AllowedTypes.boolean,
  dismissButton: AllowedTypes.boolean,
  disableBackdropClick: AllowedTypes.boolean,
  aria: AllowedTypes.aria<ActionSheetAriaAttribute>(ACTION_SHEET_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-action-sheet',
  shadow: true,
})
export class ActionSheet {
  @Element() public host!: HTMLElement;

  /** If true, the action-sheet is open. */
  @Prop() public open: boolean = false;

  /** If false, the action-sheet will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /** If true, the action-sheet will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ActionSheetAriaAttribute>;

  /** Adapts the action-sheet color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action-sheet is opened and the transition is finished. */
  @Event({ bubbles: false }) public motionVisibleEnd?: EventEmitter<ActionSheetMotionVisibleEndEventDetail>;

  /** Emitted when the action-sheet is closed and the transition is finished. */
  @Event({ bubbles: false }) public motionHiddenEnd?: EventEmitter<ActionSheetMotionHiddenEndEventDetail>;

  private dialog: HTMLDialogElement;
  private scroller: HTMLDivElement;
  private hasHeader: boolean;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillRender(): void {
    setScrollLock(this.open);
  }

  public componentDidRender(): void {
    setDialogVisibility(this.open, this.dialog, this.scroller);
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeader = hasNamedSlot(this.host, 'header');

    if (this.open) {
      warnIfAriaAndHeadingPropsAreUndefined(this.host, this.hasHeader, this.aria);
    }

    attachComponentCss(this.host, getComponentCss, this.open, this.dismissButton, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        inert={!this.open} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(el) => (this.dialog = el)}
        onCancel={(e) => onCancelDialog(e, this.dismissDialog, !this.dismissButton)}
        // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on action-sheet and mouseup on backdrop) but changed back to native behavior
        onClick={(e) => onClickDialog(e, this.dismissDialog, this.disableBackdropClick)}
        onTransitionEnd={(e) => onTransitionEnd(e, this.open, this.motionVisibleEnd, this.motionHiddenEnd)}
        {...parseAndGetAriaAttributes({
          'aria-modal': true,
          ...(this.hasHeader && {
            'aria-label': hasNamedSlot(this.host, 'header') && getSlotTextContent(this.host, 'header'),
          }),
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        <div class="scroller" ref={(el) => (this.scroller = el)}>
          <div class="action-sheet">
            {this.dismissButton && (
              <PrefixedTagNames.pButton
                variant="ghost"
                class="dismiss"
                type="button"
                hideLabel={true}
                icon="close"
                onClick={this.dismissDialog}
                theme={this.theme}
              >
                Dismiss action-sheet
              </PrefixedTagNames.pButton>
            )}
            {this.hasHeader && <slot name="header" />}
            <slot />
          </div>
        </div>
      </dialog>
    );
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };
}
