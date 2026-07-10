import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

/** Tree-relative POSIX paths of every file under `root`, sorted for deterministic traversal. */
export const listSkillTreeFiles = (root: string): string[] => {
  const walk = (current: string): string[] =>
    fs.readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
      const absolute = path.join(current, entry.name);
      return entry.isDirectory() ? walk(absolute) : [absolute];
    });

  return walk(root)
    .map((absolute) => path.relative(root, absolute).split(path.sep).join('/'))
    .sort();
};

/** Hash sorted relative paths and exact file bytes into one compact tree fingerprint. */
export const hashSkillTree = (root: string): string => {
  const hash = createHash('sha256');
  for (const relative of listSkillTreeFiles(root)) {
    hash.update(relative);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(root, relative)));
    hash.update('\0');
  }
  return hash.digest('hex');
};

/** Return the first structural or byte difference between two trees, or `null` when identical. */
export const findSkillTreeDifference = (firstRoot: string, secondRoot: string): string | null => {
  const firstFiles = listSkillTreeFiles(firstRoot);
  const secondFiles = listSkillTreeFiles(secondRoot);
  const fileCount = Math.max(firstFiles.length, secondFiles.length);

  for (let index = 0; index < fileCount; index++) {
    if (firstFiles[index] !== secondFiles[index]) {
      return `file list differs at ${firstFiles[index] ?? '<end>'} / ${secondFiles[index] ?? '<end>'}`;
    }
  }

  for (const relative of firstFiles) {
    if (!fs.readFileSync(path.join(firstRoot, relative)).equals(fs.readFileSync(path.join(secondRoot, relative)))) {
      return `file bytes differ at ${relative}`;
    }
  }

  return null;
};
