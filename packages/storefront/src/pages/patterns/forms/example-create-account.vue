<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Create a new Porsche account</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">
          Please enter your registration details in the following fields.<br />
          This text can be enhanced by some information on the benefits of a Porsche account registration.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-flex direction="{ base: 'column', m: 'row' }" class="form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'one-third'}" class="form-grid-item">
              <p-select-wrapper
                label="Salutation"
                v-bind:message="bag.errors.salutation"
                v-bind:state="getState('salutation')"
              >
                <select
                  v-bind:name="validateFieldName('salutation')"
                  v-model="bag.data.salutation"
                  v-on:change="onFieldBlur"
                  required
                >
                  <option value="">Choose an option</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </p-select-wrapper>
            </p-flex-item>
            <p-flex-item
              width="{base: 'full', m: 'one-third'}"
              class="form-row-spacing form-row-spacing--zero-m form-grid-item"
            >
              <p-select-wrapper label="Title">
                <select v-bind:name="validateFieldName('title')" v-model="bag.data.title">
                  <option>Choose an option</option>
                  <option value="option 1">Dr.</option>
                  <option value="option 2">Prof.</option>
                  <option value="option 3">Prof. Dr.</option>
                </select>
              </p-select-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex direction="{ base: 'column', m: 'row' }" class="form-row-spacing form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
              <p-text-field-wrapper
                label="First name"
                v-bind:message="bag.errors.firstName"
                v-bind:state="getState('firstName')"
              >
                <input
                  type="text"
                  v-bind:name="validateFieldName('firstName')"
                  v-model="bag.data.firstName"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item
              width="{base: 'full', m: 'half'}"
              class="form-row-spacing form-row-spacing--zero-m form-grid-item"
            >
              <p-text-field-wrapper
                label="Last name"
                v-bind:message="bag.errors.lastName"
                v-bind:state="getState('lastName')"
              >
                <input
                  type="text"
                  v-bind:name="validateFieldName('lastName')"
                  v-model="bag.data.lastName"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-text-field-wrapper
            label="Email address"
            class="form-row-spacing"
            v-bind:message="bag.errors.email"
            v-bind:state="getState('email')"
          >
            <input
              type="email"
              v-bind:name="validateFieldName('email')"
              v-model="bag.data.email"
              v-on:blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-text-field-wrapper
            label="Password"
            class="form-row-spacing"
            v-bind:message="bag.errors.password"
            v-bind:state="getState('password')"
          >
            <input
              type="password"
              v-bind:name="validateFieldName('password')"
              v-model="bag.data.password"
              v-on:blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-checkbox-wrapper
            class="form-section-spacing"
            v-bind:message="bag.errors.terms"
            v-bind:state="getState('terms')"
          >
            <span slot="label">I have read the <a href="#">general terms ans conditions</a> and I accept them.</span>
            <input
              type="checkbox"
              v-bind:name="validateFieldName('terms')"
              v-model="bag.data.terms"
              v-on:change="onFieldBlur"
              required
            />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper
            class="form-row-spacing"
            v-bind:message="bag.errors.privacy"
            v-bind:state="getState('privacy')"
          >
            <span slot="label">I have read the <a href="#">Data Privacy Statement</a>.</span>
            <input
              type="checkbox"
              v-bind:name="validateFieldName('privacy')"
              v-model="bag.data.privacy"
              v-on:change="onFieldBlur"
              required
            />
          </p-checkbox-wrapper>
          <p-flex
            direction="{ base: 'column', s: 'row' }"
            class="form-section-spacing form-bottom-spacing form-grid-item-container"
          >
            <p-flex-item width="{base: 'full', s: 'auto'}" class="form-grid-item">
              <p-button
                variant="tertiary"
                icon="close"
                class="form-item-width--full form-item-width--auto-s"
                @click="onReset"
                >Cancel
              </p-button>
            </p-flex-item>
            <p-flex-item
              width="{base: 'full', s: 'auto'}"
              class="form-row-spacing form-row-spacing--zero-s form-grid-item"
            >
              <p-button type="submit" class="form-item-width--full form-item-width--auto-s"
                >Create Porsche account
              </p-button>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { boolean, object, string } from 'yup';
  import { validateName, getState, validateField, validateForm, ValidationBag, getInitialErrors } from '../../../utils';

  type FormModel = {
    title: string;
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    terms: boolean;
    privacy: boolean;
  };

  const initialData: FormModel = {
    salutation: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
    privacy: false
  };

  @Component
  export default class CreateAccountForm extends Vue {
    private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
    private getState = (field: keyof FormModel) => getState(field, this.bag);

    private bag: ValidationBag<FormModel> = {
      data: { ...initialData },
      errors: getInitialErrors(initialData),
      schema: object<FormModel>({
        salutation: string().required(),
        title: string(),
        firstName: string().required(),
        lastName: string().required(),
        email: string()
          .email()
          .required(),
        password: string().required(),
        terms: boolean()
          .required()
          .oneOf([true]),
        privacy: boolean()
          .required()
          .oneOf([true])
      })
    };

    onFieldBlur = ({ target }: FocusEvent & { target: HTMLInputElement }): void => {
      validateField(target.name, this.bag);
    };

    onSubmit = async (): void => {
      const isValid = await validateForm(this.bag);
      console.log('isValid', isValid);
    };

    onReset = (): void => {
      this.bag.data = { ...initialData };
      this.bag.errors = getInitialErrors(initialData);
    };
  }
</script>
