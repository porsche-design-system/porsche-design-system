import { PTag } from '@porsche-design-system/components-react/ssr';
import React from 'react';

export const ConfigureCssVariables = () => {
  // const onUpdateSlots = (slotName: string, selected: boolean) => {
  //   // biome-ignore lint/suspicious/noConsole: <explanation>
  //   console.log(slotName, selected);
  // };

  const amountOfConfiguredSlots = 0;

  return (
    <>
      <span slot="heading" className="flex gap-xs">
        CSS Variables
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
