import * as gzipSize from 'gzip-size';
import * as path from 'path';
import * as fs from 'fs';

describe('chunks', () => {
  const indexJsFile = require.resolve('@porsche-design-system/components-js');
  const distDir = path.resolve(indexJsFile, '../..');
  const chunksDir = path.resolve(distDir, 'components');
  const chunkFileNames = fs.readdirSync(chunksDir); // TODO: use CHUNK_MANIFEST once it's available
  const chunkFiles = [indexJsFile].concat(
    chunkFileNames.map((chunkFileName) => path.resolve(chunksDir, chunkFileName))
  );

  const getChunkContent = (chunkName: string): string => {
    const [chunkFile] = chunkFiles.filter((x) => x.includes(chunkName));
    return fs.readFileSync(chunkFile, 'utf8');
  };

  describe('chunk size', () => {
    const baseDir = path.resolve(path.normalize('./'), 'tests/unit');
    const fixturesDir = path.resolve(baseDir, 'fixtures');
    const resultsDir = path.resolve(baseDir, 'results');
    const statsFileName = 'stats.json';

    type StatsResult = {
      chunkName: string;
      chunkShortName: string;
      oldSize: number;
      newSize: number;
      newGzipSize: number;
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
        const [chunkShortName] = assetResult.chunks;
        const { name: chunkName, size: newSize } = assetResult;

        const assetFixture = statsFixture.assets.find((x) => x.chunks[0] === chunkShortName);
        const { size: oldSize } = assetFixture;

        const stat: StatsResult = {
          chunkName,
          chunkShortName,
          oldSize,
          newSize,
          newGzipSize: gzipSize.sync(getChunkContent(chunkName)),
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
      const getSign = (val: number): string => (val > 0 ? '+' : '');
      const formatKB = (input: number, displaySign?: boolean): string => {
        return `${displaySign ? getSign(input) : ''}${(input / 1024).toFixed(2)} KB`;
      };
      const formatPercent = (oldSize: number, diffSize: number): string => {
        const value = (diffSize / oldSize).toFixed(2);
        return `${getSign(parseFloat(value))}${value} %`;
      };

      const header = ['chunkName', 'oldSize', 'newSize', 'diffSize', 'diff %', 'gzipSize'];

      const tableHead = [
        header.map((x, idx) => (idx === 0 ? formatFirstCol(x) : formatNumberCol(x))),
        Array.from(Array(6)).map((_, idx) => (idx === 0 ? formatFirstCol('', '-') : formatNumberCol('', '-'))),
      ]
        .map((arr) => arr.join(''))
        .join('\n');

      const tableBody = statsResults
        .map(({ chunkShortName, oldSize, newSize, diffSize, newGzipSize }) =>
          [
            formatFirstCol(chunkShortName),
            formatNumberCol(`${formatKB(oldSize)}`),
            formatNumberCol(`${formatKB(newSize)}`),
            formatNumberCol(`${formatKB(diffSize, true)}`),
            formatNumberCol(`${formatPercent(oldSize, diffSize)}`),
            formatNumberCol(`${formatKB(newGzipSize)}`),
          ].join('')
        )
        .join('\n');

      const output = ['', `Summary for ${statsResults.length} chunks`, '', tableHead, tableBody].join('\n');
      console.log(output);
    });
  });

  describe('chunk content', () => {
    it('marque chunk should not contain icon manifest', () => {
      const marqueJsCode = getChunkContent('marque');
      expect(marqueJsCode).not.toContain('/porsche-design-system/icons');
      expect(marqueJsCode).not.toContain('arrowDoubleDown');
    });

    it('icon chunk should not contain marque manifest', () => {
      const iconJsCode = getChunkContent('icon');
      expect(iconJsCode).not.toContain('/porsche-design-system/marque');
      expect(iconJsCode).not.toContain('porscheMarque');
    });

    it('should not contain localhost in web components manager', () => {
      const content = getChunkContent('index.js');
      expect(content).not.toContain('localhost');
    });

    // TODO: use CHUNK_MANIFEST once it's available
    chunkFileNames.forEach((chunkFileName) => {
      it(`should not contain localhost in ${chunkFileName}`, () => {
        const content = getChunkContent(chunkFileName);
        expect(content).not.toContain('localhost');
      });
    });
  });
});
