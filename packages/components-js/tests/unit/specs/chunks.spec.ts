import * as gzipSize from 'gzip-size';
import * as path from 'path';
import * as fs from 'fs';
import { COMPONENT_CHUNKS_MANIFEST } from '../../../projects/components-wrapper';

describe('chunks', () => {
  const indexJsFile = require.resolve('@porsche-design-system/components-js');
  const { version } = JSON.parse(fs.readFileSync(path.resolve(indexJsFile, '../package.json'), 'utf8')) as {
    version: string;
  };
  const chunkDir = path.resolve(indexJsFile, '../../components');
  const chunkFileNames: string[] = Object.values(COMPONENT_CHUNKS_MANIFEST);
  const chunkFiles = [indexJsFile].concat(chunkFileNames.map((chunkFileName) => path.resolve(chunkDir, chunkFileName)));

  const getChunkContent = (chunkName: string): string => {
    const chunkFile = chunkFiles.find((x) => x.includes(chunkName));
    return fs.readFileSync(chunkFile, 'utf8');
  };

  describe('chunk size', () => {
    const baseDir = path.resolve(path.normalize('./'), 'tests/unit');
    const fixturesDir = path.resolve(baseDir, 'fixtures');
    const resultsDir = path.resolve(baseDir, 'results');
    const rawStatsFileName = 'stats-raw.json';
    const statsFileName = 'stats.json';

    type RawStats = {
      [key: string]: any;
      assets: {
        type: string;
        name: string;
        size: number;
        chunks: string[];
      }[];
    };

    const getRawStats = (): RawStats => {
      const statsFile = path.resolve(resultsDir, rawStatsFileName);
      const statsFileContent = fs.readFileSync(statsFile, 'utf8');
      return JSON.parse(statsFileContent);
    };

    const getFixtureStats = (): FixtureStats[] => {
      const statsFile = path.resolve(fixturesDir, statsFileName);
      const statsFileContent = fs.readFileSync(statsFile, 'utf8');
      return JSON.parse(statsFileContent);
    };

    const writeStatsResults = (stats: FixtureStats[]): void => {
      const statsFile = path.resolve(resultsDir, statsFileName);
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    };

    const fixtureStats = getFixtureStats();
    const rawStatsResult = getRawStats();

    type FixtureStats = {
      chunkShortName: string;
      size: number;
      gzipSize: number;
    };

    type StatsResult = {
      chunkName: string;
      chunkShortName: string;
      oldSize: number;
      newSize: number;
      diffSize: number;
      oldGzipSize?: number;
      newGzipSize: number;
      diffGzipSize?: number;
    };
    const statsResults: StatsResult[] = [];

    rawStatsResult.assets
      .sort((a, b) => a.chunks[0].localeCompare(b.chunks[0])) // sort by shortChunkName
      .forEach((assetResult) => {
        const [chunkShortName] = assetResult.chunks;
        const { name: chunkName, size: newSize } = assetResult;

        const { size: oldSize, gzipSize: oldGzipSize } =
          fixtureStats.find((x) => x.chunkShortName === chunkShortName) || {};
        const newGzipSize = gzipSize.sync(getChunkContent(chunkName));

        const stat: StatsResult = {
          chunkName,
          chunkShortName,
          oldSize,
          newSize,
          diffSize: newSize - oldSize,
          oldGzipSize,
          newGzipSize,
          diffGzipSize: newGzipSize - oldGzipSize,
        };

        statsResults.push(stat);

        it(`chunk size should roughly stay the same for ${stat.chunkName}`, () => {
          // change should be less than 100 Bytes
          const allowedSizeChange = 100;
          expect(stat.diffSize).toBeLessThanOrEqual(allowedSizeChange);
          expect(stat.diffSize).toBeGreaterThanOrEqual(-allowedSizeChange);
        });

        const fixtureResults = statsResults.map<FixtureStats>(({ chunkShortName, newSize, newGzipSize }) => ({
          chunkShortName,
          size: newSize,
          gzipSize: newGzipSize,
        }));
        writeStatsResults(fixtureResults);
      });

    afterAll(() => {
      const formatFirstCol = (content: string, fillString?: string): string => content.padEnd(25, fillString);
      const formatNumberCol = (content: string, fillString?: string): string => content.padStart(12, fillString);
      const getSign = (val: number): string => (val > 0 ? '+' : '');
      const formatKB = (input: number, displaySign?: boolean): string => {
        return `${displaySign ? getSign(input) : ''}${(input / 1024).toFixed(2)} KB`;
      };
      const formatPercent = (oldSize: number, diffSize: number): string => {
        const value = ((diffSize / oldSize) * 100).toFixed(2);
        return `${getSign(parseFloat(value))}${value} %`;
      };

      const formatTable = ({
        chunkShortName,
        oldSize,
        newSize,
        diffSize,
        oldGzipSize,
        newGzipSize,
        diffGzipSize,
      }: StatsResult): string =>
        [
          formatFirstCol(chunkShortName),
          formatNumberCol(`${formatKB(oldSize)}`),
          formatNumberCol(`${formatKB(newSize)}`),
          formatNumberCol(`${formatKB(diffSize, true)}`),
          formatNumberCol(`${formatPercent(oldSize, diffSize)}`),
          formatNumberCol(`${formatKB(oldGzipSize)}`),
          formatNumberCol(`${formatKB(newGzipSize)}`),
          formatNumberCol(`${formatKB(diffGzipSize, true)}`),
          formatNumberCol(`${formatPercent(oldGzipSize, diffGzipSize)}`),
        ].join('');

      const header = [
        'chunkName',
        'oldSize',
        'newSize',
        'diffSize',
        'diff %',
        'oldGzipSize',
        'newGzipSize',
        'diffGzip',
        'diff %',
      ];

      const tableHead = [
        header.map((x, idx) => (idx === 0 ? formatFirstCol(x) : formatNumberCol(x))),
        Array.from(Array(9)).map((_, idx) => (idx === 0 ? formatFirstCol('', '-') : formatNumberCol('', '-'))),
      ]
        .map((arr) => arr.join(''))
        .join('\n');

      const tableBody = statsResults.map(formatTable).join('\n');

      const totalStats: StatsResult = statsResults.reduce(
        (pv, { oldSize, newSize, diffSize, oldGzipSize, newGzipSize, diffGzipSize }) => {
          pv.oldSize += oldSize;
          pv.newSize += newSize;
          pv.diffSize += diffSize;
          pv.oldGzipSize += oldGzipSize;
          pv.newGzipSize += newGzipSize;
          pv.diffGzipSize += diffGzipSize;
          return pv;
        },
        {
          chunkShortName: 'total',
          oldSize: 0,
          newSize: 0,
          diffSize: 0,
          oldGzipSize: 0,
          newGzipSize: 0,
          diffGzipSize: 0,
        } as StatsResult
      );

      const tableFooter = [
        Array.from(Array(9)).map((_, idx) => (idx === 0 ? formatFirstCol('', '-') : formatNumberCol('', '-'))),
        [totalStats].map(formatTable),
      ]
        .map((arr) => arr.join(''))
        .join('\n');

      const output = ['', `Summary for ${statsResults.length} chunks`, '', tableHead, tableBody, tableFooter].join(
        '\n'
      );
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

    it.each(chunkFileNames)('should not contain localhost in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toContain('localhost');
    });

    it.each(chunkFileNames)('should not contain css inset property in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);

      // core chunk is identified by version in name
      if (chunkFileName.includes(version)) {
        // including inset: exactly once is okay because of JSS default units
        // https://github.com/cssinjs/jss/blob/dbef5de51eaa7e59a05ff7eeb099e9c6fcc94fa5/packages/jss-plugin-default-unit/src/defaultUnits.js#L98
        expect(content.match(/inset:/).length).toBe(1);
      } else {
        expect(content).not.toContain('inset:');
      }
    });

    it.each(chunkFileNames.filter((x) => !x.includes('accordion')))(
      'should not contain ResizeObserver in %s',
      (chunkFileName) => {
        const content = getChunkContent(chunkFileName);
        expect(content).not.toContain('ResizeObserver');
      }
    );

    it.each(chunkFileNames.filter((x) => x.includes('accordion')))(
      'should contain ResizeObserver in %s',
      (chunkFileName) => {
        const content = getChunkContent(chunkFileName);
        expect(content).toContain('ResizeObserver');
      }
    );

    // TODO: enable this test once css variables are gone in prod build
    // it.each(chunkFileNames)(
    //   'should not contain "--p-override" css variables in %s',
    //   (chunkFileName) => {
    //     const content = getChunkContent(chunkFileName);
    //     expect(content).not.toContain('--p-');
    //   }
    // );

    it.each(chunkFileNames)('should not contain "--p-override" css variables in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toContain('--p-override');
    });

    // TODO: enable this test once chunking is under control
    // it.each(chunkFileNames)('should not contain all TAG_NAMES in %s', (chunkFileName) => {
    //   const content = getChunkContent(chunkFileName);
    //   const tagNamesSingleQuotes = TAG_NAMES.map((x) => `'${x}'`).join(',');
    //   const tagNamesDoubleQuotes = TAG_NAMES.map((x) => `"${x}"`).join(',');
    //   expect(content).not.toContain(tagNamesSingleQuotes, 'with single quotes');
    //   expect(content).not.toContain(tagNamesDoubleQuotes, 'with double quotes');
    // });
  });
});
