import * as glob from 'glob'; // TODO: use globby like everywhere else
import * as path from 'path';
import * as fs from 'fs';
import { getProjectRootPath } from './config';

async function filePathsByPattern(pattern: string): Promise<string[]> {
  const matches = await new Promise<string[]>((resolve, reject) => {
    glob(
      pattern,
      {
        cwd: getProjectRootPath(),
        nodir: true,
      },
      (error, files) => {
        if (!error) {
          resolve(files);
        }

        reject(error);
      }
    );
  });

  if (matches.length > 0) {
    return matches.map((match) => {
      return path.resolve(getProjectRootPath(), match);
    });
  }

  console.error(`The pattern "${pattern}" didn't match any files.`);
  process.exit(1);
}

export async function filePathByPattern(pattern: string): Promise<string> {
  const matches = await filePathsByPattern(pattern);
  return matches[0];
}

export async function filenameByPattern(pattern: string): Promise<string> {
  const filePath = await filePathByPattern(pattern);
  return path.basename(filePath);
}

export async function fileContentByPattern(pattern: string): Promise<string> {
  const filePath = await filePathByPattern(pattern);
  return await fs.promises.readFile(filePath, { encoding: 'utf-8' });
}

export async function copyFileByPattern(pattern: string, targetDirectory: string): Promise<void> {
  const filePaths = await filePathsByPattern(pattern);
  const absoluteTargetDirectory = path.resolve(getProjectRootPath(), targetDirectory);

  for (const filePath of filePaths) {
    const baseName = path.basename(filePath);
    const targetFilePath = path.resolve(absoluteTargetDirectory, baseName);
    await fs.promises.copyFile(filePath, targetFilePath);
  }
}
