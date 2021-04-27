'use strict';

exports.handler = (event, context, callback) => {
  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  const { request } = event.Records[0].cf;

  // Extract the URI from the request
  const { uri: oldUri } = request;

  // Is it not a file?
  if (!oldUri.match(/\.[0-9a-z]{1,4}$/i)) {
    // Match any '/' that occurs at the end of a URI. Replace it with a default index
    const newUri = oldUri.replace(/(\/(?:issue|housekeeping|release)\/[\w\d-\.]+|latest|v\d)\/?.*/, '$1/index.html');

    // console.log('Old URI: ', oldUri);
    // console.log('New URI: ', newUri);

    // Replace the received URI with the URI that includes the index page
    request.uri = newUri;
  }

  // Return to CloudFront
  return callback(null, request);
};
