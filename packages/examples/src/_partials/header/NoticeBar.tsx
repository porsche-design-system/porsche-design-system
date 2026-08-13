import type { ComponentChildren } from 'preact';

type NoticeBarProps = {
  children: ComponentChildren;
};

/** Full width note above the header bar – shop chrome such as a shipping or sizing hint. */
export const NoticeBar = ({ children }: NoticeBarProps) => (
  <div class="scheme-dark col-full flex justify-center py-static-xs px-static-md bg-surface">
    <p-text size="xs">{children}</p-text>
  </div>
);
