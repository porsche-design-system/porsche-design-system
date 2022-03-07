<template>
  <p-content-wrapper>
    <p-headline variant="headline-1">Various patterns and examples</p-headline>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Validation of grouped form elements</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8"
          >How to implement validation messages to grouped form elements like checkbox- and radio groups.</p-text
        >
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate class="form-bottom-spacing" @submit.prevent="onSubmit">
          <p-fieldset-wrapper
            label="Grouped list of checkboxes"
            required="true"
            v-bind:state="getState('check')"
            v-bind:message="bag.errors.check"
            class="form-section-spacing"
          >
            <p-checkbox-wrapper label="Some checkbox label 1" v-bind:state="getState('check')">
              <input
                type="checkbox"
                v-bind:name="validateFieldName('check')"
                v-model="bag.data.check.check1"
                v-on:change="onFieldBlur"
              />
            </p-checkbox-wrapper>
            <p-checkbox-wrapper label="Some checkbox label 2" v-bind:state="getState('check')" class="form-row-spacing">
              <input
                type="checkbox"
                v-bind:name="validateFieldName('check')"
                v-model="bag.data.check.check2"
                v-on:change="onFieldBlur"
              />
            </p-checkbox-wrapper>
            <p-checkbox-wrapper label="Some checkbox label 3" v-bind:state="getState('check')" class="form-row-spacing">
              <input
                type="checkbox"
                v-bind:name="validateFieldName('check')"
                v-model="bag.data.check.check3"
                v-on:change="onFieldBlur"
              />
            </p-checkbox-wrapper>
          </p-fieldset-wrapper>

          <p-fieldset-wrapper
            label="Grouped list of radio buttons"
            required="true"
            v-bind:state="getState('radio')"
            v-bind:message="bag.errors.radio"
            class="form-section-spacing"
          >
            <p-radio-button-wrapper label="Some radio label 1" v-bind:state="getState('radio')">
              <input
                type="radio"
                value="radio1"
                v-bind:name="validateFieldName('radio')"
                v-model="bag.data.radio"
                v-on:change="onFieldBlur"
              />
            </p-radio-button-wrapper>
            <p-radio-button-wrapper
              label="Some radio label 2"
              v-bind:state="getState('radio')"
              class="form-row-spacing"
            >
              <input
                type="radio"
                value="radio2"
                v-bind:name="validateFieldName('radio')"
                v-model="bag.data.radio"
                v-on:change="onFieldBlur"
              />
            </p-radio-button-wrapper>
            <p-radio-button-wrapper
              label="Some radio label 3"
              v-bind:state="getState('radio')"
              class="form-row-spacing"
            >
              <input
                type="radio"
                value="radio3"
                v-bind:name="validateFieldName('radio')"
                v-model="bag.data.radio"
                v-on:change="onFieldBlur"
              />
            </p-radio-button-wrapper>
          </p-fieldset-wrapper>

          <p-fieldset-wrapper
            label="Grouped short input"
            v-bind:state="getState('day') || getState('month') || getState('year')"
            class="form-section-spacing"
          >
            <p-grid>
              <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
                <p-flex class="form-grid-item-container">
                  <p-flex-item width="one-quarter" class="form-grid-item">
                    <p-text-field-wrapper v-bind:state="getState('day')" label="Day">
                      <input
                        type="number"
                        placeholder="DD"
                        v-bind:name="validateFieldName('day')"
                        v-model="bag.data.day"
                        v-on:blur="onFieldBlur"
                        required
                        aria-describedby="error-message-1"
                      />
                    </p-text-field-wrapper>
                  </p-flex-item>
                  <p-flex-item width="one-quarter" class="form-grid-item">
                    <p-text-field-wrapper v-bind:state="getState('month')" label="Month">
                      <input
                        type="number"
                        placeholder="MM"
                        v-bind:name="validateFieldName('month')"
                        v-model="bag.data.month"
                        v-on:blur="onFieldBlur"
                        required
                        aria-describedby="error-message-2"
                      />
                    </p-text-field-wrapper>
                  </p-flex-item>
                  <p-flex-item width="one-third" class="form-grid-item">
                    <p-text-field-wrapper label="Year">
                      <input
                        type="number"
                        placeholder="YYYY"
                        v-bind:name="validateFieldName('year')"
                        v-model="bag.data.year"
                        v-on:blur="onFieldBlur"
                        aria-describedby="error-message-3"
                      />
                    </p-text-field-wrapper>
                  </p-flex-item>
                </p-flex>
              </p-grid-item>
            </p-grid>
            <span slot="message" v-if="bag.errors.day || bag.errors.month">
              <div v-if="bag.errors.day">{{ bag.errors.day }}</div>
              <div v-if="bag.errors.month">{{ bag.errors.month }}</div>
            </span>
          </p-fieldset-wrapper>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<script lang="ts">
  import type { ValidationBag } from '@/utils';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { boolean, number, object, string } from 'yup';
  import { validateName, getState, validateField, validateForm, getInitialErrors } from '../../../utils';

  const initialData = {
    check: {
      check1: false,
      check2: false,
      check3: false,
    },
    radio: '',
    day: ('' as unknown) as number,
    month: ('' as unknown) as number,
    year: 1998,
  };

  type FormModel = typeof initialData;

  @Component
  export default class VariousForm extends Vue {
    private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
    private getState = (field: keyof FormModel) => getState(field, this.bag);

    private bag: ValidationBag<FormModel> = {
      data: { ...initialData },
      errors: getInitialErrors(initialData),
      schema: object({
        check: object({
          check1: boolean().defined(),
          check2: boolean().defined(),
          check3: boolean().defined(),
        })
          .required()
          .test('customTest', 'Please select at least one option', (obj) =>
            obj ? Object.values(obj).some((val) => val) : false
          ),
        radio: string().required('Please select one option'),
        day: number()
          .required()
          .min(1, 'Please enter valid day 01-31')
          .max(31, 'Please enter valid day 01-31')
          .typeError('Please enter a day'),
        month: number()
          .required()
          .min(1, 'Please enter valid month 01-12')
          .max(12, 'Please enter valid month 01-12')
          .typeError('Please enter a month'),
        year: number().defined(),
      }),
    };

    created(): void {
      this.onSubmit();
    }

    onFieldBlur({ target }: FocusEvent & { target: HTMLInputElement }): void {
      validateField(target.name as keyof FormModel, this.bag);
    }

    async onSubmit(): Promise<void> {
      const isValid = await validateForm(this.bag);
      console.log('isValid', isValid);
    }

    onReset(): void {
      this.bag.data = { ...initialData };
      this.bag.errors = getInitialErrors(initialData);
    }
  }
</script>
