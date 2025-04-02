import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-hidden-attribute-example',
  template: `
    <p-select name="options" label="Some Label" value="a">
      <p-select-option title="visible" value="a"> Option should be visible (no hidden attribute) </p-select-option>
      <p-select-option title="hidden" value="b" hidden>
        Option shouldn't be visible (hidden attribute without value)
      </p-select-option>
      <p-select-option title="hidden" value="c" [hidden]="true">
        Option shouldn't be visible (hidden attribute with boolean true)
      </p-select-option>
      <p-select-option title="visible" value="d" [hidden]="false">
        Option should be visible (hidden attribute with boolean false)
      </p-select-option>
    </p-select>

    <p-button title="visible" name="option" value="A" type="submit">
      Button should be visible (no hidden attribute)
    </p-button>
    <p-button title="hidden" name="option" value="A" type="submit" hidden>
      Button shouldn't be visible (hidden attribute without value)
    </p-button>
    <p-button title="hidden" name="option" value="B" type="submit" [hidden]="true">
      Button shouldn't be visible (hidden attribute with boolean true)
    </p-button>
    <p-button title="visible" name="option" value="B" type="submit" [hidden]="false">
      Button should visible (hidden attribute with boolean false)
    </p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class HiddenAttributeExampleComponent {}
