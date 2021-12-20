import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-textarea-wrapper',
  template: `
    <div class="playground light" title="should render with label">
      <p-textarea-wrapper [label]="'Label'">
        <textarea></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with label and placeholder">
      <p-textarea-wrapper [label]="'Label with placeholder'">
        <textarea placeholder="Some placeholder"></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with label, description and placeholder">
      <p-textarea-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'">
        <textarea placeholder="Some placeholder"></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render without label and without description">
      <p-textarea-wrapper [label]="'Label'" [description]="'Some description'" [hideLabel]="true">
        <textarea>Without label and description</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with responsive label and description">
      <p-textarea-wrapper
        [label]="'Label'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <textarea>Responsive label and description</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render in required state">
      <p-textarea-wrapper [label]="'Required'">
        <textarea required></textarea>
      </p-textarea-wrapper>
      <p-textarea-wrapper [label]="'Required and insanely super long label across multiple lines'">
        <textarea required></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-textarea-wrapper [label]="'Disabled'" [description]="'Some description'">
        <textarea disabled></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with placeholder in disabled state">
      <p-textarea-wrapper [label]="'Disabled placeholder'">
        <textarea disabled placeholder="Some placeholder"></textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render in readonly state">
      <p-textarea-wrapper [label]="'Readonly'">
        <textarea readonly>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with counter">
      <p-textarea-wrapper [label]="'Counter'">
        <textarea maxlength="200">Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-textarea-wrapper [label]="'Error with message'" [state]="'error'" [message]="'Error message'">
        <textarea>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-textarea-wrapper [label]="'Error without message'" [state]="'error'">
        <textarea>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-textarea-wrapper [label]="'Success with message'" [state]="'success'" [message]="'Success message'">
        <textarea>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-textarea-wrapper [label]="'Success without message'" [state]="'success'">
        <textarea>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-textarea-wrapper
        [label]="'Default without message'"
        [state]="'none'"
        [message]="'this message should be hidden'"
      >
        <textarea>Some value</textarea>
      </p-textarea-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with error state"
    >
      <p-textarea-wrapper [state]="'error'">
        <span slot="label">Slotted error label with a <a href="#">link</a></span>
        <span slot="description">Slotted description with a <a href="#">link</a></span>
        <textarea>Some value</textarea>
        <span slot="message">Slotted message with a <a href="#">link</a></span>
      </p-textarea-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-textarea-wrapper [state]="'success'">
        <span slot="label">Slotted success label with a <a href="#">link</a></span>
        <span slot="description">Slotted description with a <a href="#">link</a></span>
        <textarea>Some value</textarea>
        <span slot="message">Slotted message with a <a href="#">link</a></span>
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with multiline label, description, message and text">
      <p-textarea-wrapper
        [label]="'Multiline label lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="
          'Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'
        "
        [state]="'error'"
        [message]="'Multiline message at vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px;"
      >
        <textarea>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,</textarea
        >
      </p-textarea-wrapper>
    </div>

    <div class="playground light" title="should render with label and multiline text">
      <p-textarea-wrapper [label]="'Multiline text'">
        <textarea>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,</textarea
        >
      </p-textarea-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaWrapperComponent {}
