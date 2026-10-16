import type { ComponentProps } from 'react';
import { InlineLink } from './InlineLink';

type InlineMarkdownProps = {
  /** Text with inline Markdown, e.g. the description of a token or a style. */
  children: string;
};

/** Renders the inline Markdown the meta packages write their descriptions in: `**bold**`, `` `code` `` and links. */
export const InlineMarkdown = ({ children }: InlineMarkdownProps) =>
  children.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <InlineLink
          key={i}
          href={link[2] as ComponentProps<typeof InlineLink>['href']}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link[1]}
        </InlineLink>
      );
    }
    return part;
  });
