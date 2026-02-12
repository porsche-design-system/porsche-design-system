import { PSelect, PSelectOption, type SelectChangeEventDetail } from '@porsche-design-system/components-react/ssr';

import React, { type CSSProperties } from 'react';

type ConfigureCssClassesProps = {
  style: CSSProperties;
  handleUpdateColorScheme: (cssClass: string) => void;
};

export const ConfigureColorScheme = ({ style, handleUpdateColorScheme }: ConfigureCssClassesProps) => {
  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const value = (e.target as HTMLElement & { value: string }).value;
    handleUpdateColorScheme(value);
  };

  const themeMap: Record<'light' | 'dark' | 'light dark', string> = {
    light: 'Light',
    dark: 'Dark',
    'light dark': 'Light Dark (sync with operating system)',
  };

  return (
    <>
      <span slot="heading" className="flex gap-fluid-xs">
        Color Scheme{' '}
      </span>
      <div className="flex flex-col gap-fluid-sm">
        <PSelect name="theme" value={style.colorScheme} onChange={onChange} label="Color Scheme" compact={true}>
          <PSelectOption></PSelectOption>
          {Object.entries(themeMap).map(([theme, name]) => (
            <PSelectOption key={theme} value={theme}>
              {name}
            </PSelectOption>
          ))}
        </PSelect>
      </div>
    </>
  );
};
