import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

const convertJssToStyledComponents = (): void => {
  const jssDirectory: string = path.resolve('./jss');

  const jssFiles: string[] = globby.sync(`/${jssDirectory}/*.ts`);
  const filteredJssFiles: string[] = jssFiles.filter((file) => (!file.match(/(spec)/g) ? file : null));

  filteredJssFiles.forEach((file) => {
    const extractedFileName: string = file.replace(`/${jssDirectory}/`, '');
    const jssFile: string = fs.readFileSync(file, 'utf-8');
    const hasReturn: boolean = jssFile.includes('return');

    let content: string = '';
    content +=
      (hasReturn ? `import styled from 'styled-components';\n` : '') +
      jssFile.replace("import type { JssStyle } from 'jss';\n", '');

    const getStyleName = new RegExp('JssStyle([^;]*)= ', 'g');
    content = content.replaceAll(': JssStyle', ': any');
    content = content.replace(getStyleName, 'StyledComponentsStyle = ');

    if (hasReturn) {
      content = content.replace(/return ([^;]*)/g, 'return styled.div(' + '$1' + ')');

      // content.slice(0, content.length - 5).replace(/return ([^;]*);/g, 'return styled.div(') + ');\n};';
    }
    fs.writeFileSync(`./styled-components/${extractedFileName}`, content);
    process.stdout.write('Files generated!');
  });
};

convertJssToStyledComponents();
