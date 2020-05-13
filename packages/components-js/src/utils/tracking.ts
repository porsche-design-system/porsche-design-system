const TRACKING_BASE_URL = 'https://cdn.ui.porsche.com/porsche-design-system/tracking';

export const trackEvent = (component: string, event?: string): void => {
  if (process.env.NODE_ENV === 'production') {
    fetch(`${TRACKING_BASE_URL}?${queryString({ component, event })}`).catch(console.warn);
  }
};

export const trackLoader = (): void => trackEvent('loader', 'init');

type StringNumberNullBooleanTuple = string | number | null | boolean;

interface HttpQuery {
  [key: string]: StringNumberNullBooleanTuple | StringNumberNullBooleanTuple[];
}

const queryString = (params: HttpQuery): string =>
  Object.entries(params)
    .map(([key, value]) =>
      value instanceof Array
        ? value.map((val) => `${encodeURI(key)}=${encodeURI(val)}`).join('&')
        : `${encodeURI(key)}=${encodeURI(value)}`
    )
    .join('&');

export const encodeURI = (value: StringNumberNullBooleanTuple): string => encodeURIComponent(`${value}`);
