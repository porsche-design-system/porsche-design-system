import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { TableOfContents } from '../TableOfContents/TableOfContents';
import { ComponentMetaCssVariables } from './ComponentMetaCssVariables';
import { ComponentMetaEvents } from './ComponentMetaEvents';
import { ComponentMetaProps } from './ComponentMetaProps';
import { ComponentMetaSlots } from './ComponentMetaSlots';

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
    {propsMeta && <ComponentMetaProps propsMeta={propsMeta} />}
    {eventsMeta && <ComponentMetaEvents eventsMeta={eventsMeta} />}
    {slotsMeta && <ComponentMetaSlots slotsMeta={slotsMeta} />}
    {cssVariablesMeta && <ComponentMetaCssVariables cssVariablesMeta={cssVariablesMeta} />}
  </>
);
