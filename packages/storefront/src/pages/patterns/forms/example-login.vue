<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Welcome to Porsche</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8"
          >Log in to your Porsche account to manage your vehicles and services.</p-text
        >
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-inline-notification v-if="showGlobalError" state="error" persistent style="margin-bottom: 20px"
            >Your username and/or password do not match.</p-inline-notification
          >
          <p-flex class="form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'two-thirds'}" class="form-grid-item">
              <p-text-field-wrapper
                label="Porsche ID (email address)"
                v-bind:message="bag.errors.email"
                v-bind:state="getState('email')"
              >
                <input
                  type="email"
                  :ref="validateFieldName('email')"
                  v-bind:name="validateFieldName('email')"
                  v-model="bag.data.email"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex class="form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'two-thirds'}" class="form-row-spacing form-grid-item">
              <p-text-field-wrapper
                label="Password"
                v-bind:message="bag.errors.password"
                v-bind:state="getState('password')"
              >
                <input
                  type="password"
                  :ref="validateFieldName('password')"
                  v-bind:name="validateFieldName('password')"
                  v-model="bag.data.password"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
              <div class="spacing-mt-8">
                <p-link-pure>Forgot password?</p-link-pure>
              </div>
            </p-flex-item>
          </p-flex>
          <p-flex class="form-section-spacing">
            <p-flex-item width="{base: 'full', s: 'auto'}">
              <p-button-group>
                <p-button type="submit">Log in</p-button>
              </p-button-group>
              <p-checkbox-wrapper label="Keep me logged in" class="form-row-spacing">
                <input type="checkbox" v-bind:name="validateFieldName('isChecked')" v-model="bag.data.isChecked" />
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing form-bottom-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-4" tag="h2">New to Porsche?</p-headline>
        <p-link-pure class="spacing-mt-8">Create a new Porsche account</p-link-pure>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { boolean, object, ObjectSchema, SchemaOf, string } from 'yup';
  import {
    validateName,
    getState,
    validateField,
    validateForm,
    ValidationBag,
    getInitialErrors,
    getFirstErrorKey,
  } from '../../../utils';

  const initialData = {
    email: '',
    password: '',
    isChecked: false,
  };

  type FormModel = typeof initialData;

  @Component
  export default class LoginForm extends Vue {
    private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
    private getState = (field: keyof FormModel) => getState(field, this.bag);
    public showGlobalError = false;

    private bag: ValidationBag<FormModel> = {
      data: { ...initialData },
      errors: getInitialErrors(initialData),
      schema: object({
        email: string().email('Please check your entry').required('Please enter your email address or Porsche ID'),
        password: string().required('Please enter your password'),
        isChecked: boolean().defined(),
      }),
    };

    onFieldBlur({ target }: FocusEvent & { target: HTMLInputElement }): void {
      validateField(target.name as keyof FormModel, this.bag);
    }

    async onSubmit(): Promise<void> {
      this.showGlobalError = false;
      const isValid = await validateForm(this.bag);
      console.log('isValid', isValid);

      if (!isValid) {
        const input = this.$refs[getFirstErrorKey(this.bag)!] as HTMLElement;
        input.focus();
        input.parentElement!.scrollIntoView(true); // scroll to wrapper element, so that we can see the label
      } else {
        this.showGlobalError = true;
      }
    }
  }
</script>
