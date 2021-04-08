const { renameAndReorganizeLogFile } = require('./utils');

exports.handler = async (event) => {
  for (const record of event.Records) {
    const { key } = record.s3.object;
    await renameAndReorganizeLogFile(key);
  }
};
