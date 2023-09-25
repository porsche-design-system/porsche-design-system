import * as fs from 'fs';
import * as path from 'path';

const prepareLicense = (): void => {
  const licenseFilePath = path.resolve(__dirname, '../../../LICENSE');
  const licenseFileContent = fs.readFileSync(licenseFilePath, 'utf8');

  const content = `/* Auto Generated File */

export const licenseContent = \`${licenseFileContent}\`;
`;

  const targetFolder = '../src/lib';
  fs.mkdirSync(path.resolve(__dirname, targetFolder), { recursive: true });

  const targetFileName = 'license.ts';
  const targetFilePath = path.resolve(__dirname, targetFolder, targetFileName);
  fs.writeFileSync(targetFilePath, content);

  console.log(`Generated: ${targetFolder}/${targetFileName}`);
};

prepareLicense();
