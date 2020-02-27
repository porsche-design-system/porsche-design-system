# Checkbox

Use a Checkbox for a list of options that allow the user to make choices. The choice of one or several options (checked state) or no option (unchecked state) is valid. Each checkbox has a separate label and is independent to all other checkboxes. Checking one box doesn't uncheck the others. By default checkboxes are not selected.

---

## Variants

### 1. Default  

<p-checkbox-wrapper label="Some label"><input type="checkbox" name="some-name"></p-checkbox-wrapper>

### 2. Checked

<p-checkbox-wrapper label="Some label"><input type="checkbox" name="some-name" checked="checked"></p-checkbox-wrapper>

### 3. Indeterminate
The indeterminate state represents the mixed selection states of dependent checkboxes in a group. 
Once some of the dependent fields have been selected and subsequently deselected. 
This is only a visual state and cannot be achieved by direct user interaction.  

<p-checkbox-wrapper label="Some label"><input type="checkbox" name="some-name" class="example-set-to-indeterminate"></p-checkbox-wrapper>

---

## States
 
All Checkboxes types are available in the following states:
 
* default 
* checked
* disabled 
* focus
* indeterminate 
* error 
* success

---

## Content

The Checkbox can contain the following sub-components:

- **Checkbox**
The indicator is used to show whether the checkbox is checked (“on”) or not (“off”).

- **Label**
Label text (≤ 20 characters) is used to inform users as to what information is requested for a Checkbox. Every Checkbox should have a label.

---

## Usage

Checkboxes have several usage patterns:

### Independent choices (zero or more)
A group of Checkboxes is used to select from a set of zero or more choices. (Unlike single-selection controls such as Radio Buttons, users can select any combination of options in a group of Checkboxes.)

### Dependent choices (one or more)
A group of Checkboxes can also be used to select from a set of one or more choices.  Error is displayed when none of the options are selected. A group of Checkboxes is used where at least one protocol must be selected. 

### A stand-alone Checkbox
Is used for a single option that the user can turn on or off.

### Groups
Groups of Checkboxes should be programmatically grouped together with an associated legend or description.

### Disabled State
All Checkboxes are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. 

<div style="background:#F2F2F2; width:100%; margin-top: 64px; padding-top: 32px; padding-left: 42px; padding-bottom: 42px;">
    <p-headline variant="headline-3" tag="h3" style="margin-bottom: 24px;">Examples</p-headline>
    <img src="./assets/form-checkbox-examples.png" alt="Example"/>
</div>

---

## Don'ts

### Mixing

Please avoid the mix of radio buttons and checkboxes. These must be considered separately

![Dont mix buttons](./assets/dont-mix-buttons-checkbox.png)

### Alignment

Set checkboxes best vertically instead of horizontally

![Set checkboxes dont vertically](./assets/dont-alignment-checkbox.png)

Checkboxes are always aligned left

![Example for alignement](./assets/dont-position-checkbox.png)

---
 
## Related Components
 
* [Text Field](#/web/components/form/text-field)
* [Textarea](#/web/components/form/textarea)
* [Radio Button](#/web/components/form/radio-button)
* [Select](#/web/components/form/select)


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundCheckboxWrapperDesign extends Vue {    
    mounted() {
      this.$nextTick(function () {
        const inputs = document.querySelectorAll('.example-set-to-indeterminate');
        inputs.forEach(input => {
          input.indeterminate = true;
        });
      });
    }
  }
</script>