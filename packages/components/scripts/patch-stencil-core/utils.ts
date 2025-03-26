import * as fs from 'fs';
import * as path from 'path';

/**
 * Backs up the given file if no backup exists. If a backup is found, it restores the original file.
 */
export const backupOrRestoreFile = (filePath: string): void => {
  const fileExt = path.extname(filePath);
  const fileName = path.basename(filePath, fileExt);
  const backupFilePath = path.resolve(filePath, `../${fileName}-original${fileExt}'`);

  if (fs.existsSync(backupFilePath)) {
    // Restore backup if it exists
    fs.copyFileSync(backupFilePath, filePath);
  } else {
    // Create backup before modifying
    fs.copyFileSync(filePath, backupFilePath);
  }
};

export const escapeString = (str: string): string => str.replace(/[\\"'()\[\]{}.?+*^$|]/g, '\\$&');
export const getPatchMarkerCount = (script: string, regex: RegExp): number => (script.match(regex) || []).length;
