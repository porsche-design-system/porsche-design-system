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

type ComponentMetaSlotsProps = {
  slotsMeta: ComponentMeta['slotsMeta'];
};

export const ComponentMetaSlots = ({ slotsMeta }: ComponentMetaSlotsProps) => {
  return (
    <>
      <PHeading tag="h2" size="x-large" className="mt-lg mb-md max-w-prose" id="slots">
        Slots
      </PHeading>
      <PTable caption="Props" className="mt-static-md">
        <PTableHead>
          <PTableRow>
            <PTableHeadCell>Slot</PTableHeadCell>
            <PTableHeadCell>Description</PTableHeadCell>
            <PTableHeadCell>isRequired</PTableHeadCell>
            <PTableHeadCell>altProp</PTableHeadCell>
            <PTableHeadCell>allowedTagNames</PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          {Object.entries(slotsMeta ?? {}).map(([slotName, slotsMeta]) => (
            <PTableRow key={slotName}>
              <PTableCell className="align-top">
                <code>
                  {slotName === '' ? '<slot>' : `<slot name="${slotName}">`} {getFlags(slotsMeta)}
                </code>
              </PTableCell>
              <PTableCell className="align-top min-w-40" multiline={true}>
                {slotsMeta.description}
              </PTableCell>
              <PTableCell className="align-top">{slotsMeta.isRequired ? '✅' : ''}</PTableCell>
              <PTableCell className="align-top">{slotsMeta.hasAltProp ? <code>{slotName}</code> : ''}</PTableCell>
              <PTableCell className="align-top">
                {slotsMeta.allowedTagNames?.map((tagName) => (
                  <code>{tagName}</code>
                ))}
              </PTableCell>
            </PTableRow>
          ))}
        </PTableBody>
      </PTable>
    </>
  );
};
