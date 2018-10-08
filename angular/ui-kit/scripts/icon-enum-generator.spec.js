const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const path = require('path');

describe('Icon Enum Generator', () => {
  it('should generate the ts enum from scss source', async () => {
    const inputFixture = path.resolve(__dirname, 'fixtures/icon-enum-generator.fixture.scss');
    const resultFixture = path.resolve(__dirname, 'fixtures/icon-enum-generator-enum.fixture.ts');
    const expectedResult = await readFile(resultFixture, 'utf-8');
    const iconEnumGenerator = path.resolve(__dirname, 'icon-enum-generator.js');
    const { stdout } = await exec(`cat ${inputFixture} | node ${iconEnumGenerator}`);
    expect(stdout).toBe(expectedResult);
  })
});
