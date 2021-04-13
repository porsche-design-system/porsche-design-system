const zlib = require('zlib');
const stream = require('stream');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const SOURCE_BUCKET = 'porsche-design-system-logs';
const DESTINATION_BUCKET = 'porsche-design-system-athena';

const renameAndReorganizeLogFile = async (filePath) => {
  if (!filePath.endsWith('.anonymized.gz')) {
    const fileName = filePath.substr(filePath.indexOf('/') + 1);
    let fileDate = fileName.substr(fileName.indexOf('.') + 1);
    fileDate = fileDate.substr(0, fileDate.indexOf('.'));
    fileDate = fileDate.substr(0, fileDate.lastIndexOf('-'));
    const [year, month, day] = fileDate.split('-');

    const targetFilePath = 'tracking-data/' + year + '/' + month + '/' + day + '/' + fileName;

    await anonymizeAndUploadLogFile(filePath, targetFilePath);

    console.log('copied file', fileName);
  }
};

function anonymizeIPv4Address(str) {
  const s = str.split('.');
  s[3] = '0';
  return s.join('.');
}

function anonymizeIPv6Address(str) {
  const s = str.split(':').slice(0, 2);
  s.push(':');
  return s.join(':');
}

function anonymizeIpAddress(str) {
  if (str === '-' || str === 'unknown') {
    return str;
  } else if (str.includes('.')) {
    return anonymizeIPv4Address(str);
  } else if (str.includes(':')) {
    return anonymizeIPv6Address(str);
  } else {
    throw new Error('Neither IPv4 nor IPv6: ' + str);
  }
}

function transformLine(line) {
  if (line.startsWith('#') || line.trim() === '') {
    return line;
  }
  const values = line.split('\t');
  values[4] = anonymizeIpAddress(values[4]);
  values[19] = anonymizeIpAddress(values[19]);
  return values.join('\t');
}

async function anonymizeAndUploadLogFile(sourceFilePath, targetFilePath) {
  let chunk = Buffer.alloc(0);

  const transform = (currentChunk, encoding, callback) => {
    chunk = Buffer.concat([chunk, currentChunk]);
    const lines = [];
    while (chunk.length > 0) {
      const i = chunk.indexOf('\n', 'utf8');
      if (i === -1) {
        break;
      } else {
        lines.push(chunk.slice(0, i).toString('utf8'));
        chunk = chunk.slice(i + 1);
      }
    }
    lines.push('');
    const transformed = lines.map(transformLine).join('\n');
    callback(null, Buffer.from(transformed, 'utf8'));
  };

  const params = {
    Bucket: SOURCE_BUCKET,
    Key: sourceFilePath,
  };

  const body = s3
    .getObject(params)
    .createReadStream()
    .pipe(zlib.createGunzip())
    .pipe(new stream.Transform({ transform }))
    .pipe(zlib.createGzip());

  await s3
    .upload({
      Bucket: DESTINATION_BUCKET,
      Key: targetFilePath.slice(0, -2) + 'anonymized.gz',
      Body: body,
    })
    .promise();

  if (chunk.length > 0) {
    throw new Error('file was not read completely');
  }
}

module.exports.renameAndReorganizeLogFile = renameAndReorganizeLogFile;
