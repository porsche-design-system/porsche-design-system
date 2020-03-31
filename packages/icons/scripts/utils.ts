import * as fs from 'fs';
import * as crypto from 'crypto';

export const toHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

export const toKebabCase = (str: string): string => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
};

export const getFiles = (directory: string, suffix: string, files: string[] = []): string[] => {
  if (fs.existsSync(directory)) {
    const scan = fs.readdirSync(directory);
    for (let file of scan) {
      const path = `${directory}/${file}`;
      if (fs.statSync(path).isDirectory()) getFiles(path, suffix, files);
      else if (path.endsWith(suffix)) files.push(path);
    }
  }
  return files;
};
