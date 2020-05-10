import { InjectionToken } from '@angular/core';

export const PREVENT_WEB_COMPONENTS_REGISTRATION = new InjectionToken<boolean>('Prevent registration of web components', {
  providedIn: 'root',
  factory: () => false
});
