# Text Field

## Introduction

### Default
<Playground>
  <template>
    <p-text-field-wrapper label="some label">
      <input type="text" name="some-name" placeholder="Some placeholder"/>
    </p-text-field-wrapper> 
    <p-text-field-wrapper label="some label" state="error" message="Some error message">
      <input type="text" name="some-name" placeholder="Some placeholder"/>
    </p-text-field-wrapper>
    <p-text-field-wrapper state="success">
      <span slot="label"><strong>S</strong>ome <a href="#">Label</a><b>!</b></span>
      <input type="text" name="some-name" placeholder="Some placeholder"/>
      <span slot="message"><strong>S</strong>ome <a href="#">Success</a><b>!</b></span>
    </p-text-field-wrapper>
  </template>
</Playground>

### Placeholder
<Playground>    
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="text" name="some-name" placeholder="Some placeholder text"/>
    </p-text-field-wrapper>
  </template>
</Playground>


### Required
<Playground>
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="text" name="some-name" required="true"/>
    </p-text-field-wrapper>
  </template>
</Playground>


### Disabled
<Playground>
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="text" name="some-name" disabled="disabled" />
    </p-text-field-wrapper>
  </template>
</Playground>


### Readonly
<Playground>
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="text" name="some-name" value="Some value" readonly="readonly" />
    </p-text-field-wrapper>
  </template>
</Playground>


### Textfield type date with icon
<Playground>
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="date" name="some-name"/>
    </p-text-field-wrapper>
  </template>
</Playground>

### Textfield type time with icon
<Playground>
  <template>
  <form novalidate>
    <p-text-field-wrapper label="Some label">
      <input type="time" name="some-name"/>
    </p-text-field-wrapper>
   </form>
  </template>
</Playground>


### Type password with icon-button
<Playground>
  <template>
    <p-text-field-wrapper label="Some label">
      <input type="password" name="some-name"/>
    </p-text-field-wrapper>
  </template>
</Playground>


### Textfield with error message
<Playground>
  <template>
    <p-text-field-wrapper label="Some label" state="error" message="Your phone number is not valid.">
      <input type="number" name="some-name" aria-invalid="true" value="01722345678" />
    </p-text-field-wrapper>
  </template>
</Playground>


### Textfield with success message
<Playground>
  <template>
    <p-text-field-wrapper label="Some label" state="success" message="Your phone number is valid.">
      <input type="number" name="some-name" value="01722345678" />
    </p-text-field-wrapper>
  </template>
</Playground>


## Test form events and some layouts

### Native submit (aligned with align-items)
<Playground>
  <template>
    <form novalidate onsubmit="alert('Form submitted')">
    <p-flex align-items="flex-end">
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name"/>
        </p-text-field-wrapper>
        <p-button type="submit">Form submit</p-button>
      </p-flex>
     </form>
  </template>
</Playground>

### JS submit (aligned with margin-top)
<Playground>
  <template>
    <form id="form2" novalidate onsubmit="alert('Form submitted')">
     <p-flex>
       <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
       </p-text-field-wrapper>
       <p-button type="submit" onClick="formSubmit();" style="margin-top: 24px">Form submit</p-button>
      </p-flex>
     </form>
  </template>
</Playground>

### Submit with message (can't be aligned)
<Playground>
  <template>
    <form id="form3" novalidate onsubmit="alert('Form submitted')">
      <p-flex align-items="flex-end">
        <p-text-field-wrapper label="Some very long label which will hopefully break" state="error" message="Fill in the required field" style="width:200px;">
          <input type="text" name="some-name"/>
        </p-text-field-wrapper>
        <p-button type="submit">Form submit</p-button>
      </p-flex>
     </form>
  </template>
</Playground>

<script>
  const formSubmit = function() {
    document.getElementById('form2').submit();
  };
</script>