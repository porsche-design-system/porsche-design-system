import { PButton, PSelect, PSelectOption, type PSelectProps } from '@porsche-design-system/components-react/ssr';
import type { PDSVersionGroup } from '@/models/pdsVersion';
import { isDevEnvironment } from '@/utils/isDev';
import { getMajorVersion } from '@/utils/pdsVersion';

type VersionSelectProps = {
  readonly pdsVersion: PDSVersionGroup;
};

export const VersionSelect = ({ pdsVersion }: VersionSelectProps) => {
  const onVersionChange = (version: PSelectProps['value']) => {
    const ver = version === pdsVersion.latest ? getMajorVersion(version) : version;
    window.location.href = `https://designsystem.porsche.com/v${ver}`;
  };

  return (
    <div className="flex gap-2 flex-col">
      <PSelect
        name="versions"
        value={pdsVersion.current}
        onChange={(e) => onVersionChange(e.detail.value)}
        label="Switch version"
        compact={true}
        style={{ '--p-select-background-color': 'var(--p-color-surface)' } as Record<string, string>}
      >
        {pdsVersion.all.map((version) => {
          const prefixedVersion = `v${version}`;
          return (
            <PSelectOption key={version} value={version}>
              {version !== pdsVersion.latest ? prefixedVersion : `${prefixedVersion} (latest)`}
            </PSelectOption>
          );
        })}
      </PSelect>
      {!isDevEnvironment && pdsVersion.current !== null && pdsVersion.current !== pdsVersion.latest && (
        <PButton
          compact={true}
          variant="secondary"
          icon="arrow-right"
          onClick={() => onVersionChange(pdsVersion.latest)}
        >
          Use Latest Release
        </PButton>
      )}
    </div>
  );
};
