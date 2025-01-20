import { formatDescription, formatEventType } from '@/utils/formatting';
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

type ComponentMetaEventsProps = {
  tagName: TagName;
};

export const ComponentMetaEvents = ({ tagName }: ComponentMetaEventsProps) => {
  const meta = componentMeta[tagName];
  const eventsMeta = Object.entries(meta.eventsMeta ?? {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  return (
    <PTable caption="Props" className="mt-static-md">
      <PTableHead>
        <PTableRow>
          <PTableHeadCell>Event</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Type</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {eventsMeta.map(([eventName, eventMeta]) => (
          <PTableRow key={eventName}>
            <PTableCell className="align-top">
              <code>
                {eventName} {getFlags(eventMeta)}
              </code>
            </PTableCell>
            <PTableCell multiline={true} className="min-w-40 align-top">
              <span
                // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                dangerouslySetInnerHTML={{ __html: formatDescription(eventMeta) }}
              />
            </PTableCell>
            <PTableCell multiline={true} className="min-w-40 align-top">
              <span
                // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                dangerouslySetInnerHTML={{ __html: formatEventType(eventMeta) }}
              />
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
