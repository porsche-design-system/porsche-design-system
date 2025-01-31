import type { HTMLTagOrComponent, PropTypeMapping } from '@/components/playground/Configurator';
import type { SlotStories, Story, StoryState } from '@/components/playground/componentStory';
import type { SlotMeta } from '@porsche-design-system/component-meta';
import { PPopover, PSelect, PSelectOption, PTag } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';
import React from 'react';

type ConfigureSlotsProps<Tag extends HTMLTagOrComponent> = {
  tagName: Tag;
  componentSlots: SlotMeta | undefined;
  configuredSlots: StoryState<Tag>;
  slotStories: SlotStories;
  onUpdateSlots: (slotName: string, selectedSlotStory: Story | undefined) => void;
};

export const ConfigureSlots = <T extends HTMLTagOrComponent>({
  tagName,
  componentSlots,
  configuredSlots,
  slotStories,
  onUpdateSlots,
}: ConfigureSlotsProps<T>) => {
  const amountOfConfiguredSlots = 0;

  return (
    <>
      <span slot="heading" className="flex gap-xs">
        Slots
        {amountOfConfiguredSlots > 0 && (
          <>
            <PTag compact={true}>{amountOfConfiguredSlots}</PTag>
            <PTag compact={true}>
              <button type="button" onClick={() => {}}>
                Reset all
              </button>
            </PTag>
          </>
        )}
      </span>
      <div className="flex flex-col gap-sm">
        {Object.entries(slotStories ?? {}).map(([slotName, slotExamples]) => {
          return (
            <PSelect
              key={slotName}
              name={slotName}
              // @ts-ignore
              value={configuredSlots?.slots?.[slotName].name}
              onUpdate={(e) =>
                onUpdateSlots(
                  slotName,
                  Object.values(slotExamples).find((slot) => slot.name === e.detail.value)
                )
              }
            >
              <span slot="label" className="inline-flex gap-xs">
                {capitalCase(slotName)}
                <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
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
          );
        })}
      </div>
    </>
  );
};
