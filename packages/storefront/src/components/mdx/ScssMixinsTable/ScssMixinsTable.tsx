import type { ScssMixin } from '@porsche-design-system/scss';
import { Code } from '../Code/Code';
import { InlineMarkdown } from '../shared/InlineMarkdown';
import { MetaTable } from '../shared/MetaTable';

type ScssMixinsTableProps = {
  /** A flat list of scss mixin meta entries to render. */
  mixins: ScssMixin[];
};

export const ScssMixinsTable = ({ mixins }: ScssMixinsTableProps) => (
  <MetaTable
    caption="List of SCSS mixins with their include signatures and descriptions."
    items={mixins}
    getKey={(mixin) => mixin.name}
    columns={[
      {
        label: 'SCSS mixin',
        cell: (mixin) => <Code variant="nowrap">{`@include ${mixin.name}${mixin.signature ?? ''}`}</Code>,
      },
      { label: 'Description', cell: (mixin) => <InlineMarkdown>{mixin.description}</InlineMarkdown>, multiline: true },
    ]}
  />
);
