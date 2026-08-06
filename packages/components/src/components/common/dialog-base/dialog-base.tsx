import { type FunctionalComponent, h, type JSX } from '@stencil/core';
import type { AriaAttributes } from '../../../types';
import { FCDismissButton } from '../fc-dismiss-button/fc-dismiss-button';

type DialogBaseProps = {
  inert: boolean;
  dialogRef?: (el: HTMLDialogElement) => void;
  scrollerRef?: (el: HTMLDivElement) => void;
  containerClass: 'flyout' | 'modal' | 'sheet';
  onCancel?: (e: Event) => void;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onTransitionEnd?: (e: TransitionEvent) => void;
  onDismiss?: () => void;
  ariaAttributes?: AriaAttributes;
  dismissable?: boolean;
  header?: JSX.Element;
  footer?: JSX.Element;
  subFooter?: JSX.Element;
};

export const DialogBase: FunctionalComponent<DialogBaseProps> = (
  {
    inert,
    dialogRef,
    scrollerRef,
    containerClass,
    ariaAttributes,
    onCancel,
    onClick,
    onMouseDown,
    onTransitionEnd,
    onDismiss,
    dismissable = false,
    header,
    footer,
    subFooter,
  },
  children
) => {
  return (
    <dialog
      inert={inert} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
      tabIndex={-1} // keeps dialog from being a tab stop; interactive content inside (or programmatic focus) handles focus management
      ref={dialogRef}
      onCancel={onCancel}
      // Track where a pointer press begins so a gesture that starts inside the panel (e.g. a text selection) and is
      // released on the backdrop does not dismiss the dialog. Dismissal itself stays on the native `click`.
      onMouseDown={onMouseDown}
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
      {...(ariaAttributes ?? {})}
    >
      <div class="scroller" ref={scrollerRef}>
        <div class={containerClass}>
          {dismissable && <FCDismissButton label={`Dismiss ${containerClass}`} onClick={onDismiss} />}
          {header}
          {children}
          {footer}
          {subFooter}
        </div>
      </div>
    </dialog>
  );
};
