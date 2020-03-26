import { validateContent } from './icon-validation';

export const iconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

export const getSvgContent = (url: string): Promise<string> => {
  // see if we already have a request for this url
  let req = requests.get(url);

  if (!req) { // eslint-disable-line @typescript-eslint/no-misused-promises
    // we don't already have a request
    req = fetch(url).then(rsp => {
      if (rsp.ok) {
        return rsp.text().then(svgContent => {
          iconContent.set(url, validateContent(svgContent));
        });
      }
      iconContent.set(url, '');
    });

    // cache for the same requests
    requests.set(url, req);
  }

  return req;
};
