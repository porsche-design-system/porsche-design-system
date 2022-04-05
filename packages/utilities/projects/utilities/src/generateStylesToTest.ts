import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

type jssStyleFunction = {
  name: string;
  hasParams: boolean;
  params: string[];
};

const generateStylesToTest = () => {
  const jssDirectory: string = path.resolve('./src/jss');
  const jssStyleFunctionNames: jssStyleFunction[] = [];
  let jssStyleFunctionParams: string[] = [];

  const jssFiles: string[] = globby.sync(`/${jssDirectory}/*.ts`);
  const filteredJssFiles: string[] = jssFiles.filter((file) => (!file.match(/(spec)/g) ? file : null));
  filteredJssFiles.forEach((file) => {
    //   const extractedFileName: string = file.replace(`/${jssDirectory}/`, '');
    const jssFile: string = fs.readFileSync(file, 'utf-8');
    const returnsJssStyles: boolean = jssFile.includes('JssStyle');

    if (returnsJssStyles) {
      const typeRegExp = new RegExp('type(.*?);', 'g');

      // @ts-ignore
      const getRawParams: string[] = [...jssFile.match(typeRegExp)];
      getRawParams.shift();

      if (getRawParams) {
        jssStyleFunctionParams = getRawParams.map((param) => {
          return param
            .replace(/type(.*?)=/g, '')
            .replace(/\|(.*?);/g, '')
            .replace(';', '')
            .trim();
        });
      }

      // @ts-ignore
      const findFunctionName: string[] = jssFile.match(/export const(.*?) (= \()/g);
      const extractFunctionName = findFunctionName?.[0].replace(/(export const )|( = \()/g, '');

      jssStyleFunctionNames.push({
        name: extractFunctionName,
        hasParams: jssStyleFunctionParams.length > 0,
        params: jssStyleFunctionParams,
      });
    }
  });

  // generate imports
  const createJssStyleImport: string = `import { ${jssStyleFunctionNames
    .map((func) => func.name)
    .join(', ')} } from './jss';`;
  const imports: string = `
import styled, { StyleSheetManager } from 'styled-components';
import { createUseStyles } from 'react-jss';
${createJssStyleImport}
import './scss/screen-reader.scss';
  `;

  const createFunctionCalls: string[] = jssStyleFunctionNames.map((func: jssStyleFunction) =>
    func.hasParams ? `    ...(${func.name}(${func.params.join(', ')}) as any),` : `    ...${func.name}(),`
  );
  // generate styles with styled-components
  const styledComponentsStyles: string = `
export const StyledComponentsStyle = styled.div({
  div: {
${createFunctionCalls.join('\n')}
  },
});
  `;

  // generate styles with JSS
  const jssStyles: string = `
const useStyles = createUseStyles({
  '@global': {
    div: {
${createFunctionCalls.map((func: string) => '  ' + func).join('\n')}
    },
  },
});
  `;

  // generate test component to render styles
  const testComponent: string = `
export const App = (): JSX.Element => {
  useStyles();
  return (
    <StyleSheetManager disableVendorPrefixes>
      <StyledComponentsStyle />
    </StyleSheetManager>
  );
};
  `;

  const generateTestFile = [imports, styledComponentsStyles, jssStyles, testComponent].join('');
  fs.writeFileSync('./src/App.tsx', generateTestFile);
};

generateStylesToTest();
