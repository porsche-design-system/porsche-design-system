import { formatDescription, formatEventType } from '@/utils/formatting';
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

type ComponentMetaEventsProps = {
  eventsMeta: ComponentMeta['eventsMeta'];
};

export const ComponentMetaEvents = ({ eventsMeta }: ComponentMetaEventsProps) => {
  const sortedEventsMeta = Object.entries(eventsMeta ?? {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  return (
    <>
      <PHeading tag="h2" size="x-large" className="mt-lg mb-md max-w-prose" id="events">
        Events
      </PHeading>
      <PTable caption="Props" className="mt-static-md">
        <PTableHead>
          <PTableRow>
            <PTableHeadCell>Event</PTableHeadCell>
            <PTableHeadCell>Description</PTableHeadCell>
            <PTableHeadCell>Type</PTableHeadCell>
          </PTableRow>
        </PTableHead>
        <PTableBody>
          {sortedEventsMeta.map(([eventName, eventMeta]) => (
            <PTableRow key={eventName}>
              <PTableCell className="align-top">
                <code>
                  {eventName} {getFlags(eventMeta)}
                </code>
              </PTableCell>
              <PTableCell className="min-w-40 align-top" multiline={true}>
                <span
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                  dangerouslySetInnerHTML={{ __html: formatDescription(eventMeta) }}
                />
              </PTableCell>
              <PTableCell className="min-w-40 align-top" multiline={true}>
                <span
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: // TODO: Refactor to use TSX instead of string
                  dangerouslySetInnerHTML={{ __html: formatEventType(eventMeta) }}
                />
              </PTableCell>
            </PTableRow>
          ))}
        </PTableBody>
      </PTable>
    </>
  );
};
