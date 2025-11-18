import { PSelect, PSelectOption, PTag, type SelectChangeEventDetail } from '@porsche-design-system/components-react';
import { useState } from 'react';

type Option = { value: string; label: string; description: string; tags: string[]; imgSrc: string };

const optionsData: Option[] = [
  {
    value: '718',
    label: '718',
    description: 'Präziser Sportwagen mit Mittelmotor',
    tags: ['Benzin'],
    imgSrc: 'http://localhost:3002/718.png',
  },
  {
    value: '911',
    label: '911',
    description: 'Ikonischer Sportwagen mit Heckmotor',
    tags: ['Benzin'],
    imgSrc: 'http://localhost:3002/911.png',
  },
  {
    value: 'taycan',
    label: 'Taycan',
    description: 'Elektrischer Sportwagen',
    tags: ['Elektro'],
    imgSrc: 'http://localhost:3002/taycan.png',
  },
  {
    value: 'macan',
    label: 'Macan',
    tags: ['Elektro'],
    description: 'Sportlicher Kompakt-SUV',
    imgSrc: 'http://localhost:3002/macan.png',
  },
  {
    value: 'cayenne',
    label: 'Cayenne',
    tags: ['Hybrid', 'Benzin'],
    description: 'Vielseitiger SUV',
    imgSrc: 'http://localhost:3002/cayenne.png',
  },
  {
    value: 'panamera',
    label: 'Panamera',
    tags: ['Hybrid', 'Benzin'],
    description: 'Luxuslimousine mit hohem Komfort',
    imgSrc: 'http://localhost:3002/panamera.png',
  },
];

export const SelectExampleSelectedSlot = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options] = useState<Option[]>(optionsData);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(undefined);

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const value = (e.target as HTMLElement & { value: string }).value;
    setValue(value);
    setSelectedOption(options.find((option) => option.value === value));
  };

  return (
    <PSelect name="selected-slot-select" label="Selected Slot" value={value} onChange={onChange}>
      <span slot="selected" className="h-full flex items-center gap-fluid-sm grow">
        <img src={selectedOption?.imgSrc} alt="" className="h-full w-auto" />
        <p className="prose-text-md truncate m-0">{selectedOption?.label}</p>
        {selectedOption?.tags.map((tag) => (
          <PTag key={tag} color="notification-info-soft" compact={true}>
            {tag}
          </PTag>
        ))}
      </span>
      {options.map((option) => (
        <PSelectOption key={option.value} value={option.value}>
          <div className="flex items-center gap-fluid-sm">
            <img src={option.imgSrc} alt="" className="h-[34px] w-auto" />
            <div className="flex flex-col">
              <div className="flex items-center gap-fluid-sm">
                <p className="prose-text-md m-0">{option.label}</p>
                {selectedOption?.tags.map((tag) => (
                  <PTag key={tag} color="notification-info-soft" compact={true}>
                    {tag}
                  </PTag>
                ))}
              </div>
              <p className="prose-text-2xs m-0">{option.description}</p>
            </div>
          </div>
        </PSelectOption>
      ))}
    </PSelect>
  );
};
