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
import React from 'react';

type ComponentMetaCssVariablesProps = {
  tagName: TagName;
};

export const ComponentMetaCssVariables = ({ tagName }: ComponentMetaCssVariablesProps) => {
  const meta = componentMeta[tagName];
  const cssVariablesMeta = Object.entries(meta.cssVariablesMeta ?? {});
  return (
    <PTable caption="Props" className="mt-static-md">
      <PTableHead>
        <PTableRow>
          <PTableHeadCell>CSS Variable</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>defaultValue</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {cssVariablesMeta.map(([cssVariableName, cssVariablesMeta]) => (
          <PTableRow>
            <PTableCell className="align-top">
              <code>
                {cssVariableName} {getFlags(cssVariablesMeta)}
              </code>
            </PTableCell>
            <PTableCell className="align-top">{cssVariablesMeta.description}</PTableCell>
            <PTableCell className="align-top">
              <code>{cssVariablesMeta.defaultValue}</code>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
