import { PSelect, PSelectOption, type SelectChangeEventDetail } from '@porsche-design-system/components-react/ssr';

type Version = {
  name: string;
  path: string;
};

const versions: Version[] = [
  {
    name: 'v3',
    path: 'v3',
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
  const onVersionChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    window.location.href = `https://designsystem.porsche.com/${e.detail.value}`;
  };

  return (
    <PSelect
      name="versions"
      value={versions[0].path}
      onChange={onVersionChange}
      label="Switch version"
      compact={true}
    >
      {versions.map(({ name, path }) => (
        <PSelectOption key={path} value={path}>
          {name}
        </PSelectOption>
      ))}
    </PSelect>
  );
};
