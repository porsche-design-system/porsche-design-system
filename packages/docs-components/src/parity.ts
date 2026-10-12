import type * as MarkdownEntry from './markdown/components';
import type * as ReactEntry from './react';

/**
 * Fails the typecheck when a component is registered for only one target, or when its two implementations accept
 * different props. Type only; nothing imports it at runtime.
 */

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

type PropsOf<Entry> = {
  -readonly [Name in keyof Entry]: Entry[Name] extends (props: infer Props) => unknown ? Props : never;
};

export const registryParity: Equal<PropsOf<typeof ReactEntry>, PropsOf<typeof MarkdownEntry>> = true;
