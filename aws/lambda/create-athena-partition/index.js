const aws = require('aws-sdk');
const AthenaExpress = require('athena-express');

const awsCredentials = {
  region: 'eu-central-1',
};
aws.config.update(awsCredentials);

const athenaExpressConfig = { aws };
const athenaExpress = new AthenaExpress(athenaExpressConfig);

exports.handler = async (event) => {
  console.log('Start creating new Athena partition');

  const query = `ALTER TABLE s3_athena.tracking_data ADD PARTITION (year='2020', month='12', day='31', dt='2020-12-31') location 's3://porsche-design-system-athena/tracking-data/2020/12/31/'`;

  athenaExpress
    .query(query)
    .then((data) => {
      console.log('Data:', data);
    })
    .catch((err) => {
      console.log('Error:', err);
    });

  console.log('Finished creating new Athena partition');
};
