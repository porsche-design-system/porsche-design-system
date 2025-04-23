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
import React from 'react';

type ComponentMetaCssVariablesProps = {
  cssVariablesMeta: ComponentMeta['cssVariablesMeta'];
};

export const ComponentMetaCssVariables = ({ cssVariablesMeta }: ComponentMetaCssVariablesProps) => {
  return (
    <>
      <PHeading tag="h2" size="x-large" className="mt-lg mb-md max-w-prose" id="css-variables">
        CSS Variables
      </PHeading>
      <PTable caption="Props" className="mt-static-md">
        <PTableHead>
          <PTableRow>
            <PTableHeadCell>CSS Variable</PTableHeadCell>
            <PTableHeadCell>Description</PTableHeadCell>
            <PTableHeadCell>defaultValue</PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          {Object.entries(cssVariablesMeta ?? {}).map(([cssVariableName, cssVariablesMeta]) => (
            <PTableRow key={cssVariableName}>
              <PTableCell className="align-top">
                <code>
                  {cssVariableName} {getFlags(cssVariablesMeta)}
                </code>
              </PTableCell>
              <PTableCell className="align-top min-w-40" multiline={true}>
                {cssVariablesMeta.description}
              </PTableCell>
              <PTableCell className="align-top">
                <code>{cssVariablesMeta.defaultValue}</code>
              </PTableCell>
            </PTableRow>
          ))}
        </PTableBody>
      </PTable>
    </>
  );
};
