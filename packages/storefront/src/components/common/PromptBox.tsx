import { CopyToClipboardButton } from '@/components/common/CopyToClipboardButton';

type PromptBoxProps = {
  /** Prompt text to display and copy. */
  children: string;
  className?: string;
};

/** Ready-to-use agent prompt, rendered as wrapped monospace text with a copy button. */
export const PromptBox = ({ children, className = '' }: PromptBoxProps) => (
  <div className={`relative my-fluid-md ${className}`} dir="ltr">
    <pre className="m-0">
      <code
        className="p-fluid-sm max-h-96 overflow-auto rounded-3xl whitespace-pre-wrap break-words focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
        tabIndex={0}
      >
        {children}
      </code>
    </pre>
    <CopyToClipboardButton
      className="absolute bottom-static-sm end-static-sm"
      value={children}
      label="Copy prompt to clipboard"
      copiedLabel="Prompt copied to clipboard"
    />
  </div>
);
