import { PSelect, PSelectOption, PButton } from '@porsche-design-system/components-react/ssr';
import type { CSSProperties } from 'react';
import { PDSVersionGroup } from '@/models/pdsVersion';
import { getMajor } from '@/utils/pdsVersion';

type VersionSelectProps = {
  readonly pdsVersion: PDSVersionGroup;
};

export const VersionSelect = ({ pdsVersion }: VersionSelectProps) => {
  const onVersionChange = (version: string) => {
    const ver = version === pdsVersion.latest ? getMajor(version) : version;
    window.location.href = `https://designsystem.porsche.com/v${ver}`;
  };

  return (
    <div className="flex gap-2 flex-col">
      <PSelect
        name="versions"
        value={pdsVersion.latest}
        onChange={(e) => onVersionChange(e.detail.value)}
        label="Switch version"
        compact={true}
        style={{ '--p-select-background-color': 'theme(colors.backgroundSurface)' } as CSSProperties}
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
      {pdsVersion.current !== null && pdsVersion.current !== pdsVersion.latest && (
        <PButton compact={true} variant="ghost" icon="arrow-right" onClick={() => onVersionChange(pdsVersion.latest)}>
          Use Latest Release
        </PButton>
      )}
    </div>
  );
};
