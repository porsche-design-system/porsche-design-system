import type { ComponentMeta, EventMeta } from '@porsche-design-system/component-meta';
import { getFlags } from '@/utils/getFlags';
import { H2 } from '../../elements/Typography';
import { MetaTable } from '../MetaTable';
import { formatDescription, formatEventType } from './formatting';

type ApiEventsProps = {
  eventsMeta: NonNullable<ComponentMeta['eventsMeta']>;
};

export const ApiEvents = ({ eventsMeta }: ApiEventsProps) => (
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
