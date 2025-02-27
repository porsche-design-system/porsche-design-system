import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { PButton } from '@porsche-design-system/components-react/ssr';
import sdk from '@stackblitz/sdk';
import { dependencies } from '../../../../components-js/package.json';

type StackblitzButtonProps = {
  frameworkConfiguratorMarkup: FrameworkConfiguratorMarkup;
};

// TODO: Theme needs to be set. For vanilla-js we don't have a Theme Provider so we can't use the global theme without adding it as prop.
export const StackblitzButton = ({ frameworkConfiguratorMarkup }: StackblitzButtonProps) => {
  const openInStackblitz = (markup: string) => {
    sdk.openProject(
      {
        files: {
          'index.html': markup,
          'index.js': '',
        },
        template: 'javascript',
        title: 'Porsche Design System',
        description: 'Porsche Design System component example',
        dependencies: {
          '@porsche-design-system/components-js': dependencies['@porsche-design-system/components-js'],
        },
      },
      {
        openFile: 'index.html',
      }
    );
  };

  return (
    <PButton
      type="button"
      icon-source="stackBlitzIcon"
      onClick={() =>
        openInStackblitz(
          getVanillaJsCode(frameworkConfiguratorMarkup['vanilla-js'], { isFullConfig: true, theme: 'light' })
        )
      }
    >
      Open in Stackblitz
    </PButton>
  );
};
