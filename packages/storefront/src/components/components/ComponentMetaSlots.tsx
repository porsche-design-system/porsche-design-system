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

type ComponentMetaSlotsProps = {
  tagName: TagName;
};

export const ComponentMetaSlots = ({ tagName }: ComponentMetaSlotsProps) => {
  const meta = componentMeta[tagName];
  const slotsMeta = Object.entries(meta.slotsMeta ?? {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  return (
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
        {slotsMeta.map(([slotName, slotsMeta]) => (
          <PTableRow>
            <PTableCell className="align-top">
              <code>
                {slotName} {getFlags(slotsMeta)}
              </code>
            </PTableCell>
            <PTableCell className="align-top">{slotsMeta.description}</PTableCell>
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
  );
};
