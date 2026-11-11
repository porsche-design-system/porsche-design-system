import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { TableOfContents } from '../../structure/TableOfContents/TableOfContents';
import { ApiCssVariables } from './ApiCssVariables';
import { ApiEvents } from './ApiEvents';
import { ApiProps } from './ApiProps';
import { ApiSlots } from './ApiSlots';

type ComponentApiProps = {
  api: ComponentMeta;
  showTableOfContents?: boolean;
};

export const ComponentApi = ({
  api: { propsMeta, eventsMeta, slotsMeta, cssVariablesMeta },
  showTableOfContents = true,
}: ComponentApiProps) => (
  <>
    {showTableOfContents && (
      <TableOfContents
        headings={[
          ...(propsMeta ? ['Properties'] : []),
          ...(eventsMeta ? ['Events'] : []),
          ...(slotsMeta ? ['Slots'] : []),
          ...(cssVariablesMeta ? ['CSS Variables'] : []),
        ]}
      />
    )}
    {propsMeta && <ApiProps propsMeta={propsMeta} />}
    {eventsMeta && <ApiEvents eventsMeta={eventsMeta} />}
    {slotsMeta && <ApiSlots slotsMeta={slotsMeta} />}
    {cssVariablesMeta && <ApiCssVariables cssVariablesMeta={cssVariablesMeta} />}
  </>
);
