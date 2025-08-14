import { afterAll, describe, expect, test } from 'vitest';
import * as statsFixture from './../fixtures/stats.json';
import { logStatsDiffAsTable, type StatsDiff } from '../helpers/log';
import * as statsResult from './../results/stats.json';

type Stats = { name: string; size: number; gzipSize: number };
// @ts-ignore
const statsOld: Stats[] = statsFixture.default;
// @ts-ignore
const statsNew: Stats[] = statsResult.default;

const getStatsDiff = (statsOld: Stats[], statsNew: Stats[]): StatsDiff[] => {
  return statsOld
    .filter((statOld) => !statsNew.find((statNew) => statOld.name === statNew.name))
    .concat(statsNew)
    .map(({ name }) => {
      const statOld = statsOld.filter((i) => i.name === name)[0] || {}; // || {} handles case when flag was added
      const statNew = statsNew.filter((i) => i.name === name)[0] || {}; // || {} handles case when flag was removed
      const oldSize = statOld.size;
      const newSize = statNew.size;
      const diffSize = newSize - oldSize;
      const oldGzipSize = statOld.gzipSize;
      const newGzipSize = statNew.gzipSize;
      const diffGzipSize = newGzipSize - oldGzipSize;

      return {
        name,
        oldSize,
        newSize,
        diffSize,
        oldGzipSize,
        newGzipSize,
        diffGzipSize,
      };
    });
};

const statsDiff = getStatsDiff(statsOld, statsNew);

describe.each(statsDiff)('size for svgo optimized "$name" flag [diff: $diffSize bytes]', ({ diffSize }) => {
  test('should roughly stay the same', () => {
    const allowedSizeChange = 100;
    expect(diffSize).toBeLessThanOrEqual(allowedSizeChange);
    expect(diffSize).toBeGreaterThanOrEqual(-allowedSizeChange);
  });
});

afterAll(() => logStatsDiffAsTable(statsDiff));
