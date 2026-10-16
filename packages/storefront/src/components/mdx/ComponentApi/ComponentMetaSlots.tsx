import type { ComponentMeta, SlotMeta } from '@porsche-design-system/component-meta';
import { Fragment } from 'react';
import { getFlags } from '@/utils/getFlags';
import { H2 } from '../shared/MdxTypography';
import { MetaTable } from '../shared/MetaTable';

type ComponentMetaSlotsProps = {
  slotsMeta: NonNullable<ComponentMeta['slotsMeta']>;
};

export const ComponentMetaSlots = ({ slotsMeta }: ComponentMetaSlotsProps) => (
  <>
    <H2>Slots</H2>
    <MetaTable<[string, SlotMeta]>
      caption="Slots"
      className="mt-static-md"
      items={Object.entries(slotsMeta)}
      getKey={([slotName]) => slotName}
      columns={[
        {
          label: 'Slot',
          className: 'align-top',
          cell: ([slotName, slotMeta]) => (
            <code>
              {slotName === '' ? '<slot>' : `<slot name="${slotName}">`} {getFlags(slotMeta)}
            </code>
          ),
        },
        {
          label: 'Description',
          className: 'align-top min-w-40',
          multiline: true,
          cell: ([, slotMeta]) => slotMeta.description,
        },
        { label: 'isRequired', className: 'align-top', cell: ([, slotMeta]) => (slotMeta.isRequired ? '✅' : '') },
        {
          label: 'altProp',
          className: 'align-top',
          cell: ([slotName, slotMeta]) => (slotMeta.hasAltProp ? <code>{slotName}</code> : ''),
        },
        {
          label: 'allowedTagNames',
          className: 'align-top',
          cell: ([, slotMeta]) =>
            slotMeta.allowedTagNames?.map((tagName, i) => (
              <Fragment key={tagName}>
                {i > 0 && ' '}
                <code>{tagName}</code>
              </Fragment>
            )),
        },
      ]}
    />
  </>
);
