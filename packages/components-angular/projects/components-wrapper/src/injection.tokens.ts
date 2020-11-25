import { InjectionToken } from '@angular/core';

export const PREVENT_WEB_COMPONENTS_REGISTRATION = new InjectionToken<boolean>(
  'Prevent registration of web components',
  {
    providedIn: 'root',
    factory: () => false,
  }
);

export const WEB_COMPONENTS_PREFIX = new InjectionToken<string>('Custom unique prefix for the web components', {
  providedIn: 'root',
  factory: () => '',
});
