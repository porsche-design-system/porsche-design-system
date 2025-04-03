import { PSelect, PSelectOption, type SelectUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import type { CSSProperties } from 'react';

type Version = {
  name: string;
  path: string;
};

const versions: Version[] = [
  {
    name: '> v3.27.3',
    path: 'v3',
  },
  {
    name: '<= v3.27.3',
    path: 'v3-old', // TODO: Adjust path
  },
  {
    name: 'v2',
    path: 'v2',
  },
  {
    name: 'v1',
    path: 'v1',
  },
];

export const VersionSelect = () => {
  const onVersionChange = (e: CustomEvent<SelectUpdateEventDetail>) => {
    window.location.href = `https://designsystem.porsche.com/${e.detail.value}`;
  };

  return (
    <PSelect
      name="versions"
      value={versions[0].path}
      onUpdate={onVersionChange}
      label="Switch version"
      aria-label="Switch Porsche Design System version"
      compact={true}
      style={{ '--p-select-background-color': 'theme(colors.backgroundSurface)' } as CSSProperties}
    >
      {versions.map(({ name, path }) => (
        <PSelectOption key={path} value={path}>
          {name}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
