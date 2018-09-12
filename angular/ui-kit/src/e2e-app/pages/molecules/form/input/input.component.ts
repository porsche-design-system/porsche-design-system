import { Component } from '@angular/core';
import { PuiIcon } from '../../../../../lib/atoms/icon';

@Component({
  selector: 'pui-e2e-molecules-form-input',
  templateUrl: './input.component.html'
})
export class PuiE2eMoleculesFormInputComponent {
  carNextIcon: PuiIcon = PuiIcon.ADD_USER;
  value = 'some value';
}

