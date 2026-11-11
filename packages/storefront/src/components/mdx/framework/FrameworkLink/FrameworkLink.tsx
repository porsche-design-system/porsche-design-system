import type { ReactNode } from 'react';
import type { DocsHref } from '@/links';
import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';
import { InlineLink } from '../../elements/InlineLink';
import { FrameworkContent } from '../FrameworkContent';

type FrameworkLinkProps = {
  /** Builds the route for a framework, e.g. ``({ framework }) => `/developing/${framework}/getting-started` ``. */
  href: (context: FrameworkRenderContext) => DocsHref;
  children: ReactNode;
};

/** Link whose route follows the selected framework. */
export const FrameworkLink = ({ href, children }: FrameworkLinkProps) => (
  <FrameworkContent
    content={resolveFrameworkValues((context) => <InlineLink href={href(context)}>{children}</InlineLink>)}
  />
);
