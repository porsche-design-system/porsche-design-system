'use strict';

exports.handler = (event, context, callback) => {
  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  const { request } = event.Records[0].cf;
  const { uri } = request;

  const [uriWithoutTrailingSlash] =
    uri.match(/^\/(?:(?:issue|housekeeping|release)\/[\w\d-\.]+|latest|v0\/\w+|v\d)$/) || [];
  if (uriWithoutTrailingSlash) {
    const response = {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [
          {
            key: 'Location',
            value: uriWithoutTrailingSlash + '/',
          },
        ],
      },
    };
    callback(null, response);
  } else {
    callback(null, request);
  }
};
