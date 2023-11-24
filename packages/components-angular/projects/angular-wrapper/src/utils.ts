import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  InjectionToken,
  type OnChanges,
  type OnDestroy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Theme } from './lib/types';

export const THEME_TOKEN = new InjectionToken<BehaviorSubject<Theme>>('pdsTheme');

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseComponent implements OnChanges {
  protected el: HTMLElement;

  constructor(cdr: ChangeDetectorRef, elementRef: ElementRef) {
    cdr.detach();
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(props: Record<string, { previousValue: any; currentValue: any; firstChange: boolean }>): void {
    for (const prop in props) {
      this.el[prop] = props[prop].currentValue;
    }
  }
}

@Component({
  template: '',
})
export abstract class BaseComponentWithTheme extends BaseComponent implements OnDestroy {
  protected declare el: HTMLElement & { theme: Theme };
  private themeSubscription = inject(THEME_TOKEN).subscribe((theme) => {
    this.el.theme = this.theme || theme;
  });
  theme?: Theme;

  ngOnDestroy(): void {
    // need to manually unsubscribe or otherwise subscription is still active even after unmount
    // https://rafaelneto.dev/en/blog/unsubscribing-behaviorsubject-observable-angular/
    this.themeSubscription.unsubscribe();
  }
}
