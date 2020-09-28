<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Get in touch with Porsche</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8"
          >Do you have any specific questions about your Porsche vehicle? Please use the form below so that we can
          process your inquiry as quickly as possible.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-fieldset-wrapper label="Your message">
            <p-flex class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
                <p-select-wrapper
                  label="Category"
                  v-bind:message="bag.errors.category"
                  v-bind:state="getState('category')"
                >
                  <select
                    :ref="validateFieldName('category')"
                    v-bind:name="validateFieldName('category')"
                    v-model="bag.data.category"
                    v-on:change="onFieldBlur"
                    required
                  >
                    <option value="">Choose an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
            </p-flex>
            <p-text-field-wrapper
              label="Subject"
              class="form-row-spacing"
              v-bind:message="bag.errors.subject"
              v-bind:state="getState('subject')"
            >
              <input
                type="text"
                :ref="validateFieldName('subject')"
                v-bind:name="validateFieldName('subject')"
                v-model="bag.data.subject"
                v-on:blur="onFieldBlur"
                required
              />
            </p-text-field-wrapper>
            <p-textarea-wrapper
              label="Your message"
              class="form-row-spacing"
              v-bind:message="bag.errors.message"
              v-bind:state="getState('message')"
            >
              <textarea
                :ref="validateFieldName('message')"
                v-bind:name="validateFieldName('message')"
                v-model="bag.data.message"
                v-on:blur="onFieldBlur"
                required
              ></textarea>
            </p-textarea-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Personal data" class="form-section-spacing">
            <p-flex direction="{ base: 'column', m: 'row' }" class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'one-third'}" class="form-grid-item">
                <p-select-wrapper
                  label="Salutation"
                  v-bind:message="bag.errors.salutation"
                  v-bind:state="getState('salutation')"
                >
                  <select
                    :ref="validateFieldName('salutation')"
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
                    <option value="">Choose an option</option>
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
                    :ref="validateFieldName('firstName')"
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
                    :ref="validateFieldName('lastName')"
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
                :ref="validateFieldName('email')"
                v-bind:name="validateFieldName('email')"
                v-model="bag.data.email"
                v-on:blur="onFieldBlur"
                required
              />
            </p-text-field-wrapper>
            <p-text-field-wrapper
              label="Phone number"
              class="form-row-spacing"
              v-bind:message="bag.errors.phone"
              v-bind:state="getState('phone')"
            >
              <input
                type="tel"
                v-bind:name="validateFieldName('phone')"
                v-model="bag.data.phone"
                v-on:blur="onFieldBlur"
              />
            </p-text-field-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Your Porsche" class="form-section-spacing">
            <p-text-field-wrapper
              label="VIN (Vehicle Identification Number)"
              v-bind:message="bag.errors.vin"
              v-bind:state="getState('vin')"
            >
              <input
                type="text"
                :ref="validateFieldName('vin')"
                v-bind:name="validateFieldName('vin')"
                v-model="bag.data.vin"
                v-on:blur="onFieldBlur"
                required
              />
            </p-text-field-wrapper>
            <p-select-wrapper
              label="Gear"
              class="form-row-spacing"
              v-bind:message="bag.errors.gear"
              v-bind:state="getState('gear')"
            >
              <select
                :ref="validateFieldName('gear')"
                v-bind:name="validateFieldName('gear')"
                v-model="bag.data.gear"
                v-on:change="onFieldBlur"
                required
              >
                <option value="">Choose an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
            <p-headline variant="headline-5" tag="h3" class="spacing-mt-24">Date of first registration</p-headline>
            <p-text-field-wrapper
              label="Date"
              class="form-row-spacing"
              v-bind:message="bag.errors.date"
              v-bind:state="getState('date')"
            >
              <input
                type="date"
                :ref="validateFieldName('date')"
                v-bind:name="validateFieldName('date')"
                v-model="bag.data.date"
                v-on:blur="onFieldBlur"
                required
              />
            </p-text-field-wrapper>
            <p-text-field-wrapper
              label="Mileage"
              class="form-row-spacing"
              v-bind:message="bag.errors.mileage"
              v-bind:state="getState('mileage')"
            >
              <input
                type="number"
                :ref="validateFieldName('mileage')"
                v-bind:name="validateFieldName('mileage')"
                v-model="bag.data.mileage"
                v-on:blur="onFieldBlur"
                required
              />
            </p-text-field-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Your Porsche dealer" class="form-section-spacing">
            <p-select-wrapper
              label="Porsche dealer"
              v-bind:message="bag.errors.dealer"
              v-bind:state="getState('dealer')"
            >
              <select
                :ref="validateFieldName('dealer')"
                v-bind:name="validateFieldName('dealer')"
                v-model="bag.data.dealer"
                v-on:change="onFieldBlur"
                required
              >
                <option value="">Choose an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
          </p-fieldset-wrapper>
          <p-flex class="form-section-spacing form-grid-item-container">
            <p-flex-item class="form-grid-item">
              <p-checkbox-wrapper v-bind:message="bag.errors.privacy" v-bind:state="getState('privacy')">
                <span slot="label">I have read and understood the <a href="#" target="_blank">Privacy Policy</a></span>
                <input
                  type="checkbox"
                  :ref="validateFieldName('privacy')"
                  v-bind:name="validateFieldName('privacy')"
                  v-model="bag.data.privacy"
                  v-on:change="onFieldBlur"
                  required
                />
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
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
              <p-button type="submit" class="form-item-width--full form-item-width--auto-s">Send</p-button>
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
  import { boolean, date, number, object, string } from 'yup';
  import {
    validateName,
    getState,
    validateField,
    validateForm,
    ValidationBag,
    getInitialErrors,
    getFirstErrorKey
  } from '../../../utils';

  const initialData = {
    category: '',
    subject: '',
    message: '',
    salutation: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vin: '',
    gear: '',
    date: ('' as unknown) as Date,
    mileage: ('' as unknown) as number,
    dealer: '',
    privacy: false
  };

  type FormModel = typeof initialData;

  @Component
  export default class ExampleContactForm extends Vue {
    private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
    private getState = (field: keyof FormModel) => getState(field, this.bag);

    private bag: ValidationBag<FormModel> = {
      data: { ...initialData },
      errors: getInitialErrors(initialData),
      schema: object<FormModel>({
        category: string().required(),
        subject: string().required(),
        message: string().required(),
        salutation: string().required(),
        title: string(),
        firstName: string().required(),
        lastName: string().required(),
        email: string()
          .email()
          .required(),
        phone: string().required(),
        vin: string()
          .required()
          .min(12)
          .max(17),
        gear: string().required(),
        date: date().required(),
        mileage: number().required(),
        dealer: string().required(),
        privacy: boolean()
          .required()
          .oneOf([true])
      })
    };

    onFieldBlur({ target }: FocusEvent & { target: HTMLInputElement }): void {
      validateField(target.name as keyof FormModel, this.bag);
    }

    async onSubmit(): Promise<void> {
      const isValid = await validateForm(this.bag);
      console.log('isValid', isValid);

      if (!isValid) {
        const firstError = getFirstErrorKey(this.bag);
        (this.$refs[firstError!] as HTMLElement).focus();
      }
    }

    onReset = (): void => {
      this.bag.data = { ...initialData };
      this.bag.errors = getInitialErrors(initialData);
    };
  }
</script>
