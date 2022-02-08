const generateAthenaPartitionQueries = (): void => {
  const queries: string[] = [];

  const now = new Date();
  while (now.getUTCFullYear() !== 2021) {
    const year = now.getUTCFullYear();
    const monthRaw = now.getUTCMonth() + 1;
    const month = monthRaw < 10 ? `0${monthRaw}` : monthRaw;
    const dayRaw = now.getUTCDate();
    const day = dayRaw < 10 ? `0${dayRaw}` : dayRaw;

    queries.push(
      `ALTER TABLE s3_athena.tracking_data ADD PARTITION (year='${year}', month='${month}', day='${day}', dt='${year}-${month}-${day}') location 's3://porsche-design-system-athena/tracking-data/${year}/${month}/${day}/'`
    );
    now.setDate(now.getDate() - 1);
  }

  console.log(queries.join('\n'));
};

generateAthenaPartitionQueries();
