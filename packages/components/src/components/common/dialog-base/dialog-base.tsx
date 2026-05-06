import { type FunctionalComponent, h, type JSX } from '@stencil/core';
import type { AriaAttributes } from '../../../types';

type DialogBaseProps = {
  inert?: boolean;
  dialogRef?: (el: HTMLDialogElement) => void;
  scrollerRef?: (el: HTMLDivElement) => void;
  innerClass?: string;
  ariaAttributes?: AriaAttributes;
  onCancel?: (e: Event) => void;
  onClick?: (e: MouseEvent) => void;
  onTransitionEnd?: (e: TransitionEvent) => void;
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
    innerClass,
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
      tabIndex={-1} // dialog always has a dismiss button to be focused
      ref={dialogRef}
      onCancel={onCancel}
      // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on modal and mouseup on backdrop) but changed back to native behavior
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
      {...ariaAttributes}
    >
      <div class="scroller" ref={scrollerRef}>
        <div class={innerClass}>
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
