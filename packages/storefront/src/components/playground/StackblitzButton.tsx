import { PButton } from '@porsche-design-system/components-react/ssr';
import sdk from '@stackblitz/sdk';
import { dependencies } from '../../../../components-js/package.json';

export const getIndexHtml = (): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Porsche Design System</title>
    <script src="node_modules/@porsche-design-system/components-js/index.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      porscheDesignSystem.load();
    </script>
    <p-heading>Welcome to Vanilla JS</p-heading>
  </body>
</html>`;
};

const openInStackblitz = (markup: string) => {
  sdk.openProject(
    {
      files: {
        'index.html': getIndexHtml(),
        'example.html': markup,
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
      openFile: 'example.html',
      initialPath: '/example.html',
    }
  );
};

type StackblitzButtonProps = {
  markup: string;
};

export const StackblitzButton = ({ markup }: StackblitzButtonProps) => {
  return (
    <PButton type="button" icon-source="stackBlitzIcon" onClick={() => openInStackblitz(markup)}>
      Open in Stackblitz
    </PButton>
  );
};
