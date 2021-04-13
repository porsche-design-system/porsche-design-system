const aws = require('aws-sdk');
const AthenaExpress = require('athena-express');

const awsCredentials = {
  region: 'eu-central-1',
};
aws.config.update(awsCredentials);

const athenaExpressConfig = { aws };
const athenaExpress = new AthenaExpress(athenaExpressConfig);

const addPartition = async (year, month, day) => {
  const query = `ALTER TABLE s3_athena.tracking_data ADD PARTITION (year='${year}', month='${month}', day='${day}', dt='${year}-${month}-${day}') location 's3://porsche-design-system-athena/tracking-data/${year}/${month}/${day}/'`;

  await athenaExpress
    .query(query)
    .then((data) => {
      console.log('Added partition', year, month, day, `${year}/${month}/${day}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.addPartition = addPartition;
