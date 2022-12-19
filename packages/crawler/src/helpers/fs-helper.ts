import { crawlerConfig as config } from '../../constants';
import fs from 'fs';

export const writeWebsiteReport = (websiteUrl: string, rawData: string, aggregatedData: string) => {
  const parsedUrl = new URL(websiteUrl);
  let websiteName = parsedUrl.hostname;
  const topLevelDir = parsedUrl.pathname.match(/^\/([^/]+)\//g);
  websiteName += topLevelDir && topLevelDir.length ? '-' + topLevelDir[0].replace(/\//g, '').replace(/_/g, '-') : '';

  const websiteFolderName = `./${config.reportFolderName}/${websiteName}`;
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

export const writeGeneralReport = (aggregatedData: string) => {
  fs.writeFileSync(
    `./${config.reportFolderName}/${new Date().toJSON().slice(0, 10)}${config.dateSplitter}data-aggregated.json`,
    aggregatedData
  );
};

export const removeOutdatedReports = (): void => {
  fs.readdirSync(config.reportFolderName)
    .filter(
      (fileName: string) => Date.parse(fileName.split(config.dateSplitter)[0]) < Date.now() - config.reportsMaxAge
    )
    .map((fileName: string) => {
      console.log(`Removing file ${fileName}`);
      fs.unlinkSync(`${config.reportFolderName}/${fileName}`);
    });
};
