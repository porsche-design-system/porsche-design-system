const fs = require('fs');
const zlib = require('zlib');
const stream = require('stream');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

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
  }
  if (str.includes('.')) {
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

async function process(record) {
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
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key,
  };

  if ('versionId' in record.s3.object) {
    params.VersionId = record.s3.object.versionId;
  }

  const body = s3
    .getObject(params)
    .createReadStream()
    .pipe(zlib.createGunzip())
    .pipe(new stream.Transform({ transform }))
    .pipe(zlib.createGzip());

  await s3
    .upload({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key.slice(0, -2) + 'anonymized.gz',
      Body: body,
    })
    .promise();

  if (chunk.length > 0) {
    throw new Error('file was not read completly');
  }

  return s3.deleteObject(params).promise();
}

exports.handler = async (event) => {
  //console.log(JSON.stringify(event));
  for (let record of event.Records) {
    if (record.s3.object.key.endsWith('.anonymized.gz')) {
      continue;
    } else if (record.s3.object.key.endsWith('.gz')) {
      await process(record);
    }
  }
};
