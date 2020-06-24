import { Injectable } from '@angular/core';
import { load } from '@porsche-design-system/components-pwcm';

@Injectable({
  providedIn: 'root'
})
export class PrefixService {
  load(prefix: string = '') {
    load(prefix);
  }
}
