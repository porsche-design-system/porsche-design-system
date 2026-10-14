'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import type { DocsHref } from '@/links';

type DocsLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  /**
   * A Storefront route, optionally with an anchor, without a trailing slash: `/components/button/usage#do`. Or an anchor
   * on the current page: `#do`.
   */
  href: DocsHref | `#${string}`;
};

/**
 * `next/link` limited to the Storefront's routes, so a link to a page that doesn't exist fails the typecheck.
 *
 * An anchor on the current page gets the current path: a bare `#do` would resolve against the `<base>` of the root
 * layout, so copying the link or opening it in a new tab would lead to the home page.
 */
export const DocsLink = ({ href, ...props }: DocsLinkProps) => {
  const pathname = usePathname();
  return <Link href={href.startsWith('#') ? `${pathname}${href}` : href} {...props} />;
};
