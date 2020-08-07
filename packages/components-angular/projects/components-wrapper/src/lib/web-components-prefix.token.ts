import { InjectionToken } from '@angular/core';

export const WEB_COMPONENTS_PREFIX = new InjectionToken<string>('Custom unique prefix for the web components', {
  providedIn: 'root',
  factory: () => ''
});
