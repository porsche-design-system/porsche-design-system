import type { ColorSchemeClassMeta } from '@porsche-design-system/stylesheets/meta';
import { Code } from '../Code/Code';
import { InlineMarkdown } from '../shared/InlineMarkdown';
import { MetaTable } from '../shared/MetaTable';

type ColorSchemeClassesTableProps = {
  classes: ColorSchemeClassMeta[];
};

export const ColorSchemeClassesTable = ({ classes }: ColorSchemeClassesTableProps) => (
  <MetaTable
    caption="List of color-scheme utility classes with their usage and descriptions."
    items={classes}
    getKey={(schemeClass) => schemeClass.selector}
    columns={[
      { label: 'CSS class', cell: (schemeClass) => <Code variant="nowrap">{schemeClass.selector}</Code> },
      { label: 'Usage', cell: (schemeClass) => <Code variant="value">{schemeClass.usage}</Code>, multiline: true },
      {
        label: 'Description',
        cell: (schemeClass) => <InlineMarkdown>{schemeClass.description}</InlineMarkdown>,
        multiline: true,
      },
    ]}
  />
);
