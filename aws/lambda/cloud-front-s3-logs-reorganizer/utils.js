const reorganizeLogFile = async (filePath) => {
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

    console.log('copied file', fileName);
  }
};

module.exports.reorganizeLogFile = reorganizeLogFile;
