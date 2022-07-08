import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { Framework } from '@/models';
import { version as vanillaJsVersion } from '../../../components-js/projects/components-wrapper/package.json';

type OpenOptions = {
  markup: string;
  framework: Framework;
  additionalJavaScriptLogic?: string;
};

export const openVanillaJS = (props: OpenOptions) => {
  const { markup, framework, additionalJavaScriptLogic } = props;

  sdk.openProject({
    files: {
      'index.html': `${convertMarkup(markup, framework)}`,
      'index.js': `import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
    },
    template: 'javascript',
    title: 'Vanilla JS Example',
    description: 'Porsche Design System components example',
    dependencies: {
      '@porsche-design-system/components-js': `${vanillaJsVersion}`,
    },
  });
};
