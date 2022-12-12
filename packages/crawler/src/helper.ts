import fs from 'fs';
import { crawlerConfig as config } from '../constants';
import { componentMeta, TagName } from '@porsche-design-system/shared';

export type TagNamesWithProperties = Record<TagName, string[]>;

export const getTagNamesWithProperties = (): TagNamesWithProperties =>
  Object.entries(componentMeta).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.props ? Object.keys(value.props) : [],
    }),
    {} as TagNamesWithProperties
  );

export const removeOutdatedReports = (): void => {
  fs.readdirSync(config.reportFolderName)
    .filter(
      (fileName: string) => Date.parse(fileName.split(config.dateSplitter)[0]) < Date.now() - config.reportsMaxAge
    )
    .map((fileName: string) => {
      fs.unlinkSync(`${config.reportFolderName}/${fileName}`);
    });
};
