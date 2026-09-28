import { PButton, PSelect, PSelectOption, type PSelectProps } from '@porsche-design-system/components-react/ssr';
import type { PDSVersionGroup } from '@/models/pdsVersion';
import { isDevEnvironment } from '@/utils/isDev';
import { getMajorVersion } from '@/utils/pdsVersion';

type VersionSelectProps = {
  readonly pdsVersion: PDSVersionGroup;
};

export const VersionSelect = ({ pdsVersion }: VersionSelectProps) => {
  const { latest } = pdsVersion;

  const onVersionChange = (version: PSelectProps['value']) => {
    const ver = latest !== undefined && version === latest ? getMajorVersion(latest) : version;
    window.location.href = `${window.location.origin}/v${ver}`;
  };

  return (
    <div className="flex gap-2 flex-col">
      <PSelect
        name="versions"
        value={pdsVersion.current}
        onChange={(e) => onVersionChange(e.detail.value)}
        label="Switch version"
        compact={true}
        hideLabel={true}
        style={{ '--p-select-background-color': 'var(--p-color-surface)' } as Record<string, string>}
      >
        {pdsVersion.all.map((version) => (
          <PSelectOption key={version} value={version}>
            v{version}
          </PSelectOption>
        ))}
      </PSelect>
      {!isDevEnvironment && latest !== undefined && pdsVersion.current !== latest && (
        <PButton compact={true} variant="secondary" icon="arrow-right" onClick={() => onVersionChange(latest)}>
          Use Latest Release
        </PButton>
      )}
    </div>
  );
};
