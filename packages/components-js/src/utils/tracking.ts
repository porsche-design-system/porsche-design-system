import { version } from '../../package.json';

const TRACKING_BASE_URL = 'https://d3nll2jx8s265d.cloudfront.net/hello.gif';

export const trackEvent = (component: string, event?: string): void => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    fetch(
      `${TRACKING_BASE_URL}?${queryString({
        v: version,
        t: new Date().getTime(), // to prevent caching
        c: component,
        ...(event && { e: event })
      })}`
    ).catch(console.warn);
  }
};

export const trackLoader = (): void => trackEvent('loader', 'init');

type StringNumberNullBooleanTuple = string | number | null | boolean;

type HttpQuery = {
  [key: string]: StringNumberNullBooleanTuple | StringNumberNullBooleanTuple[];
};

const queryString = (params: HttpQuery): string =>
  Object.entries(params)
    .map(([key, value]) =>
      value instanceof Array
        ? value.map((val) => `${encodeURI(key)}=${encodeURI(val)}`).join('&')
        : `${encodeURI(key)}=${encodeURI(value)}`
    )
    .join('&');

export const encodeURI = (value: StringNumberNullBooleanTuple): string => encodeURIComponent(`${value}`);
