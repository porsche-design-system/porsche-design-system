import type { SlotState, SlotStories, Story, StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import type { SlotMeta } from '@porsche-design-system/component-meta';
import { PPopover, PSelect, PSelectOption, PSwitch } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';
import React from 'react';

type ConfigureSlotsProps<Tag extends HTMLTagOrComponent> = {
  tagName: Tag;
  componentSlots: SlotMeta | undefined;
  configuredSlots: StoryState<Tag>;
  slotStories: SlotStories<Tag>;
  onUpdateSlots: (slotName: string, selectedSlotStory: Story<Tag> | undefined) => void;
};

export const ConfigureSlots = <T extends HTMLTagOrComponent>({
  tagName,
  componentSlots,
  configuredSlots,
  slotStories,
  onUpdateSlots,
}: ConfigureSlotsProps<T>) => {
  return (
    <>
      <span slot="heading" className="flex gap-xs">
        Slots
      </span>
      <div className="flex flex-col gap-sm">
        {Object.entries(slotStories ?? {}).map(([slotName, slotExamples]) => {
          return (
            <div key={slotName} className="flex flex-col gap-sm bg-background-surface p-sm rounded-md">
              <PSwitch
                checked={!!configuredSlots?.slots?.[slotName as keyof SlotState<typeof tagName>]}
                alignLabel="start"
                stretch={true}
                onUpdate={(e) => onUpdateSlots(slotName, e.detail.checked ? Object.values(slotExamples)[0] : undefined)}
                disabled={slotName === 'default'}
              >
                {capitalCase(slotName)}
                <PPopover onClick={(e) => e.preventDefault()}>
                  {/* TODO: Fix typing */}
                  {(componentSlots as any)?.[slotName === 'default' ? '' : slotName]?.description}
                </PPopover>
              </PSwitch>
              <PSelect
                className="[--p-select-background-color:bg-background-shading]"
                name={slotName}
                // @ts-ignore
                value={configuredSlots?.slots?.[slotName]?.name}
                disabled={!configuredSlots?.slots?.[slotName as keyof SlotState<typeof tagName>]}
                hideLabel={true}
                onUpdate={(e) =>
                  onUpdateSlots(
                    slotName,
                    Object.values(slotExamples).find((slot) => slot.name === e.detail.value)
                  )
                }
              >
                <span slot="label" className="inline-flex gap-static-xs">
                  {capitalCase(slotName)}
                  <PPopover onClick={(e) => e.preventDefault()}>
                    {/* TODO: Fix typing */}
                    {(componentSlots as any)?.[slotName === 'default' ? '' : slotName]?.description}
                  </PPopover>
                </span>
                {Object.values(slotExamples ?? {}).map((slot) => (
                  <PSelectOption key={slot.name} value={slot.name}>
                    {slot.name}
                  </PSelectOption>
                ))}
              </PSelect>
            </div>
          );
        })}
      </div>
    </>
  );
};
