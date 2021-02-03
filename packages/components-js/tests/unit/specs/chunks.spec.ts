import * as path from 'path';
import * as fs from 'fs';

describe('chunks', () => {
  const baseDir = path.resolve(path.normalize('./'), 'tests/unit');
  const fixturesDir = path.resolve(baseDir, 'fixtures');
  const resultsDir = path.resolve(baseDir, 'results');
  const statsFileName = 'stats.json';

  type StatsResult = {
    chunkName: string;
    oldSize: number;
    newSize: number;
    diffSize: number;
  };
  const statsResults: StatsResult[] = [];

  type Stats = {
    [key: string]: any;
    assets: {
      type: string;
      name: string;
      size: number;
      chunks: string[];
    }[];
  };

  const getStats = (type: 'fixture' | 'result'): Stats => {
    const statsDir = type === 'fixture' ? fixturesDir : resultsDir;
    const statsFile = path.resolve(statsDir, statsFileName);
    const statsFileContent = fs.readFileSync(statsFile, 'utf8');
    return JSON.parse(statsFileContent);
  };

  const statsFixture = getStats('fixture');
  const statsResult = getStats('result');

  statsResult.assets
    .sort((a, b) => (a.chunks[0] > b.chunks[0] ? 1 : -1))
    .forEach((assetResult) => {
      const [chunkName] = assetResult.chunks;
      const { size: newSize } = assetResult;

      const assetFixture = statsFixture.assets.find((x) => x.chunks[0] === chunkName);
      const { size: oldSize } = assetFixture;

      const stat: StatsResult = {
        chunkName,
        oldSize,
        newSize,
        diffSize: newSize - oldSize,
      };

      statsResults.push(stat);

      it(`chunk size should roughly stay the same for ${stat.chunkName}`, () => {
        // change should be less than 500 Bytes
        expect(stat.diffSize).toBeLessThanOrEqual(500);
      });
    });

  afterAll(() => {
    const formatFirstCol = (content: string, fillString?: string): string => content.padEnd(25, fillString);
    const formatNumberCol = (content: string, fillString?: string): string => content.padStart(12, fillString);
    const formatKB = (input: number): string => `${(input / 1024).toFixed(2)} KB`;
    const formatDiff = (oldSize: number, diffSize: number): string =>
      `${oldSize < 0 ? '-' : '+'}${(diffSize / oldSize).toFixed(2)} %`;

    const header = ['chunkName', 'oldSize', 'newSize', 'diffSize', 'diff %'];

    const tableHead = [
      header.map((x, idx) => (idx === 0 ? formatFirstCol(x) : formatNumberCol(x))),
      Array.from(Array(5)).map((_, idx) => (idx === 0 ? formatFirstCol('', '-') : formatNumberCol('', '-'))),
    ]
      .map((arr) => arr.join(''))
      .join('\n');

    const tableBody = statsResults
      .map(({ chunkName, oldSize, newSize, diffSize }) =>
        [
          formatFirstCol(chunkName),
          formatNumberCol(`${formatKB(oldSize)}`),
          formatNumberCol(`${formatKB(newSize)}`),
          formatNumberCol(`${formatKB(diffSize)}`),
          formatNumberCol(`${formatDiff(oldSize, diffSize)}`),
        ].join('')
      )
      .join('\n');

    const output = ['', `Summary for ${statsResults.length} chunks`, '', tableHead, tableBody].join('\n');
    console.log(output);
  });
});
