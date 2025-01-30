import type { PropTypeMapping } from '@/components/playground/Configurator';
import type { StoryState } from '@/components/playground/componentStory';
import { PPopover, PSelect, PSelectOption, PTag } from '@porsche-design-system/components-react/ssr';
import { capitalCase } from 'change-case';
import React from 'react';

type ConfigureSlotsProps<T extends keyof PropTypeMapping> = {
  tagName: T;
  storyState: StoryState<T>;
  onUpdateSlots: (slotName: string, selectedExample: string | undefined) => void;
};

export const ConfigureSlots = <T extends keyof PropTypeMapping>({
  tagName,
  storyState,
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
        {Object.entries(storyState.slotVariants ?? {}).map(([slotName, slotExamples]) => {
          return (
            <PSelect
              key={slotName}
              name={slotName}
              value={storyState?.slots?.[slotName] as string | undefined}
              onUpdate={(e) => onUpdateSlots(slotName, e.detail.value)}
            >
              <span slot="label" className="inline-flex gap-xs">
                {capitalCase(slotName)}
                <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
                  description
                </PPopover>
              </span>
              {Object.entries(slotExamples ?? {}).map(([exampleName, slotConfig]) => (
                <PSelectOption key={slotName + exampleName} value={exampleName}>
                  {exampleName}
                </PSelectOption>
              ))}
            </PSelect>
          );
        })}
        {/*{Object.entries(componentSlots).map(([slotName, slotStory]) => (*/}
        {/*  <PCheckboxWrapper key={slotName}>*/}
        {/*    <input*/}
        {/*      type="checkbox"*/}
        {/*      name={slotName}*/}
        {/*      checked={slotStory.isShown}*/}
        {/*      onChange={(e) => onUpdateSlots(slotName, e.currentTarget.checked)}*/}
        {/*    />*/}
        {/*  </PCheckboxWrapper>*/}
        {/*))}*/}
      </div>
    </>
  );
};
