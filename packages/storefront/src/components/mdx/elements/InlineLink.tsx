import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { ComponentProps } from 'react';
import { DocsLink } from '@/components/common/DocsLink';

/** A link within prose, underlined and without an icon. Markdown links in MDX render through it as well. */
export const InlineLink = (props: ComponentProps<typeof DocsLink>) => (
  <PLinkPure icon="none" underline={true}>
    <DocsLink {...props} />
  </PLinkPure>
);
