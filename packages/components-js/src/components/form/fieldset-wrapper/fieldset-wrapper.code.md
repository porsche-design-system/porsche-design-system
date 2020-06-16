# Fieldset


<Playground>
  <template>
    <p-fieldset-wrapper label="Some label">
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>
    </p-fieldset-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundFieldsetWrapper extends Vue {}
</script>