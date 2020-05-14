import * as fs from 'fs';

export const getFiles = (directory: string, suffix: string, files: string[] = []): string[] => {
  if (fs.existsSync(directory)) {
    const scan = fs.readdirSync(directory);
    for (let file of scan) {
      const path = `${directory.replace(/\/+$/, '')}/${file}`;
      if (fs.statSync(path).isDirectory()) getFiles(path, suffix, files);
      else if (path.endsWith(suffix)) files.push(path);
    }
  }
  return files;
};
