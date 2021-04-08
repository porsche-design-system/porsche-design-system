const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

async function process() {
  const bucketParams = {
    Bucket: 'porsche-design-system-logs',
    Prefix: 'cloudfront/',
    Marker: 'cloudfront/EN98BRSTE4L4P.2021-04-07-15.fff1862d.anonymized.gz',
    MaxKeys: 1000,
  };

  console.log('listing objects');

  const files = await s3
    .listObjects(bucketParams, function (err, data) {
      if (err) console.log(err, err.stack);
    })
    .promise();

  for (const file of files.Contents) {
    const filePath = file.Key;

    if (filePath.endsWith('.anonymized.gz')) {
      const fileName = filePath.substr(filePath.indexOf('/') + 1);
      let fileDate = fileName.substr(fileName.indexOf('.') + 1);
      fileDate = fileDate.substr(0, fileDate.indexOf('.'));
      fileDate = fileDate.substr(0, fileDate.lastIndexOf('-'));
      const [year, month, day] = fileDate.split('-');

      const params = {
        Bucket: 'porsche-design-system-athena',
        CopySource: 'porsche-design-system-logs/' + filePath,
        Key: 'tracking-data/' + year + '/' + month + '/' + day + '/' + fileName,
      };

      await s3
        .copyObject(params, function (err, data) {
          if (err) console.log(err, err.stack);
        })
        .promise();
      console.log('copied', fileName);
    }
  }

  console.log('finished');
  console.log('next marker', files.Contents[files.Contents.length - 1].Key);
}

exports.handler = async (event) => {
  await process();
};
