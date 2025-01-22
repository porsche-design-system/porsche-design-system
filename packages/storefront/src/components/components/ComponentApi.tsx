import { TableOfContents } from '@/components/common/TableOfContents';
import { ComponentMetaCssVariables } from '@/components/components/ComponentMetaCssVariables';
import { ComponentMetaEvents } from '@/components/components/ComponentMetaEvents';
import { ComponentMetaSlots } from '@/components/components/ComponentMetaSlots';
import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import React from 'react';
import { ComponentMetaProps } from './ComponentMetaProps';

type ComponentApiProps = {
  tagName: TagName;
  showTableOfContents?: boolean;
};

export const ComponentApi = ({ tagName, showTableOfContents = true }: ComponentApiProps) => {
  const { propsMeta, eventsMeta, slotsMeta, cssVariablesMeta } = componentMeta[tagName];
  return (
    <>
      {showTableOfContents && (
        <TableOfContents
          headings={[
            ...(propsMeta ? ['Props'] : []),
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
};
