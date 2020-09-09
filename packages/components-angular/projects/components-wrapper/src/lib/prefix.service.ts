import { Injectable } from '@angular/core';
import { load, LoadOptions } from '@porsche-design-system/components-js';

@Injectable({
  providedIn: 'root'
})
export class PrefixService {
  load(opts: LoadOptions) {
    load(opts);
  }
}
