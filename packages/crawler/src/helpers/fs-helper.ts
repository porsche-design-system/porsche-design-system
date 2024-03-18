import { crawlerConfig as config } from '../../constants';
import fs from 'fs';

const getWebsiteNameByWebsiteUrl = (websiteUrl: string): string => {
  const parsedUrl = new URL(websiteUrl);
  let websiteName = parsedUrl.hostname;
  websiteName += parsedUrl.pathname ? parsedUrl.pathname.replace(/\//g, '-').replace(/_/g, '-') : '';
  websiteName += parsedUrl.search ? parsedUrl.search.replace(/[?=]/g, '') : '';
  // maximum filename length
  return websiteName.substring(0, 255);
};
export const writeWebsiteReport = (websiteUrl: string, rawData: string, aggregatedData: string): void => {
  const websiteName = getWebsiteNameByWebsiteUrl(websiteUrl);
  const websiteFolderName = `./${config.reportFolderName}/${websiteName}`;

  // check if 'reports' folder exists
  if (!fs.existsSync(`./${config.reportFolderName}/`)) {
    fs.mkdirSync(`./${config.reportFolderName}/`);
  }
  if (!fs.existsSync(websiteFolderName)) {
    fs.mkdirSync(websiteFolderName);
  }
  fs.writeFileSync(
    `${websiteFolderName}/${new Date().toJSON().slice(0, 10)}${config.dateSplitter}data-raw.json`,
    rawData
  );
  fs.writeFileSync(
    `./${config.reportFolderName}/${websiteName}/${new Date().toJSON().slice(0, 10)}${
      config.dateSplitter
    }data-aggregated.json`,
    aggregatedData
  );
};

export const writeGeneralReport = (aggregatedData: string): void => {
  fs.writeFileSync(
    `./${config.reportFolderName}/${new Date().toJSON().slice(0, 10)}${config.dateSplitter}data-aggregated.json`,
    aggregatedData
  );
};
