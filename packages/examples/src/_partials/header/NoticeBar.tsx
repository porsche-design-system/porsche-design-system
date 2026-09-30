import type { ComponentChildren } from 'preact';

/** The note the `stacked` header shows unless a page passes its own – shop chrome, to demonstrate the extra row. */
export const noticeText = 'All sizes shown for Porsche Lifestyle products are EU sizes';

type NoticeBarProps = {
  children?: ComponentChildren;
};

/** Full width note above the header bar – shop chrome such as a shipping or sizing hint. */
export const NoticeBar = ({ children = noticeText }: NoticeBarProps) => (
  <div class="scheme-dark col-full flex justify-center py-static-xs px-static-md bg-surface">
    <p-text size="xs">{children}</p-text>
  </div>
);
