import { type FunctionalComponent, h, type JSX } from '@stencil/core';

type NotificationBaseProps = {
  heading?: string;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  hasHeadingSlot?: boolean;
  description?: string;
  hasDescriptionSlot?: boolean;
  innerHTML?: boolean; // only relevant for toast which should be refactored
  actionLabel?: JSX.Element;
  dismissButton?: JSX.Element;
};

export const NotificationBase: FunctionalComponent<NotificationBaseProps> = ({
  heading,
  headingTag,
  hasHeadingSlot,
  description,
  hasDescriptionSlot,
  innerHTML,
  actionLabel,
  dismissButton,
  ...rest
}) => {
  const Heading = headingTag;

  return (
    <div class="notification" {...rest}>
      {heading ? <Heading>{heading}</Heading> : hasHeadingSlot && <slot name="heading" />}
      {description ? (
        innerHTML ? (
          <p innerHTML={description} />
        ) : (
          <p>{description}</p>
        )
      ) : hasDescriptionSlot ? (
        <slot name="description" />
      ) : (
        <slot />
      )}
      {actionLabel}
      {dismissButton}
    </div>
  );
};
