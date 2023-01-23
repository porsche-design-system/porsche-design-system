import { crawlerConfig as config } from '../constants';

export const stringifyObject = (obj: object): string => JSON.stringify(obj, null, config.jsonSpace);
