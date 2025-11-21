import { PSelect, PSelectOption, PButton } from '@porsche-design-system/components-react/ssr';
import type { CSSProperties } from 'react';
import { getCurrentPdsVersion } from '@/utils/getCurrentPdsVersion';

type VersionSelectProps = {
  pdsVersions: string[];
};

export const VersionSelect = ({ pdsVersions }: VersionSelectProps) => {
  const onVersionChange = (version: string) => {
    window.location.href = `https://designsystem.porsche.com/v${version}`;
  };
  const currentPdsVersion = getCurrentPdsVersion();

  const latestVersion = pdsVersions[0];

  return (
    <div className="flex gap-2 flex-col">
      <PSelect
        name="versions"
        value={latestVersion}
        onChange={(e) => onVersionChange(e.detail.value)}
        label="Switch version"
        compact={true}
        style={{ '--p-select-background-color': 'theme(colors.backgroundSurface)' } as CSSProperties}
      >
        {pdsVersions.map((version) => (
          <PSelectOption key={version} value={version}>
            {version !== latestVersion ? version : `${version} (latest)`}
          </PSelectOption>
        ))}
      </PSelect>
      {currentPdsVersion !== null && currentPdsVersion !== latestVersion && (
        <PButton compact={true} variant="ghost" icon="arrow-right" onClick={() => onVersionChange(latestVersion)}>
          Use Latest Version
        </PButton>
      )}
    </div>
  );
};
