const TRACKING_BASE_URL = 'https://cdn.ui.porsche.com/porsche-design-system/tracking';

export const trackEvent = (component: string, event?: string) => {
  console.log('trackEvent', component, event);
  fetch(`${TRACKING_BASE_URL}?${queryString({ component, event })}`).then(console.log);
};

export const trackLoader = () => trackEvent('loader', 'init');

type HttpQuery = Partial<{ [key: string]: string | number | null | boolean | Array<string | number | null | boolean> }>;

const queryString = (params: HttpQuery): string =>
  Object.entries(params)
    .map(([key, value]) =>
      value instanceof Array
        ? value.map((val) => `${encodeURI(key)}=${encodeURI(val)}`).join('&')
        : `${encodeURI(key)}=${encodeURI(value)}`
    )
    .join('&');

export const encodeURI = (value: any) => encodeURIComponent(String(value));
