<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Welcome to Porsche</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8"
          >Log in to your Porsche account to manage your vehicles and services.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-flex class="form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'two-thirds'}" class="form-grid-item">
              <p-text-field-wrapper
                label="Porsche ID (email address)"
                v-bind:message="errors.email"
                v-bind:state="errors.email && 'error'"
              >
                <input
                  type="email"
                  v-bind:name="validateName('email')"
                  v-model="formData.email"
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
                v-bind:message="errors.password"
                v-bind:state="errors.password && 'error'"
              >
                <input
                  type="password"
                  v-bind:name="validateName('password')"
                  v-model="formData.password"
                  v-on:blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
              <div class="spacing-mt-8">
                <p-link-pure href="#">Forgot password?</p-link-pure>
              </div>
            </p-flex-item>
          </p-flex>
          <p-flex class="form-section-spacing">
            <p-flex-item width="{base: 'full', s: 'auto'}">
              <p-button type="submit" class="form-item-width--full form-item-width--auto-s">Log in</p-button>
              <p-checkbox-wrapper label="Keep me logged in" class="form-row-spacing">
                <input type="checkbox" v-bind:name="validateName('isChecked')" v-model="formData.isChecked" />
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing form-bottom-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-4" tag="h2">New to Porsche?</p-headline>
        <p-link-pure href="#" class="spacing-mt-8">Create a new Porsche account</p-link-pure>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';
  import { boolean, object, string, ValidationError } from 'yup';

  type FormModel = {
    email: string;
    password: string;
    isChecked: boolean;
  };

  @Component
  export default class LoginForm extends Vue {
    private validateName = (key: keyof FormModel): string => key;

    private formData: FormModel = {
      email: '',
      password: '',
      isChecked: false
    };

    private errors: { [key in keyof FormModel]: string } = {
      email: '',
      password: '',
      isChecked: ''
    };

    private schema = object().shape<FormModel>({
      email: string()
        .email()
        .required(),
      password: string().required(),
      isChecked: boolean()
    });

    private validateField = async (field: keyof FormModel): Promise<boolean> => {
      this.errors[field] = await this.schema
        .validateAt(this.validateName(field), this.formData)
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

    // @Watch('formData.email') // validate while typing
    // onEmailChange = (): void => {
    //   this.validateField('email');
    // };

    onFieldBlur = ({ target }: FocusEvent & { target: HTMLInputElement }): void => {
      this.validateField(target.name as keyof FormModel);
    };

    onSubmit = async () => {
      const isValid = await this.validateForm();
      console.log('isValid', isValid);
    };
  }
</script>
