import type { SlotStory } from '@/components/playground/componentStory';
import { PCheckboxWrapper } from '@porsche-design-system/components-react/ssr';

// TODO: Improve typing
type ConfigureSlotsProps = {
  componentSlots: {
    [slotName: string]: SlotStory;
  };
};

export const ConfigureSlots = ({ componentSlots }: ConfigureSlotsProps) => {
  const onUpdateSlots = (slotName: string, selected: boolean) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(slotName, selected);
  };

  return (
    <>
      {Object.entries(componentSlots).map(([slotName, slotStory]) => (
        <PCheckboxWrapper key={slotName}>
          <input
            type="checkbox"
            name={slotName}
            checked={slotStory.isShown}
            onChange={(e) => onUpdateSlots(slotName, e.currentTarget.checked)}
          />
        </PCheckboxWrapper>
      ))}
    </>
  );
};
