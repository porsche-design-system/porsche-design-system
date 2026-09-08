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
