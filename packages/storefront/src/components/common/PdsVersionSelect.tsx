import { PSelect, PSelectOption, type SelectChangeEventDetail } from '@porsche-design-system/components-react/ssr';

type PdsVersionSelectProps = {
  pdsVersions: string[];
  onVersionChange: (e: CustomEvent<SelectChangeEventDetail>) => void;
};

export const PdsVersionSelect = ({ pdsVersions, onVersionChange }: PdsVersionSelectProps) => {
  return (
    <PSelect name="pds-versions" label="Choose your Porsche Design System version:" onChange={onVersionChange}>
      {pdsVersions.map((pdsVersion, index) => (
        <PSelectOption key={index} value={pdsVersion}>
          {pdsVersion}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
