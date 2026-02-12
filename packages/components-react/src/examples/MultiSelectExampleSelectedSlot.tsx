import {
  type MultiSelectChangeEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  PTag,
} from '@porsche-design-system/components-react';
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

export const MultiSelectExampleSelectedSlot = () => {
  const [value, setValue] = useState<string[]>([]);
  const [options] = useState<Option[]>(optionsData);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
    const value = (e.target as HTMLElement & { value: string[] }).value;
    setValue(value);
    setSelectedOptions(options.filter((option) => value.includes(option.value)));
  };

  return (
    <PMultiSelect name="selected-slot-select" label="Selected Slot" value={value} onChange={onChange}>
      <span slot="selected" className="h-full flex items-center">
        <span className="truncate">{selectedOptions.map((option) => option.label).join(', ')}</span>
      </span>
      {options.map((option) => (
        <PMultiSelectOption key={option.value} value={option.value}>
          <div className="w-full flex gap-fluid-sm">
            <img src={option.imgSrc} alt="" className="h-[34px] w-auto self-center" />
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="prose-text-sm m-0">{option.label}</p>
              <p className="prose-text-2xs m-0">{option.description}</p>
            </div>
            <div className="self-center flex gap-fluid-sm">
              {option.tags.map((tag) => (
                <PTag key={tag} variant="info" compact={true}>
                  {tag}
                </PTag>
              ))}
            </div>
          </div>
        </PMultiSelectOption>
      ))}
    </PMultiSelect>
  );
};
