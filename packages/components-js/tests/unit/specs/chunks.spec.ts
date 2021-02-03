import * as path from 'path';
import * as fs from 'fs';

describe('chunks', () => {
  const baseDir = path.resolve(path.normalize('./'), 'tests/unit');
  const fixturesDir = path.resolve(baseDir, 'fixtures');
  const resultsDir = path.resolve(baseDir, 'results');
  const statsFileName = 'stats.json';

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
    const statsFile = path.resolve(type === 'fixture' ? fixturesDir : resultsDir, statsFileName);
    const statsFileContent = fs.readFileSync(statsFile, 'utf8');
    return JSON.parse(statsFileContent);
  };

  it('chunk size should roughly stay the same', () => {
    const statsFixture = getStats('fixture');
    const statsResult = getStats('result');

    statsResult.assets.forEach((asset) => {
      console.log(asset.name, asset.size);
    });
  });
});
