import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  type OnChanges,
  type OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject<void>();
  theme?: Theme;

  constructor(
    cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    @Inject(THEME_TOKEN) themeSubject: BehaviorSubject<Theme>
  ) {
    super(cdr, elementRef);

    themeSubject.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.el.theme = this.theme || theme;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
