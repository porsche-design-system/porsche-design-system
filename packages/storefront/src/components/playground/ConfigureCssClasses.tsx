import { PSelect, PSelectOption, type SelectChangeEventDetail } from '@porsche-design-system/components-react/ssr';
import type React from 'react';

type ConfigureCssClassesProps = {
  cssClasses: string;
  onUpdateCssClasses: (cssClass: string) => void;
};

export const ConfigureCssClasses = ({ cssClasses, onUpdateCssClasses }: ConfigureCssClassesProps) => {
  const themeMatch = cssClasses.match(/\b(light|dark|auto)\b/);
  const themeValue = themeMatch ? themeMatch[1] : undefined;

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    const value = (e.target as HTMLElement & { value: string }).value;
    onUpdateCssClasses(value);
  };

  return (
    <>
      <span slot="heading" className="flex gap-fluid-xs">
        CSS Classes{' '}
      </span>
      <div className="flex flex-col gap-fluid-sm">
        <PSelect name="theme" value={themeValue} onChange={onChange} label="Theme" compact={true}>
          <PSelectOption></PSelectOption>
          <PSelectOption value="light">.light</PSelectOption>
          <PSelectOption value="dark">.dark</PSelectOption>
          <PSelectOption value="auto">.auto</PSelectOption>
        </PSelect>
      </div>
    </>
  );
};
