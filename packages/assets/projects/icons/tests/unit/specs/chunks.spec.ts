import * as statsFixture from './../fixtures/stats.json';
import * as statsResult from './../results/stats.json';

type Stats = { name: string; size: number; gzipSize: number };
// @ts-ignore
const statsOld: Stats[] = statsFixture.default;
// @ts-ignore
const statsNew: Stats[] = statsResult.default;

type StatsTest = {
  name: string;
  oldSize?: number;
  newSize?: number;
  diffSize?: number;
  oldGzipSize?: number;
  newGzipSize?: number;
  diffGzipSize?: number;
};
const getStatsTest = (statsOld: Stats[], statsNew: Stats[]): StatsTest[] => {
  return statsOld
    .filter((statOld) => !statsNew.find((statNew) => statOld['name'] === statNew['name']))
    .concat(statsNew)
    .map(({ name }) => {
      const statsOldFiltered = statsOld.filter((i) => i.name === name)[0] || {}; // || {} handles case when icon was added
      const statsNewFiltered = statsNew.filter((i) => i.name === name)[0] || {}; // || {} handles case when icon was removed

      const oldSize = statsOldFiltered.size;
      const newSize = statsNewFiltered.size;
      const diffSize = newSize - oldSize;
      const oldGzipSize = statsOldFiltered.gzipSize;
      const newGzipSize = statsNewFiltered.gzipSize;
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

const statsTest = getStatsTest(statsOld, statsNew);

describe.each(statsTest)('chunk size for svgo optimized "$name" icon [diff: $diffSize bytes]', ({ diffSize }) => {
  test('should roughly stay the same', () => {
    const allowedSizeChange = 100;
    expect(diffSize).toBeLessThanOrEqual(allowedSizeChange);
    expect(diffSize).toBeGreaterThanOrEqual(-allowedSizeChange);
  });
});
