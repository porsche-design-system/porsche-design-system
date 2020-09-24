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
                v-bind:message="errors.salutation"
                v-bind:state="getState('salutation')"
              >
                <select
                  v-bind:name="validateName('salutation')"
                  v-model="formData.salutation"
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
                <select v-bind:name="validateName('title')" v-model="formData.title">
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
                v-bind:message="errors.firstName"
                v-bind:state="getState('firstName')"
              >
                <input
                  type="text"
                  v-bind:name="validateName('firstName')"
                  v-model="formData.firstName"
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
                v-bind:message="errors.lastName"
                v-bind:state="getState('lastName')"
              >
                <input
                  type="text"
                  v-bind:name="validateName('lastName')"
                  v-model="formData.lastName"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-text-field-wrapper
            label="Email address"
            class="form-row-spacing"
            v-bind:message="errors.email"
            v-bind:state="getState('email')"
          >
            <input
              type="email"
              v-bind:name="validateName('email')"
              v-model="formData.email"
              v-on:blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-text-field-wrapper
            label="Password"
            class="form-row-spacing"
            v-bind:message="errors.password"
            v-bind:state="getState('password')"
          >
            <input
              type="password"
              v-bind:name="validateName('password')"
              v-model="formData.password"
              v-on:blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-checkbox-wrapper
            class="form-section-spacing"
            v-bind:message="errors.terms"
            v-bind:state="getState('terms')"
          >
            <span slot="label">I have read the <a href="#">general terms ans conditions</a> and I accept them.</span>
            <input
              type="checkbox"
              v-bind:name="validateName('terms')"
              v-model="formData.terms"
              v-on:change="onFieldBlur"
              required
            />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper
            class="form-row-spacing"
            v-bind:message="errors.privacy"
            v-bind:state="getState('privacy')"
          >
            <span slot="label">I have read the <a href="#">Data Privacy Statement</a>.</span>
            <input
              type="checkbox"
              v-bind:name="validateName('privacy')"
              v-model="formData.privacy"
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
                type="reset"
                class="form-item-width--full form-item-width--auto-s"
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
  import { boolean, object, string, ValidationError } from 'yup';

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

  @Component
  export default class CreateAccountForm extends Vue {
    private validateName = (key: keyof FormModel): string => key;

    private formData: FormModel = {
      salutation: '',
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
      privacy: false
    };

    private errors: { [key in keyof FormModel]: string } = {
      salutation: '',
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: '',
      privacy: ''
    };

    private schema = object().shape<FormModel>({
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
    });

    private getState = (field: keyof FormModel) => this.errors[field] && 'error';

    private validateField = async (field: keyof FormModel): Promise<boolean> => {
      this.errors[field] = await this.schema
        .validateAt(field, this.formData)
        .then(() => '')
        .catch((err: ValidationError) => err.message);
      return !this.errors[field];
    };

    private validateForm = async (): Promise<boolean> => {
      // reset all errors
      Object.keys(this.errors).forEach((key) => (this.errors[key as keyof FormModel] = ''));

      return this.schema
        .validate(this.formData, { abortEarly: false })
        .then(() => true)
        .catch((err: ValidationError) => {
          err.inner.forEach(({ path, message }) => (this.errors[path as keyof FormModel] = message));
          return false;
        });
    };

    onFieldBlur = ({ target }: FocusEvent & { target: HTMLInputElement }): void => {
      this.validateField(target.name as keyof FormModel);
    };

    onSubmit = async () => {
      const isValid = await this.validateForm();
      console.log('isValid', isValid);
    };
  }
</script>
