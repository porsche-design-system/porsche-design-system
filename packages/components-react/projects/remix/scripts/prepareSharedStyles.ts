import * as fs from 'fs';
import * as path from 'path';

const prepareSharedStyles = (): void => {
  const sharedPackageFilePath = require.resolve('@porsche-design-system/shared');
  const sharedTestingStyles = fs.readFileSync(path.resolve(sharedPackageFilePath, '../../dist/css/styles.css'), 'utf8');

  const fileContent = `/* Auto Generated File */

export const getSharedStyles = (): JSX.Element => {
  return <style dangerouslySetInnerHTML={{ __html: \`${sharedTestingStyles.replace(
    /\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g,
    '$1'
  )}\` }} />
}`;

  const destinationDir = path.resolve(__dirname, '../styles');
  const destinationFilePath = path.resolve(destinationDir, 'getSharedStyles.tsx');
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }
  fs.writeFileSync(destinationFilePath, fileContent);
};

prepareSharedStyles();
