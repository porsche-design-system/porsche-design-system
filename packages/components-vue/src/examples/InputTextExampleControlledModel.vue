<template>
  <form @submit.prevent="onSubmit">
    <PInputText
      v-model="form.myInputText.value"
      :label="'Some Label'"
      :required="true"
      :disabled="form.myInputText.disabled"
      @blur="markTouched"
    />
    <button type="submit">Submit</button>

    <button type="button" @click="setValue">Set Value</button>
    <button type="button" @click="resetValue">Reset</button>
    <button type="button" @click="toggleDisabled">
      {{ form.myInputText.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.myInputText.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.myInputText.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.myInputText.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.myInputText.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ isValid }}</span></div>
    <div v-if="submittedValue !== undefined">
      Submitted: <span data-field="submitted">{{ submittedValue }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PInputText } from '@porsche-design-system/components-vue';
import { computed, reactive, ref } from 'vue';

const form = reactive({
  myInputText: {
    value: '',
    touched: false,
    dirty: false,
    disabled: false,
  },
});

const submittedValue = ref<string | undefined>(undefined);

const isValid = computed(() => {
  if (form.myInputText.disabled) return true;
  return form.myInputText.value.trim().length > 0;
});

const markTouched = () => {
  form.myInputText.touched = true;
};

const setValue = () => {
  form.myInputText.value = 'Some text';
  form.myInputText.dirty = true;
};

const resetValue = () => {
  form.myInputText.value = '';
  form.myInputText.dirty = false;
  form.myInputText.touched = false;
};

const toggleDisabled = () => {
  form.myInputText.disabled = !form.myInputText.disabled;
};

const onSubmit = () => {
  form.myInputText.touched = true;
  submittedValue.value = JSON.stringify({ myInputText: form.myInputText.value });
};
</script>
