var http = require('https');

exports.handler = async (event) => {
  const { branch } = event && event.queryStringParameters;
  const url = `https://designsystem.porsche.com/${branch}/version.md`;

  console.log('request', url);
  const result = await httpRequest(url);
  console.log('response', JSON.stringify(result));

  return result;
};

const httpRequest = (url) =>
  new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        try {
          body = Buffer.concat(body).toString().replace(/\s/, '');
        } catch (e) {
          reject(e);
        }
        resolve({
          statusCode: res.statusCode,
          body,
        });
      });
    });

    req.on('error', (e) => {
      reject(e.message);
    });

    // send the request
    req.end();
  });
