'use client';

import { PButton } from '@porsche-design-system/components-react/ssr';
import { useEffect, useRef, useState } from 'react';

const COPIED_STATE_DURATION = 2000;

type CopyToClipboardButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

/** Icon-only copy action that confirms a successful copy with a checkmark and a screen reader announcement. */
export const CopyToClipboardButton = ({
  value,
  label = 'Copy to clipboard',
  copiedLabel = 'Copied to clipboard',
  className,
}: CopyToClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.warn('Copying to clipboard failed', error);
      return;
    }

    setIsCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_STATE_DURATION);
  };

  return (
    <>
      {/* The label stays stable so the accessible name doesn't change under focus; the live region confirms the copy. */}
      <PButton
        className={className}
        type="button"
        variant="secondary"
        compact={true}
        icon={isCopied ? 'check' : 'copy'}
        hideLabel={true}
        onClick={onCopy}
      >
        {label}
      </PButton>
      <span className="sr-only" aria-live="polite">
        {isCopied ? copiedLabel : ''}
      </span>
    </>
  );
};
