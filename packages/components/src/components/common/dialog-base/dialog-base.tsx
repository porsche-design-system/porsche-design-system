import { type FunctionalComponent, h, type JSX } from '@stencil/core';
import type { AriaAttributes } from '../../../types';

type DialogBaseProps = {
  inert?: boolean;
  dialogRef?: (el: HTMLDialogElement) => void;
  scrollerRef?: (el: HTMLDivElement) => void;
  containerClass: string;
  onCancel?: (e: Event) => void;
  onClick?: (e: MouseEvent) => void;
  onTransitionEnd?: (e: TransitionEvent) => void;
  ariaAttributes?: AriaAttributes;
  dismissButton?: JSX.Element;
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
    onTransitionEnd,
    dismissButton,
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
      // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on modal and mouseup on backdrop) but changed back to native behavior
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
      {...ariaAttributes}
    >
      <div class="scroller" ref={scrollerRef}>
        <div class={containerClass}>
          {dismissButton}
          {header}
          {children}
          {footer}
          {subFooter}
        </div>
      </div>
    </dialog>
  );
};
