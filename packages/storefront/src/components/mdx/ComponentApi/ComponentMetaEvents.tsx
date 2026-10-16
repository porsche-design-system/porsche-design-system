import type { ComponentMeta, EventMeta } from '@porsche-design-system/component-meta';
import { getFlags } from '@/utils/getFlags';
import { H2 } from '../shared/MdxTypography';
import { MetaTable } from '../shared/MetaTable';
import { formatDescription, formatEventType } from './formatting';

type ComponentMetaEventsProps = {
  eventsMeta: NonNullable<ComponentMeta['eventsMeta']>;
};

export const ComponentMetaEvents = ({ eventsMeta }: ComponentMetaEventsProps) => (
  <>
    <H2>Events</H2>
    <MetaTable<[string, EventMeta]>
      caption="Events"
      className="mt-static-md"
      items={Object.entries(eventsMeta).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))}
      getKey={([eventName]) => eventName}
      columns={[
        {
          label: 'Event',
          className: 'align-top',
          cell: ([eventName, eventMeta]) => (
            <code>
              {eventName} {getFlags(eventMeta)}
            </code>
          ),
        },
        {
          label: 'Description',
          className: 'min-w-40 align-top',
          multiline: true,
          cell: ([, eventMeta]) => <span dangerouslySetInnerHTML={{ __html: formatDescription(eventMeta) }} />,
        },
        {
          label: 'Type',
          className: 'min-w-40 align-top',
          multiline: true,
          cell: ([, eventMeta]) => <span dangerouslySetInnerHTML={{ __html: formatEventType(eventMeta) }} />,
        },
      ]}
    />
  </>
);
