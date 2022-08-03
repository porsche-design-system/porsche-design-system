import {
  dataAdvanced,
  headAdvanced,
  getTableCodeSamples,
  getTextFieldWrapperCodeSamples,
} from '@porsche-design-system/shared';
import { getReactProjectAndOpenOptions } from '../../src/utils/stackblitz/openReact';
import { convertMarkup } from '../../src/utils';

const sharedProps = {
  description: 'Some description',
  title: 'Some title',
  bodyStyles: 'body {}',
};

describe('getReactProjectAndOpenOptions()', () => {
  it('should have correct button markup and boilerplate for stackBlitz react project and options', () => {
    const markup = `<p-button variant="primary">Some label</p-button>
<p-button variant="primary" disabled>Some label</p-button>
<p-button variant="primary" loading>Some label</p-button>

<p-button variant="primary" hide-label="true">Some label</p-button>
<p-button variant="primary" hide-label="true" disabled>Some label</p-button>
<p-button variant="primary" hide-label="true" loading>Some label</p-button>`;

    expect(
      getReactProjectAndOpenOptions({
        ...sharedProps,
        markup: convertMarkup(markup, 'react'),
        hasFrameworkMarkup: false,
        reactComponentsToImport: 'PButton',
      })
    ).toMatchSnapshot();
  });

  it('should have correct table markup and boilerplate for stackBlitz react project and options', () => {
    const frameworkMarkup = getTableCodeSamples('example-advanced').react!;

    expect(
      getReactProjectAndOpenOptions({
        ...sharedProps,
        markup: convertMarkup(frameworkMarkup, 'react'),
        hasFrameworkMarkup: true,
        reactComponentsToImport:
          'PButtonPure,PFlex,PFlexItem,PHeadline,PTable,PTableBody,PTableCell,PTableHead,PTableHeadCell,PTableHeadRow,PTableRow,PText',
        sharedTableMarkup: { headAdvanced, dataAdvanced },
      })
    ).toMatchSnapshot();
  });

  it('should have correct textField markup with iMask and boilerplate for stackBlitz react project and options', () => {
    const frameworkMarkup = getTextFieldWrapperCodeSamples().react!;

    expect(
      getReactProjectAndOpenOptions({
        ...sharedProps,
        markup: convertMarkup(frameworkMarkup, 'react'),
        hasFrameworkMarkup: true,
        reactComponentsToImport: 'PTextFieldWrapper',
        additionalDependencies: ['IMask'],
      })
    ).toMatchSnapshot();
  });
});
