import type { DOMAttributes, HTMLAttributes } from 'react';

// handpicked props that all wrapper components have in common
export type BaseProps = Omit<DOMAttributes<{}>, 'onChange' | 'onInput' | 'onToggle'> &
  Pick<
    HTMLAttributes<{}>,
    // React-specific Attributes
    | 'suppressHydrationWarning'
    // Standard HTML Attributes
    | 'autoFocus'
    | 'className'
    | 'dir'
    | 'hidden'
    | 'id'
    | 'inert'
    | 'lang'
    | 'slot'
    | 'style'
    | 'tabIndex'
    | 'title'
    | 'translate'
    // WAI-ARIA
    | 'role'
  >;
