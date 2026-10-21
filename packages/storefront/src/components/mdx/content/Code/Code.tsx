import type { PropsWithChildren } from 'react';

type CodeProps = PropsWithChildren<{
  variant?: 'nowrap' | 'value';
}>;

const variantClassMap: Record<NonNullable<CodeProps['variant']>, string> = {
  nowrap: 'whitespace-nowrap',
  value: 'select-none cursor-no-drop',
};

export const Code = ({ variant, children }: CodeProps) => (
  <code className={variant ? variantClassMap[variant] : undefined}>{children}</code>
);
