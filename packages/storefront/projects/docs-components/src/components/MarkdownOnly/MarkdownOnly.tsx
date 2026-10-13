import type { ReactNode } from 'react';

export type MarkdownOnlyProps = {
  children?: ReactNode;
};

/**
 * Content for agents, e.g. how to continue after a setup guide. Not rendered in the Storefront; part of every
 * Markdown output, the skill as well as the Storefront's `.md` pages.
 */
export const MarkdownOnly = (_props: MarkdownOnlyProps) => null;
