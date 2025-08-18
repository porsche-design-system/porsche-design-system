// TODO: might be provided by @porsche-design-system/shared
export type StatsDiff = {
  name: string;
  oldSize: number;
  newSize: number;
  diffSize: number;
  oldGzipSize: number;
  newGzipSize: number;
  diffGzipSize: number;
};
export const logStatsDiffAsTable = (statsDiff: StatsDiff[]): void => {
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
    name,
    oldSize,
    newSize,
    diffSize,
    oldGzipSize,
    newGzipSize,
    diffGzipSize,
  }: StatsDiff): string =>
    [
      formatFirstCol(name),
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
    'name',
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

  const tableBody = statsDiff.map(formatTable).join('\n');

  const totalStats: StatsDiff = statsDiff.reduce(
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
      name: 'total',
      oldSize: 0,
      newSize: 0,
      diffSize: 0,
      oldGzipSize: 0,
      newGzipSize: 0,
      diffGzipSize: 0,
    } as StatsDiff
  );

  const tableFooter = [
    Array.from(Array(9)).map((_, idx) => (idx === 0 ? formatFirstCol('', '-') : formatNumberCol('', '-'))),
    [totalStats].map(formatTable),
  ]
    .map((arr) => arr.join(''))
    .join('\n');

  const output = ['', `Summary for ${statsDiff.length} chunks`, '', tableHead, tableBody, tableFooter].join('\n');
  console.log(output);
};
