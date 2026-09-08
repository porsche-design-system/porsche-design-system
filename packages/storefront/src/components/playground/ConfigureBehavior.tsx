import { PHeading, PPopover, PSelect, PSelectOption } from '@porsche-design-system/components-react/ssr';
import React from 'react';

export type ConfiguratorMode = 'uncontrolled' | 'controlled';

type ConfigureBehaviorProps = {
  mode: ConfiguratorMode;
  onUpdateMode: (mode: ConfiguratorMode) => void;
};

/**
 * Sidebar control for dual-mode components (e.g. p-popover) that lets the user switch between the
 * uncontrolled and controlled setup.
 */
export const ConfigureBehavior = ({ mode, onUpdateMode }: ConfigureBehaviorProps) => {
  return (
    <>
      <PHeading slot="summary" tag="h2" size="small" weight="semibold">
        Behavior
      </PHeading>
      <div className="flex flex-col gap-fluid-sm">
        <PSelect
          name="state-management"
          value={mode}
          compact={true}
          onChange={(e) => onUpdateMode(e.detail.value as ConfiguratorMode)}
        >
          <span slot="label">State Management</span>
          <PPopover slot="label-after" onClick={(e) => e.preventDefault()}>
            Choose how the component manages its state. In <b>Uncontrolled</b> mode the component handles its state
            internally. In <b>Controlled</b> mode you own the state and update it in response to the component's events.
          </PPopover>
          <PSelectOption value="uncontrolled">Uncontrolled</PSelectOption>
          <PSelectOption value="controlled">Controlled</PSelectOption>
        </PSelect>
      </div>
    </>
  );
};
