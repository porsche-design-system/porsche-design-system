import type { TargetOnlyProps } from '../props';

/** Content that only makes sense in a browser. Not part of the Markdown output. */
export const StorefrontOnly = ({ children }: TargetOnlyProps) => <>{children}</>;

/** Content for agents, e.g. instructions on how to continue. Not rendered in the Storefront. */
export const MarkdownOnly = (_props: TargetOnlyProps) => null;
