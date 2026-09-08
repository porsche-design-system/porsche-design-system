import type { ReactNode } from 'react';
import { FrameworkLinkAnchor } from '@/components/common/FrameworkLinkAnchor';
import { type FrameworkRenderContext, resolveFrameworkValues } from '@/models/framework';

type FrameworkLinkProps = {
  /** Builds the route for a framework, e.g. ``({ framework }) => `/developing/${framework}/getting-started` ``. */
  href: (context: FrameworkRenderContext) => string;
  children: ReactNode;
};

/**
 * Link whose route follows the selected framework. Server component on purpose: the route is built for
 * every framework here, so only plain strings are handed to the client, which cannot receive functions.
 */
export const FrameworkLink = ({ href, children }: FrameworkLinkProps) => (
  <FrameworkLinkAnchor hrefs={resolveFrameworkValues(href)}>{children}</FrameworkLinkAnchor>
);
