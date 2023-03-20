import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  Optional,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocationStrategy } from '@angular/common';

// only angular router support needed
// extend existing wrappers or offer new one or custom directive?
// https://github.com/ionic-team/ionic-framework/blob/main/angular/src/directives/navigation/router-link-delegate.ts
// respect locationStrategy, prevent default
// routerLinkActive, https://angular.io/api/router/Router#isactive

@Component({
  selector: 'page-link-example',
  template: `
    <a [routerLink]="'/'">Link 1 default</a>
    <p-link [href]="'/'">Link 1 default</p-link>
    <p-link [href]="'/'" (click)="onClick($event)">Link 2 click listener</p-link>
    <p-link [routerLink]="'/'">Link 3 routerLink</p-link>
    <p-link [href]="'/'" [routerLink]="'/'">Link 3 routerLink with href</p-link>
    <p-link [href]="'/'" [routerLink]="'/'" (click)="$event.preventDefault()">
      Link 3 routerLink with href and prevent
    </p-link>

    <br />

    <p-link [routerLink]="'/'">Link 4 routerLink</p-link>
    <my-prefix-p-link p-link [routerLink]="'/link-example'">Link 4 routerLink prefixed</my-prefix-p-link>
    <p-link-pure [routerLink]="'/'">Link 4 routerLink</p-link-pure>
    <p-link-pure [routerLink]="'/link-example'">Link 4 routerLink</p-link-pure>
    <p-link-pure [routerLink]="'/'" [fragment]="'top'">Link 5 routerLink with fragment</p-link-pure>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkExampleComponent {
  constructor(private router: Router) {}

  onClick = (e: MouseEvent) => {
    e.preventDefault();
    this.router.navigateByUrl((e.target as any).href);
  };
}

@Directive({
  selector: 'p-link[routerLink],[p-link][routerLink],p-link-pure[routerLink],[p-link-pure][routerLink]',
})
export class RouterLinkDirectiveDelegate implements OnInit, OnChanges {
  constructor(
    private locationStrategy: LocationStrategy,
    private elementRef: ElementRef,
    private router: Router,
    @Optional() private routerLink?: RouterLink
  ) {}

  ngOnInit(): void {
    this.updateHref();
  }

  ngOnChanges(): void {
    this.updateHref();
  }

  private updateHref() {
    if (this.routerLink?.urlTree) {
      const { nativeElement } = this.elementRef;
      nativeElement.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
      nativeElement.active = this.router.isActive(nativeElement.href, {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored',
      });
    }
  }

  @HostListener('click', ['$event'])
  onClick(ev: UIEvent): void {
    /**
     * This prevents the browser from
     * performing a page reload when pressing
     * an Ionic component with routerLink.
     * The page reload interferes with routing
     * and causes ion-back-button to disappear
     * since the local history is wiped on reload.
     */
    ev.preventDefault();
    this.router.navigateByUrl(this.elementRef.nativeElement.href);
  }
}
