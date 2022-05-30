# Segmented Control

<p-segmented-control>
  <p-segmented-control-item label="Some label">Size XS</p-segmented-control-item>
  <p-segmented-control-item icon="truck">Size S</p-segmented-control-item>
  <p-segmented-control-item label="Some label" icon="truck">Size S</p-segmented-control-item>
  <p-segmented-control-item>Size M is long</p-segmented-control-item>
  <p-segmented-control-item selected>Size L</p-segmented-control-item>
  <p-segmented-control-item disabled>Size XL</p-segmented-control-item>
</p-segmented-control>

<p-segmented-control>
  <p-segmented-control-item>Size XS</p-segmented-control-item>
  <p-segmented-control-item>Size S</p-segmented-control-item>
  <p-segmented-control-item>Size M is long</p-segmented-control-item>
  <p-segmented-control-item selected>Size L</p-segmented-control-item>
  <p-segmented-control-item disabled>Size XL</p-segmented-control-item>
</p-segmented-control>

<p-segmented-control class="surface" background-color="background-surface">
  <p-segmented-control-item>Size XS</p-segmented-control-item>
  <p-segmented-control-item>Size S</p-segmented-control-item>
  <p-segmented-control-item>Size M is long</p-segmented-control-item>
  <p-segmented-control-item selected>Size L</p-segmented-control-item>
  <p-segmented-control-item disabled>Size XL</p-segmented-control-item>
</p-segmented-control>

<p-segmented-control theme="dark">
  <p-segmented-control-item>Size XS</p-segmented-control-item>
  <p-segmented-control-item>Size S</p-segmented-control-item>
  <p-segmented-control-item>Size M is long</p-segmented-control-item>
  <p-segmented-control-item selected>Size L</p-segmented-control-item>
  <p-segmented-control-item disabled>Size XL</p-segmented-control-item>
</p-segmented-control>

<p-segmented-control class="surface" background-color="background-surface" theme="dark">
  <p-segmented-control-item>Size XS</p-segmented-control-item>
  <p-segmented-control-item>Size S</p-segmented-control-item>
  <p-segmented-control-item>Size M is long</p-segmented-control-item>
  <p-segmented-control-item selected>Size L</p-segmented-control-item>
  <p-segmented-control-item disabled>Size XL</p-segmented-control-item>
</p-segmented-control>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
  
@Component
export default class Code extends Vue {
  mounted() {
    document.querySelectorAll('p-segmented-control-item').forEach((el) =>
      el.addEventListener('click', (e) => {
        if (!e.target.disabled && !e.target.selected) {
          Array.from(e.target.parentElement.children).forEach((item) => (item.selected = false));
          e.target.selected = true;
        }
      })
    );
  }
}
</script>

 <style>
  p-segmented-control {
    padding: 8px;
  }

  .surface {
    background: #f2f2f2;
  }

  [theme='dark'] {
    background: #0e1418;
  }

  [theme='dark'].surface {
    background: #262b2e;
  }
</style>