const { addPartition } = require('./utils');

exports.handler = async (event) => {
  console.log('Start creating new Athena partition');

  for (const record of event.Records) {
    const { key } = record.s3.object;
    const fileName = key.substr(key.indexOf('/') + 1);
    let fileDate = fileName.substr(fileName.indexOf('.') + 1);
    fileDate = fileDate.substr(0, fileDate.indexOf('.'));
    fileDate = fileDate.substr(0, fileDate.lastIndexOf('-'));

    const [year, month, day] = fileDate.split('-');

    await addPartition(year, month, day);
  }

  console.log('Finished creating new Athena partition');
};
