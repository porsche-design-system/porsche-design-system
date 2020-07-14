import { version } from '../../package.json';

const TRACKING_URL = 'https://aws.designsystem.porsche.com/porsche-design-system.png';

export const trackEvent = (component: string, event?: string): void => {
  if (ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test') {
    fetch(
      `${TRACKING_URL}?${queryString({
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

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
