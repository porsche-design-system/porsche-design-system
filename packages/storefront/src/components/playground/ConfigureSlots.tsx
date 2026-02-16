import type { SlotMeta } from '@porsche-design-system/component-meta';
import { PPopover, PSelect, PSelectOption, PSwitch } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';
import React from 'react';
import type { SlotState, SlotStories, Story, StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

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
      <span slot="heading" className="flex gap-fluid-xs">
        Slots
      </span>
      <div className="flex flex-col gap-fluid-sm">
        {Object.entries(slotStories ?? {}).map(([slotName, slotExamples]) => {
          return (
            <div key={slotName} className="flex flex-col gap-fluid-sm">
              <div className="w-full flex justify-between">
                <div className="w-full flex gap-static-xs">
                  {capitalCase(slotName)}
                  <PPopover>
                    {/* TODO: Fix typing */}
                    {(componentSlots as any)?.[slotName === 'default' ? '' : slotName]?.description}
                  </PPopover>
                </div>
                <PSwitch
                  hideLabel={true}
                  className="flex-1"
                  checked={!!configuredSlots?.slots?.[slotName as keyof SlotState<typeof tagName>]}
                  alignLabel="start"
                  stretch={true}
                  compact={true}
                  onUpdate={(e) =>
                    onUpdateSlots(slotName, e.detail.checked ? Object.values(slotExamples)[0] : undefined)
                  }
                  disabled={slotName === 'default'}
                >
                  {`Toggle slot: ${slotName}`}
                </PSwitch>
              </div>
              {Object.keys(slotExamples).length > 1 && (
                <PSelect
                  className="[--p-select-background-color:bg-scrim]"
                  name={slotName}
                  value={configuredSlots?.slots?.[slotName]?.name}
                  disabled={!configuredSlots?.slots?.[slotName as keyof SlotState<typeof tagName>]}
                  hideLabel={true}
                  label="Select slot to be configured"
                  compact={true}
                  onChange={(e) =>
                    onUpdateSlots(
                      slotName,
                      Object.values(slotExamples).find((slot) => slot.name === e.detail.value)
                    )
                  }
                >
                  {Object.values(slotExamples ?? {}).map((slot) => (
                    <PSelectOption key={slot.name} value={slot.name}>
                      {slot.name}
                    </PSelectOption>
                  ))}
                </PSelect>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
