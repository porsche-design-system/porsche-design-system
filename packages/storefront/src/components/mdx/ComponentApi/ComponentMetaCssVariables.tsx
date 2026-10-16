import type { ComponentMeta, CssVariableMeta } from '@porsche-design-system/component-meta';
import { getFlags } from '@/utils/getFlags';
import { H2 } from '../shared/MdxTypography';
import { MetaTable } from '../shared/MetaTable';

type ComponentMetaCssVariablesProps = {
  cssVariablesMeta: NonNullable<ComponentMeta['cssVariablesMeta']>;
};

export const ComponentMetaCssVariables = ({ cssVariablesMeta }: ComponentMetaCssVariablesProps) => (
  <>
    <H2>CSS Variables</H2>
    <MetaTable<[string, CssVariableMeta]>
      caption="CSS Variables"
      className="mt-static-md"
      items={Object.entries(cssVariablesMeta)}
      getKey={([cssVariableName]) => cssVariableName}
      columns={[
        {
          label: 'CSS Variable',
          className: 'align-top',
          cell: ([cssVariableName, cssVariableMeta]) => (
            <code>
              {cssVariableName} {getFlags(cssVariableMeta)}
            </code>
          ),
        },
        {
          label: 'Description',
          className: 'align-top min-w-40',
          multiline: true,
          cell: ([, cssVariableMeta]) => cssVariableMeta.description,
        },
        {
          label: 'defaultValue',
          className: 'align-top',
          cell: ([, cssVariableMeta]) => <code>{cssVariableMeta.defaultValue}</code>,
        },
      ]}
    />
  </>
);
