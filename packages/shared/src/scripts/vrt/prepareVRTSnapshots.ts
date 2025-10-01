#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

type ModeType = 'prepare' | 'update';

function getFlagValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 && process.argv[idx + 1] ? process.argv[idx + 1] : undefined;
}

async function prepareSnapshotsWalk(source: string): Promise<void> {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(source, file.name);

      if (file.isDirectory()) {
        await prepareSnapshotsWalk(filePath);
      } else if (file.name.endsWith('actual.png')) {
        const parentDir = path.basename(path.dirname(filePath));

        let newFilePath: string | null = null;

        if (/chrome(-retry\d+)?$/.test(parentDir)) {
          newFilePath = filePath.replace(/actual\.png$/, 'chrome.png');
        } else if (/safari(-retry\d+)?$/.test(parentDir)) {
          newFilePath = filePath.replace(/actual\.png$/, 'safari.png');
        }

        if (newFilePath && newFilePath !== filePath) {
          try {
            await fs.rename(filePath, newFilePath);
            console.log(`Renamed: ${filePath} -> ${newFilePath}`);
          } catch (err) {
            console.error(`Failed to rename ${filePath}:`, err);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error walking directory ${source}:`, err);
  }
}

async function updateSnapshots(source: string, exportDir: string): Promise<void> {
  const files = await fs.readdir(source, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(source, file.name);

    if (file.isDirectory()) {
      if (/retry\d+$/.test(file.name)) continue;

      await updateSnapshots(fullPath, exportDir);
    } else if (file.name.endsWith('chrome.png') || file.name.endsWith('safari.png')) {
      const targetPath = path.join(exportDir, file.name);
      try {
        await fs.copyFile(fullPath, targetPath);
        console.log(`Copied snapshot: ${fullPath} -> ${targetPath}`);
      } catch (err) {
        console.error(`Failed to copy ${fullPath}:`, err);
      }
    }
  }
}

async function deleteOrMoveRetryDirectories(source: string, exportDir: string): Promise<void> {
  try {
    if (source !== exportDir) {
      await fs.cp(source, exportDir, { recursive: true, force: true });
    }

    const entries = await fs.readdir(exportDir, { withFileTypes: true });

    for (const dirent of entries) {
      if (dirent.isDirectory() && /retry\d+$/.test(dirent.name)) {
        const retryPath = path.join(exportDir, dirent.name);
        try {
          await fs.rm(retryPath, { recursive: true, force: true });
          console.log(`Removed retry directory: ${retryPath}`);
        } catch (err) {
          console.error(`Failed to remove ${retryPath}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directories:`, err);
  }
}

async function main() {
  const defaultDir = 'tests/vrt/results';
  const source = getFlagValue('--source') || defaultDir;
  const exportDir = getFlagValue('--output') || defaultDir;
  const modeArg = getFlagValue('--mode');
  const mode: ModeType = modeArg === 'update' ? 'update' : 'prepare';

  try {
    await fs.access(source);
    await fs.access(exportDir);

    switch (mode) {
      case 'prepare':
        console.log('---------Starting VRT snapshots preparation...---------');
        await deleteOrMoveRetryDirectories(source, exportDir);
        await prepareSnapshotsWalk(exportDir);
        break;

      case 'update':
        console.log('---------Updating VRT snapshots...---------');
        await updateSnapshots(source, exportDir);
        break;
    }
  } catch (err) {
    console.error('Initialization error:', err);
    process.exit(1);
  }
}

main();
