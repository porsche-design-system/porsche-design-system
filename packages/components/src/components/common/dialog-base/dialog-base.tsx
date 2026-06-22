import { type FunctionalComponent, h, type JSX } from '@stencil/core';
import type { AriaAttributes } from '../../../types';
import { getPrefixedTagNames } from '../../../utils';

type DialogBaseProps = {
  host: HTMLElement;
  inert?: boolean;
  dialogRef?: (el: HTMLDialogElement) => void;
  scrollerRef?: (el: HTMLDivElement) => void;
  containerClass: 'flyout' | 'modal' | 'sheet';
  onCancel?: (e: Event) => void;
  onClick?: (e: MouseEvent) => void;
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
    host,
    inert,
    dialogRef,
    scrollerRef,
    containerClass,
    ariaAttributes,
    onCancel,
    onClick,
    onTransitionEnd,
    onDismiss,
    dismissable = false,
    header,
    footer,
    subFooter,
  },
  children
) => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <dialog
      inert={inert} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
      tabIndex={-1} // keeps dialog from being a tab stop; interactive content inside (or programmatic focus) handles focus management
      ref={dialogRef}
      onCancel={onCancel}
      // Previously done with onMouseDown to change the click behavior (not closing when pressing mousedown on modal and mouseup on backdrop) but changed back to native behavior
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
      {...(ariaAttributes ?? {})}
    >
      <div class="scroller" ref={scrollerRef}>
        <div class={containerClass}>
          {dismissable && (
            <PrefixedTagNames.pButton
              class="dismiss"
              compact={true}
              type="button"
              hideLabel={true}
              icon="close"
              onClick={onDismiss}
            >
              {`Dismiss ${containerClass}`}
            </PrefixedTagNames.pButton>
          )}
          {header}
          {children}
          {footer}
          {subFooter}
        </div>
      </div>
    </dialog>
  );
};
