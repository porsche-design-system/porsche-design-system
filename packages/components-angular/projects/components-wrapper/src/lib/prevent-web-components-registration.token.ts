import { InjectionToken } from '@angular/core';

export const PreventWebComponentsRegistration = new InjectionToken<boolean>('Prevent registration of web components', {
  providedIn: 'root',
  factory: () => false
});
