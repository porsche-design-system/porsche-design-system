<script lang="ts" setup>
import {
  PButton,
  PButtonPure,
  PButtonTile,
  PCarousel,
  PCheckbox,
  PCheckboxWrapper,
  PLink,
  PLinkPure,
  PLinkSocial,
  PLinkTile,
  PMultiSelect,
  PMultiSelectOption,
  PPinCode,
  PRadioButtonWrapper,
  PSelect,
  PSelectOption,
  PSelectWrapper,
  PSwitch,
  PTextFieldWrapper,
  PTextarea,
  PTextareaWrapper,
} from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="root">
    <div class="playground light" title="should render button-pure with boolean shorthand prop: hideLabel">
      <PButtonPure hideLabel>Some Label</PButtonPure>
    </div>

    <div class="playground light" title="should render button-pure with boolean shorthand prop: stretch">
      <PButtonPure stretch>Some Label</PButtonPure>
    </div>

    <div class="playground light" title="should render button with boolean shorthand prop: hideLabel">
      <PButton hideLabel icon="arrow-right">Some Label</PButton>
    </div>

    <div class="playground light" title="should render button with boolean shorthand prop: compact">
      <PButton compact>Some Label</PButton>
    </div>

    <div class="playground light" title="should render button-tile with boolean shorthand prop: compact">
      <PButtonTile :label="'Some label'" :description="'Some Description'" compact>
        <img
          alt="Beach"
          height="50"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
          width="50"
        />
      </PButtonTile>
    </div>

    <div class="playground light" title="should render carousel with boolean shorthand prop: disablePagination">
      <PCarousel :heading="'Heading'" disablePagination>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </PCarousel>
    </div>

    <div class="playground light" title="should render carousel with boolean shorthand prop: pagination">
      <PCarousel :heading="'Heading'" pagination>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </PCarousel>
    </div>

    <div class="playground light" title="should render checkbox with boolean shorthand prop: hideLabel">
      <PCheckbox :label="'Some label'" hideLabel />
    </div>

    <div class="playground light" title="should render checkbox-wrapper with boolean shorthand prop: hideLabel">
      <PCheckboxWrapper :label="'Some label'" hideLabel>
        <input type="checkbox" />
      </PCheckboxWrapper>
    </div>

    <div class="playground light" title="should render link-pure with boolean shorthand prop: hideLabel">
      <PLinkPure :href="'https://porsche.com'" hideLabel>Some Label</PLinkPure>
    </div>

    <div class="playground light" title="should render link-pure with boolean shorthand prop: stretch">
      <PLinkPure :href="'https://porsche.com'" stretch>Some Label</PLinkPure>
    </div>

    <div class="playground light" title="should render link-social with boolean shorthand prop: hideLabel">
      <PLinkSocial :href="'https://porsche.com'" hideLabel>Some Label</PLinkSocial>
    </div>

    <div class="playground light" title="should render link-tile social with boolean shorthand prop: compact">
      <PLinkTile :href="'https://porsche.com'" :label="'Some label'" :description="'Some Description'" compact>
        <img
          alt="Beach"
          height="50"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
          width="50"
        />
      </PLinkTile>
    </div>

    <div class="playground light" title="should render link with boolean shorthand prop: hideLabel">
      <PLink :href="'https://porsche.com'" hideLabel icon="arrow-right">Some Label</PLink>
    </div>

    <div class="playground light" title="should render link with boolean shorthand prop: compact">
      <PLink :href="'https://porsche.com'" compact>Some Label</PLink>
    </div>

    <div class="playground light" title="should render multi-select with boolean shorthand prop: hideLabel">
      <PMultiSelect :label="'Some label'" :name="'options'" hideLabel>
        <PMultiSelectOption value="a">Option A</PMultiSelectOption>
        <PMultiSelectOption value="b">Option B</PMultiSelectOption>
        <PMultiSelectOption value="c">Option C</PMultiSelectOption>
      </PMultiSelect>
    </div>

    <div class="playground light" title="should render pin-code with boolean shorthand prop: hideLabel">
      <PPinCode :label="'Some label'" hideLabel />
    </div>

    <div class="playground light" title="should render radio-button-wrapper with boolean shorthand prop: hideLabel">
      <PRadioButtonWrapper :label="'Some label'" hideLabel>
        <input type="radio" />
      </PRadioButtonWrapper>
    </div>

    <div class="playground light" title="should render select with boolean shorthand prop: hideLabel">
      <PSelect :label="'Some label'" :name="'options'" :value="'a'" hideLabel >
        <PSelectOption value="a">Option A</PSelectOption>
        <PSelectOption value="b">Option B</PSelectOption>
        <PSelectOption value="c">Option C</PSelectOption>
      </PSelect>
    </div>

    <div class="playground light" title="should render select-wrapper with boolean shorthand prop: hideLabel">
      <PSelectWrapper :label="'Some label'" :name="'options'" hideLabel>
        <select>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </PSelectWrapper>
    </div>

    <div class="playground light" title="should render switch with boolean shorthand prop: hideLabel">
      <PSwitch hideLabel>Some label</PSwitch>
    </div>

    <div class="playground light" title="should render switch with boolean shorthand prop: stretch">
      <PSwitch stretch>Some label</PSwitch>
    </div>

    <div class="playground light" title="should render text-field-wrapper with boolean shorthand prop: hideLabel">
      <PTextFieldWrapper :label="'Some label'" hideLabel>
        <input type="text" />
      </PTextFieldWrapper>
    </div>

    <div class="playground light" title="should render textarea with boolean shorthand prop: hideLabel">
      <PTextarea :label="'Some label'" hideLabel :name="'Some Name'"/>
    </div>

    <div class="playground light" title="should render textarea-wrapper with boolean shorthand prop: hideLabel">
      <PTextareaWrapper :label="'Some label'" hideLabel>
        <textarea />
      </PTextareaWrapper>
    </div>

  </div>
</template>

<style scoped>
.root {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
</style>
