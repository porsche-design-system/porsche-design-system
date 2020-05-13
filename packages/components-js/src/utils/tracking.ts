const TRACKING_BASE_URL = 'https://cdn.ui.porsche.com/porsche-design-system/tracking';

export const trackEvent = (component: string, event?: string): void => {
  fetch(`${TRACKING_BASE_URL}?${queryString({ component, event })}`).catch(console.warn);
};

export const trackLoader = (): void => trackEvent('loader', 'init');

type StringNumberNullBooleanTupel = string | number | null | boolean;

interface HttpQuery {
  [key: string]: StringNumberNullBooleanTupel | StringNumberNullBooleanTupel[];
}

const queryString = (params: HttpQuery): string =>
  Object.entries(params)
    .map(([key, value]) =>
      value instanceof Array
        ? value.map((val) => `${encodeURI(key)}=${encodeURI(val)}`).join('&')
        : `${encodeURI(key)}=${encodeURI(value)}`
    )
    .join('&');

export const encodeURI = (value: StringNumberNullBooleanTupel): string => encodeURIComponent(String(value));
