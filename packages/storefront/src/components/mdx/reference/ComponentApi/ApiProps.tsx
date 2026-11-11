import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import { kebabCase } from 'change-case';
import { getFlags } from '@/utils/getFlags';
import { H2 } from '../../elements/Typography';
import { MetaTable } from '../MetaTable';
import { formatDescription, formatPropDefaultValue, formatPropType } from './formatting';

type ApiPropsProps = {
  propsMeta: NonNullable<ComponentMeta['propsMeta']>;
};

const breakpointCustomizableType = `type BreakpointCustomizable<T> = {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
};`;

export const ApiProps = ({ propsMeta }: ApiPropsProps) => {
  const sortedPropsMeta = Object.entries(propsMeta).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  const hasBreakpointCustomizable = Object.values(propsMeta).some((propMeta) => propMeta.isBreakpointCustomizable);

  return (
    <>
      <H2>Properties</H2>
      {hasBreakpointCustomizable && <code>{breakpointCustomizableType}</code>}
      <MetaTable<[string, PropMeta]>
        caption="Properties"
        className="mt-static-md"
        items={sortedPropsMeta}
        getKey={([propName]) => propName}
        columns={[
          {
            label: 'Property',
            className: 'align-top',
            cell: ([propName, propMeta]) => (
              <code>
                {propName} {getFlags(propMeta)}
              </code>
            ),
          },
          { label: 'Attribute', className: 'align-top', cell: ([propName]) => <code>{kebabCase(propName)}</code> },
          {
            label: 'Description',
            className: 'min-w-40 align-top',
            multiline: true,
            cell: ([, propMeta]) => <span dangerouslySetInnerHTML={{ __html: formatDescription(propMeta) }} />,
          },
          {
            label: 'Type',
            className: 'align-top',
            cell: ([, propMeta]) => <span dangerouslySetInnerHTML={{ __html: formatPropType(propMeta) }} />,
          },
          { label: 'Default', className: 'align-top', cell: ([, propMeta]) => formatPropDefaultValue(propMeta) },
        ]}
      />
    </>
  );
};
