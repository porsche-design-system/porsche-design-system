'use strict';

exports.handler = (event, context, callback) => {
  //Get contents of response
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  //Set new headers
  //headers['x-test'] = [{key: 'test', value: 'x'}];

  delete headers['etag'];
  delete headers['server'];
  //delete headers['via']; // seems to have any effect

  delete headers['x-amz-id-2'];
  delete headers['x-amz-request-id'];
  delete headers['x-amz-version-id'];
  delete headers['last-modified'];
  delete headers['x-amz-meta-last-modified'];
  delete headers['vary'];

  //Return modified response
  callback(null, response);
};
