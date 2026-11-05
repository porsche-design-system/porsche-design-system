import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

type SignalFormsModel = {
  checkbox: boolean;
  inputDate: string;
  inputEmail: string;
  inputEmailWithPattern: string;
  inputMonth: string;
  inputNumber: number | null;
  inputNumberText: string;
  inputPassword: string;
  inputSearch: string;
  inputTel: string;
  inputText: string;
  inputTime: string;
  inputUrl: string;
  inputWeek: string;
  multiSelect: string[];
  pinCode: string;
  radioGroup: string;
  segmentedControl: string;
  select: string;
  textarea: string;
};

@Component({
  selector: 'page-signal-forms-example',
  template: `
    <form id="all-components">
      <p-checkbox [formField]="form.checkbox" [label]="'Checkbox'" />
      <p-input-date [formField]="form.inputDate" [label]="'Input Date'" />
      <p-input-email [formField]="form.inputEmail" [label]="'Input Email'" />
      <p-input-month [formField]="form.inputMonth" [label]="'Input Month'" />
      <p-input-number [formField]="form.inputNumber" [label]="'Input Number'" />
      <p-input-number [formField]="form.inputNumberText" [label]="'Input Number with a text value'" />
      <p-input-password [formField]="form.inputPassword" [label]="'Input Password'" />
      <p-input-search [formField]="form.inputSearch" [label]="'Input Search'" />
      <p-input-tel [formField]="form.inputTel" [label]="'Input Tel'" />
      <p-input-text [formField]="form.inputText" [label]="'Input Text'" />
      <p-input-time [formField]="form.inputTime" [label]="'Input Time'" />
      <p-input-url [formField]="form.inputUrl" [label]="'Input Url'" />
      <p-input-week [formField]="form.inputWeek" [label]="'Input Week'" />
      <p-multi-select [formField]="form.multiSelect" [label]="'Multi Select'">
        <p-multi-select-option value="a">Option A</p-multi-select-option>
        <p-multi-select-option value="b">Option B</p-multi-select-option>
      </p-multi-select>
      <p-pin-code [formField]="form.pinCode" [label]="'Pin Code'" />
      <p-radio-group [formField]="form.radioGroup" [label]="'Radio Group'">
        <p-radio-group-option label="Option A" value="a"></p-radio-group-option>
        <p-radio-group-option label="Option B" value="b"></p-radio-group-option>
      </p-radio-group>
      <p-segmented-control [formField]="form.segmentedControl" [label]="'Segmented Control'">
        <p-segmented-control-item value="a">Option A</p-segmented-control-item>
        <p-segmented-control-item value="b">Option B</p-segmented-control-item>
      </p-segmented-control>
      <p-select [formField]="form.select" [label]="'Select'">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
      </p-select>
      <p-textarea [formField]="form.textarea" [label]="'Textarea'" />
    </form>

    <form id="pattern-binding">
      <p-input-email
        [formField]="form.inputEmailWithPattern"
        [pattern]="'.+@porsche[.]de'"
        [label]="'Input Email with a pattern'"
      />
    </form>

    <pre data-field="model">{{ model() | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormField, JsonPipe],
})
export class SignalFormsExampleComponent {
  model = signal<SignalFormsModel>({
    checkbox: false,
    inputDate: '',
    inputEmail: 'example@mail.com',
    inputEmailWithPattern: 'example@porsche.de',
    inputMonth: '',
    inputNumber: null,
    inputNumberText: '',
    inputPassword: '',
    inputSearch: '',
    inputTel: '+4971191125',
    inputText: '',
    inputTime: '',
    inputUrl: 'https://example.com',
    inputWeek: '',
    multiSelect: [],
    pinCode: '',
    radioGroup: '',
    segmentedControl: '',
    select: '',
    textarea: '',
  });

  form = form(this.model, (path) => {
    min(path.inputNumber, 1);
    max(path.inputNumber, 10);
  });
}
