'use client';

import { formatDescription, formatPropDefaultValue, formatPropType } from '@/utils/formatting';
import { getFlags } from '@/utils/getFlags';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import {
  PHeading,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import { kebabCase } from 'change-case';
import type React from 'react';

type ComponentMetaPropsProps = {
  propsMeta: ComponentMeta['propsMeta'];
};

export const ComponentMetaProps = ({ propsMeta }: ComponentMetaPropsProps) => {
  const sortedPropsMeta = Object.entries(propsMeta ?? {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  const hasBreakpointCustomizable = Object.values(propsMeta ?? {}).some(
    (propMeta) => propMeta.isBreakpointCustomizable
  );

  const breakpointCustomizableType = `type BreakpointCustomizable<T> = {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
};`;

  return (
    <>
      <PHeading tag="h2" size="x-large" className="mt-lg mb-md max-w-prose" id="properties">
        Properties
      </PHeading>
      {hasBreakpointCustomizable && <code>{breakpointCustomizableType}</code>}
      <PTable caption="Props" className="mt-static-md">
        <PTableHead>
          <PTableRow>
            <PTableHeadCell>Property</PTableHeadCell>
            <PTableHeadCell>Attribute</PTableHeadCell>
            <PTableHeadCell>Description</PTableHeadCell>
            <PTableHeadCell>Type</PTableHeadCell>
            <PTableHeadCell>Default</PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          {sortedPropsMeta.map(([propName, propMeta]) => (
            <PTableRow key={propName}>
              <PTableCell className="align-top">
                <code>
                  {propName} {getFlags(propMeta)}
                </code>
              </PTableCell>
              <PTableCell className="align-top">
                <code>{kebabCase(propName)}</code>
              </PTableCell>
              <PTableCell multiline={true} className="min-w-40 align-top">
                <span // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                  dangerouslySetInnerHTML={{ __html: formatDescription(propMeta) }}
                />
              </PTableCell>
              <PTableCell className="align-top">
                <span // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                  dangerouslySetInnerHTML={{ __html: formatPropType(propMeta) }}
                />
              </PTableCell>
              <PTableCell className="align-top">{formatPropDefaultValue(propMeta)}</PTableCell>
            </PTableRow>
          ))}
        </PTableBody>
      </PTable>
    </>
  );
};
