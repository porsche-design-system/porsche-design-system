import fs from 'fs';
import { crawlerConfig as config } from '../constants';

export const removeOldReports = (): void => {
  fs.readdirSync(config.reportFolderName)
    .filter((fileName: string) => {
      const dateCreated = Date.parse(fileName.split(config.dateSplitter)[0]);
      const oldestTimePossible = Date.now() - config.reportsMaxAge;
      return dateCreated < oldestTimePossible;
    })
    .map((fileName: string) => {
      fs.unlinkSync(`${config.reportFolderName}/${fileName}`);
    });
};
