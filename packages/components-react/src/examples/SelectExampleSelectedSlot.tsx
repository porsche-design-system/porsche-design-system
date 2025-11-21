import {
  PFlag,
  PFlagProps,
  POptgroup,
  PSelect,
  PSelectOption,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

type Option = { label: string; code: PFlagProps['name']; continent: string };

const optionsData: Option[] = [
  {
    label: 'China',
    code: 'cn',
    continent: 'Asia',
  },
  {
    label: 'Japan',
    code: 'jp',
    continent: 'Asia',
  },
  {
    label: 'South Korea',
    code: 'kr',
    continent: 'Asia',
  },
  {
    label: 'Austria',
    code: 'at',
    continent: 'Europe',
  },
  {
    label: 'France',
    code: 'fr',
    continent: 'Europe',
  },
  {
    label: 'Germany',
    code: 'de',
    continent: 'Europe',
  },
  {
    label: 'Great Britain',
    code: 'gb',
    continent: 'Europe',
  },
  {
    label: 'Italy',
    code: 'it',
    continent: 'Europe',
  },
  {
    label: 'Portugal',
    code: 'pt',
    continent: 'Europe',
  },
  {
    label: 'Spain',
    code: 'es',
    continent: 'Europe',
  },

  {
    label: 'Canada',
    code: 'ca',
    continent: 'North America',
  },
  {
    label: 'USA',
    code: 'us',
    continent: 'North America',
  },
];

export const SelectExampleSelectedSlot = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [options] = useState<Option[]>(optionsData);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(undefined);

  const optgroups: Record<string, Option[]> = options.reduce(
    (acc, item) => {
      const key = item.continent;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, Option[]>
  );

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const value = (e.target as HTMLElement & { value: string }).value;
    setValue(value);
    setSelectedOption(options.find((option) => option.code === value));
  };

  return (
    <PSelect name="selected-slot-select" label="Selected Slot" value={value} onChange={onChange}>
      <span slot="selected" className="h-full flex items-center gap-fluid-sm grow">
        {selectedOption && (
          <>
            <PFlag name={selectedOption.code}></PFlag>
            <p className="prose-text-sm truncate m-0">{selectedOption.label}</p>
          </>
        )}
      </span>
      {Object.entries(optgroups).map(([continent, options]) => (
        <POptgroup key={continent} label={continent}>
          {options.map((option) => (
            <PSelectOption key={option.code} value={option.code}>
              <div className="w-full flex items-center gap-fluid-sm">
                <PFlag name={option.code}></PFlag>
                <p className="prose-text-sm m-0">{option.label}</p>
              </div>
            </PSelectOption>
          ))}
        </POptgroup>
      ))}
    </PSelect>
  );
};
