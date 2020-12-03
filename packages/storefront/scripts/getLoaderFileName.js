const path = require('path');
const fs = require('fs');

export const getLoaderFileName = () => {
  const rootDirectory = path.resolve(__dirname).endsWith('scripts')
    ? path.resolve(__dirname, '..')
    : path.resolve('./');
  const filePath = path.resolve(rootDirectory, 'storefront.config.ts');
  const fileContent = fs.readFileSync(filePath).toString();

  return fileContent.match(/export const PDS_LOADER_FILENAME = '(pds-loader\.[\w\d]*\.js)';/)[1];
};
