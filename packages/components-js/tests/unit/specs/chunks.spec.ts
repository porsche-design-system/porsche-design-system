import * as gzipSize from 'gzip-size';
import * as path from 'path';
import * as fs from 'fs';
import { COMPONENT_CHUNKS_MANIFEST, ComponentChunkName } from '../../../projects/components-wrapper';
import { colorExternal } from '@porsche-design-system/components-js/utilities/js';
import { SKELETONS_ACTIVE, TAG_NAMES } from '@porsche-design-system/shared';

const indexJsFile = require.resolve('@porsche-design-system/components-js');
const { version } = JSON.parse(fs.readFileSync(path.resolve(indexJsFile, '../package.json'), 'utf8')) as {
  version: string;
};
const chunkDir = path.resolve(indexJsFile, '../../components');
const chunkFileNames: string[] = Object.values(COMPONENT_CHUNKS_MANIFEST);
const chunkFiles = [indexJsFile].concat(chunkFileNames.map((chunkFileName) => path.resolve(chunkDir, chunkFileName)));

const getChunkContent = (chunkFileName: string): string => {
  const chunkFile = chunkFiles.find((x) => x.includes(chunkFileName));
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
        // change should be less than 300 Bytes with skeletons, otherwise 100 Bytes
        const allowedSizeChange = SKELETONS_ACTIVE ? 300 : 100;
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

    const output = ['', `Summary for ${statsResults.length} chunks`, '', tableHead, tableBody, tableFooter].join('\n');
    console.log(output);
  });
});

describe('chunk content', () => {
  /** core chunk is identified by version in file name */
  const isCoreChunk = (chunkFileName: string): boolean => chunkFileName.includes(version);

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

  describe('localhost', () => {
    it('should not contain localhost in web components manager', () => {
      const content = getChunkContent('index.js');
      expect(content).not.toContain('localhost');
    });

    it.each(chunkFileNames)('should not contain localhost in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toContain('localhost');
    });
  });

  describe('css inset property', () => {
    it.each(chunkFileNames)('should not contain css inset property in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toContain('inset:');
    });
  });

  describe('ResizeObserver', () => {
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
  });

  describe('--p-override', () => {
    it.each(chunkFileNames)('should not contain "--p-override" css variables in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toContain('--p-override');
    });
  });

  describe('lowercase webkit jss property', () => {
    it.each(chunkFileNames)('should not contain lowercase webkit jss property in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect((content.match(/webkit[A-Z][a-z]+/) || []).length).toBe(0);
    });
  });

  describe('hex colors', () => {
    const hexColorRegEx = /#[a-f\d]{3,6}/;
    const componentsWithHexColors: ComponentChunkName[] = [
      'link-social',
      'select-wrapper',
      'text-field-wrapper',
      'textarea-wrapper',
    ];

    const containsHexColor = (chunkFileName: string): boolean =>
      componentsWithHexColors.some((x) => chunkFileName.includes(x));

    describe('core chunk', () => {
      const content = getChunkContent(chunkFileNames[0]);

      it('should contain hex colors', () => {
        expect(content).toMatch(hexColorRegEx);
      });

      it('should not contain social hex colors', () => {
        expect(content).not.toMatch(colorExternal.facebook);
      });
    });

    describe('link-social chunk', () => {
      const content = getChunkContent(chunkFileNames.find((x) => x.includes('link-social')));

      it('should contain social hex colors', () => {
        expect(content).toMatch(colorExternal.facebook);
      });
    });

    it.each(chunkFileNames.filter((x) => !isCoreChunk(x) && !containsHexColor(x)))(
      'should not contain hex colors in %s',
      (chunkFileName) => {
        const content = getChunkContent(chunkFileName);
        expect(content).not.toMatch(hexColorRegEx);
      }
    );

    it.each(chunkFileNames.filter((x) => !isCoreChunk(x) && containsHexColor(x)))(
      'should contain single hex color in %s',
      (chunkFileName) => {
        const content = getChunkContent(chunkFileName);
        expect(content).toMatch(hexColorRegEx);
        expect(content.match(hexColorRegEx).length).toBe(1);
      }
    );
  });

  describe('getPrefixedTagNames', () => {
    const getPrefixedTagNamesRegEx = /new Map.+?\.filter\(\(([a-z])=>["']p-text["']!==\1&&["']p-headline["']!==\1\)/;

    it('should be in core chunk', () => {
      const content = getChunkContent(chunkFileNames[0]);
      expect(content).toMatch(getPrefixedTagNamesRegEx);
    });

    it.each(chunkFileNames.filter((x) => !isCoreChunk(x)))('should not be in %s', (chunkFileName) => {
      const content = getChunkContent(chunkFileName);
      expect(content).not.toMatch(getPrefixedTagNamesRegEx);
    });
  });

  describe('TAG_NAMES', () => {
    const tagNamesRegEx = new RegExp(TAG_NAMES.map((x) => `["']${x}["']`).join(','));

    it('should contain all TAG_NAMES in core chunk', () => {
      const content = getChunkContent(chunkFileNames[0]);
      expect(content).toMatch(tagNamesRegEx);
    });

    it.each(chunkFileNames.filter((x) => !isCoreChunk(x)))(
      'should not contain all TAG_NAMES in %s',
      (chunkFileName) => {
        const content = getChunkContent(chunkFileName);
        expect(content).not.toMatch(tagNamesRegEx);
      }
    );
  });
});
