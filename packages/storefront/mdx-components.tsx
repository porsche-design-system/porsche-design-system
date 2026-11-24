import type { MDXComponents } from 'mdx/types';
import { Notification } from '@/components/mdx/content/Notification';
import { mdxComponents } from '@/components/mdx/elements/mdxComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // The example descriptions in packages/examples cannot import Storefront modules, so their notifications come from
  // here.
  return { ...mdxComponents, Notification, ...components };
}
