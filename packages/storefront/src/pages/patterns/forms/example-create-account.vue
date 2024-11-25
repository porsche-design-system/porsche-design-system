<template>
  <p-content-wrapper :theme="storefrontTheme">
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-heading :theme="storefrontTheme" size="x-large" tag="h1">Create a new Porsche account</p-heading>
        <p-text :theme="storefrontTheme" size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">
          Please enter your registration details in the following fields.
          <br />This text can be enhanced by some information on the benefits of a Porsche account registration.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-flex direction="{ base: 'column', m: 'row' }" class="form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'one-third'}" class="form-grid-item">
              <p-select
                :theme="storefrontTheme"
                label="Salutation"
                :message="bag.errors.salutation"
                :state="getState('salutation')"
                @update="onCustomSelectUpdate"
                @blur="onFieldBlur"
                :ref="validateFieldName('salutation')"
                :name="validateFieldName('salutation')"
                required
              >
                <p-select-option hidden></p-select-option>
                <p-select-option value="Mr.">Mr.</p-select-option>
                <p-select-option value="Mrs.">Mrs.</p-select-option>
              </p-select>
            </p-flex-item>
            <p-flex-item
              width="{base: 'full', m: 'one-third'}"
              class="form-row-spacing form-row-spacing--zero-m form-grid-item"
            >
              <p-select :theme="storefrontTheme" label="Title" :name="validateFieldName('title')">
                <p-select-option></p-select-option>
                <p-select-option value="Dr.">Dr.</p-select-option>
                <p-select-option value="Prof.">Prof.</p-select-option>
                <p-select-option value="Prof. Dr.">Prof. Dr.</p-select-option>
              </p-select>
            </p-flex-item>
          </p-flex>
          <p-flex direction="{ base: 'column', m: 'row' }" class="form-row-spacing form-grid-item-container">
            <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
              <p-text-field-wrapper
                :theme="storefrontTheme"
                label="First name"
                :message="bag.errors.firstName"
                :state="getState('firstName')"
              >
                <input
                  type="text"
                  :ref="validateFieldName('firstName')"
                  :name="validateFieldName('firstName')"
                  v-model="bag.data.firstName"
                  @blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item
              width="{base: 'full', m: 'half'}"
              class="form-row-spacing form-row-spacing--zero-m form-grid-item"
            >
              <p-text-field-wrapper
                :theme="storefrontTheme"
                label="Last name"
                :message="bag.errors.lastName"
                :state="getState('lastName')"
              >
                <input
                  type="text"
                  :ref="validateFieldName('lastName')"
                  :name="validateFieldName('lastName')"
                  v-model="bag.data.lastName"
                  @blur="onFieldBlur"
                  required
                />
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-text-field-wrapper
            :theme="storefrontTheme"
            label="Email address"
            class="form-row-spacing"
            :message="bag.errors.email"
            :state="getState('email')"
          >
            <input
              type="email"
              :ref="validateFieldName('email')"
              :name="validateFieldName('email')"
              v-model="bag.data.email"
              @blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-text-field-wrapper
            :theme="storefrontTheme"
            label="Password"
            class="form-row-spacing"
            :message="bag.errors.password"
            :state="getState('password')"
          >
            <input
              type="password"
              :ref="validateFieldName('password')"
              :name="validateFieldName('password')"
              v-model="bag.data.password"
              @blur="onFieldBlur"
              required
            />
          </p-text-field-wrapper>
          <p-checkbox-wrapper
            :theme="storefrontTheme"
            class="form-section-spacing"
            :message="bag.errors.terms"
            :state="getState('terms')"
          >
            <span slot="label" id="terms">
              I have read the
              <a href="https://porsche.com">general terms and conditions</a> and I accept them.
            </span>
            <input
              type="checkbox"
              :ref="validateFieldName('terms')"
              :name="validateFieldName('terms')"
              v-model="bag.data.terms"
              @change="onFieldBlur"
              required
              aria-labelledby="terms"
            />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper
            :theme="storefrontTheme"
            class="form-row-spacing"
            :message="bag.errors.privacy"
            :state="getState('privacy')"
          >
            <span slot="label" id="privacy"
              >I have read the <a href="https://porsche.com">Data Privacy Statement</a>.</span
            >
            <input
              type="checkbox"
              :ref="validateFieldName('privacy')"
              :name="validateFieldName('privacy')"
              v-model="bag.data.privacy"
              @change="onFieldBlur"
              required
              aria-labelledby="privacy"
            />
          </p-checkbox-wrapper>
          <p-button-group class="form-section-spacing form-bottom-spacing">
            <p-button :theme="storefrontTheme" type="submit">Create Porsche account</p-button>
            <p-button :theme="storefrontTheme" variant="tertiary" icon="close" @click="onReset">Cancel</p-button>
          </p-button-group>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<script lang="ts">
import type { ValidationBag } from '@/utils';
import type { StorefrontTheme } from '@/models';
import Vue from 'vue';
import Component from 'vue-class-component';
import { boolean, object, string } from 'yup';
import { validateName, getState, validateField, validateForm, getInitialErrors, getFirstErrorKey } from '@/utils';

const initialData = {
  salutation: '',
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
  privacy: false,
};

type FormModel = typeof initialData;

@Component
export default class CreateAccountForm extends Vue {
  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
  private getState = (field: keyof FormModel) => getState(field, this.bag);

  private bag: ValidationBag<FormModel> = {
    data: { ...initialData },
    errors: getInitialErrors(initialData),
    schema: object({
      salutation: string().required('How can we address you?'),
      title: string().defined(),
      firstName: string().required('Please enter your name'),
      lastName: string().required('Please enter your last name'),
      email: string()
        .email('Email address seems invalid. Please check your entry')
        .required('Please enter your email address'),
      password: string().required('Please enter a password').min(6, 'Your password must contain at least 6 characters'),
      terms: boolean().required().oneOf([true], 'Please agree to our terms and conditions'),
      privacy: boolean().required().oneOf([true], 'Please agree to our data privacy policy'),
    }),
  };

  onFieldBlur({ target }: FocusEvent & { target: HTMLInputElement }): void {
    validateField(target.name as keyof FormModel, this.bag);
  }
  onCustomSelectUpdate({ target }: CustomEvent & { target: HTMLSelectElement }): void {
    this.bag.data.salutation = target.value;
    validateField(target.name as keyof FormModel, this.bag);
  }

  async onSubmit(): Promise<void> {
    const isValid = await validateForm(this.bag);
    console.log('isValid', isValid);

    if (!isValid) {
      const input = this.$refs[getFirstErrorKey(this.bag)!] as HTMLElement;
      input.focus();
      input.parentElement!.scrollIntoView(true); // scroll to wrapper element, so that we can see the label
    }
  }

  onReset(): void {
    this.bag.data = { ...initialData };
    this.bag.errors = getInitialErrors(initialData);
  }
}
</script>
