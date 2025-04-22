import { PSelect, PSelectOption, type SelectUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

type PdsVersionSelectProps = {
  pdsVersions: string[];
  onUpdate: (e: CustomEvent<SelectUpdateEventDetail>) => void;
};

export const PdsVersionSelect = ({ pdsVersions, onUpdate }: PdsVersionSelectProps) => {
  return (
    <PSelect name="pds-versions" label="Choose your Porsche Design System version:" onUpdate={onUpdate}>
      {pdsVersions.map((pdsVersion, index) => (
        <PSelectOption key={index} value={pdsVersion}>
          {pdsVersion}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
