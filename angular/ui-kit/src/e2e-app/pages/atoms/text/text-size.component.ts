import {Component} from '@angular/core';

@Component({
  selector: 'pui-e2e-atoms-text-size',
  templateUrl: './text-size.component.html'
})
export class PuiE2eAtomsTextSizeComponent {
  thinComponent = true;
  thinDirective = true;

  toggleComponent() {
    this.thinComponent = !this.thinComponent;
  }
  toggleDirective() {
    this.thinDirective = !this.thinDirective;
  }
}
