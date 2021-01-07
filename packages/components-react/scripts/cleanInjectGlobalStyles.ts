import * as fs from 'fs';
import * as path from 'path';

const cleanInjectGlobalStyles = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const directory = path.resolve(rootDirectory, 'dist/components-wrapper/jsdom-polyfill/lib');
  const [fileName] = fs.readdirSync(directory).filter((el) => !!el.match(/^app-globals-[\d\w]*.js$/));
  const filePath = path.resolve(directory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const result = fileContent.replace(/console\.warn\((.|\s)*?\);/, '');

  fs.writeFileSync(filePath, result);

  console.log(`Cleaned inject global styles warning in '${fileName}'`);
};

cleanInjectGlobalStyles();
