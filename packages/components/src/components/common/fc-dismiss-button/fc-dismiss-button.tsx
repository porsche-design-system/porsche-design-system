import { type FunctionalComponent, h } from '@stencil/core';

type FCDismissButtonProps = {
  /** Accessible (visually hidden) label of the dismiss button. */
  label: string;
  /** Click handler invoked when the dismiss button is activated. */
  onClick: () => void;
  /** Optional value forwarded as `aria-description` to provide additional context (e.g. the notification heading). */
  ariaDescription?: string;
  /** Optional ref callback to obtain the rendered `button` element (e.g. banner needs it to move focus). */
  refCallback?: (el: HTMLButtonElement) => void;
};

/**
 * Shared dismiss/close button used across dialog-based (flyout/modal/sheet) and notification-based
 * (banner/inline-notification/toast) components. Renders a native `<button class="dismiss">` with the close icon
 * inlined as a CSS mask (see `fc-dismiss-button-styles.ts`) — so it needs neither a nested `p-button` nor a `p-icon`
 * (avoiding the async CDN icon fetch). Each consumer supplies the variant/positioning styling via the `.dismiss` class.
 * The visible label text is visually hidden but exposed to assistive technology as the accessible name.
 */
export const FCDismissButton: FunctionalComponent<FCDismissButtonProps> = ({
  label,
  onClick,
  ariaDescription,
  refCallback,
}) => {
  return (
    <button
      class="dismiss"
      type="button"
      onClick={onClick}
      ref={refCallback}
      {...(ariaDescription ? { 'aria-description': ariaDescription } : {})}
    >
      <span>{label}</span>
    </button>
  );
};
