'use client';

import { formatDescription, formatPropDefaultValue, formatPropType } from '@/utils/formatting';
import { getFlags } from '@/utils/getFlags';
import { componentMeta } from '@porsche-design-system/component-meta';
import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import { kebabCase } from 'change-case';
import React from 'react';

type ComponentMetaPropsProps = {
  tagName: TagName;
};

export const ComponentMetaProps = ({ tagName }: ComponentMetaPropsProps) => {
  const meta = componentMeta[tagName];
  const propsMeta = Object.entries(meta.propsMeta ?? {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  return (
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
        {propsMeta.map(([propName, propMeta]) => (
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
  );
};
