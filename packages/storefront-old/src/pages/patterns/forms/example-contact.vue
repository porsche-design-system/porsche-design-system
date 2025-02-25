<template>
  <p-content-wrapper :theme="storefrontTheme">
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-heading :theme="storefrontTheme" size="x-large" tag="h1">Get in touch with Porsche</p-heading>
        <p-text :theme="storefrontTheme" size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">
          Do you have any specific questions about your Porsche vehicle? Please use the form below so that we can
          process your inquiry as quickly as possible.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate @submit.prevent="onSubmit">
          <p-fieldset :theme="storefrontTheme" label="Your message">
            <p-flex class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
                <p-select-wrapper
                  :theme="storefrontTheme"
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
                    <option value hidden></option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
            </p-flex>
            <p-text-field-wrapper
              :theme="storefrontTheme"
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
              :theme="storefrontTheme"
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
          </p-fieldset>
          <p-fieldset :theme="storefrontTheme" label="Personal data" class="form-section-spacing">
            <p-flex direction="{ base: 'column', m: 'row' }" class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'one-third'}" class="form-grid-item">
                <p-select-wrapper
                  :theme="storefrontTheme"
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
                    <option value hidden></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
              <p-flex-item
                width="{base: 'full', m: 'one-third'}"
                class="form-row-spacing form-row-spacing--zero-m form-grid-item"
              >
                <p-select-wrapper :theme="storefrontTheme" label="Title">
                  <select v-bind:name="validateFieldName('title')" v-model="bag.data.title">
                    <option value></option>
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
                  :theme="storefrontTheme"
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
                  :theme="storefrontTheme"
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
              :theme="storefrontTheme"
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
              :theme="storefrontTheme"
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
          </p-fieldset>
          <p-fieldset :theme="storefrontTheme" label="Your Porsche" class="form-section-spacing">
            <p-text-field-wrapper
              :theme="storefrontTheme"
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
              :theme="storefrontTheme"
              label="Transmission"
              class="form-row-spacing"
              v-bind:message="bag.errors.gear"
              v-bind:state="getState('gear')"
            >
              <select
                :ref="validateFieldName('gear')"
                v-bind:name="validateFieldName('gear')"
                v-model="bag.data.gear"
                v-on:change="onFieldBlur"
              >
                <option value></option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
            <p-heading :theme="storefrontTheme" size="small" tag="h2" class="spacing-mt-24"
              >Date of first registration</p-heading
            >
            <p-text-field-wrapper
              :theme="storefrontTheme"
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
              :theme="storefrontTheme"
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
          </p-fieldset>
          <p-fieldset :theme="storefrontTheme" label="Your Porsche dealer" class="form-section-spacing">
            <p-select-wrapper
              :theme="storefrontTheme"
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
                <option value hidden></option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
          </p-fieldset>
          <p-flex class="form-section-spacing form-grid-item-container">
            <p-flex-item class="form-grid-item">
              <p-checkbox-wrapper
                :theme="storefrontTheme"
                v-bind:message="bag.errors.privacy"
                v-bind:state="getState('privacy')"
              >
                <span slot="label" id="privacy">
                  I have read and understood the
                  <a target="_blank">Privacy Policy</a>
                </span>
                <input
                  type="checkbox"
                  :ref="validateFieldName('privacy')"
                  v-bind:name="validateFieldName('privacy')"
                  v-model="bag.data.privacy"
                  v-on:change="onFieldBlur"
                  required
                  aria-labelledby="privacy"
                />
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
          <p-button-group class="form-section-spacing form-bottom-spacing">
            <p-button :theme="storefrontTheme" type="submit">Send</p-button>
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
import { boolean, date, number, object, string } from 'yup';
import { validateName, getState, validateField, validateForm, getInitialErrors, getFirstErrorKey } from '@/utils';

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
  date: '' as unknown as Date,
  mileage: '' as unknown as number,
  dealer: '',
  privacy: false,
};

type FormModel = typeof initialData;

@Component
export default class ExampleContactForm extends Vue {
  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  private validateFieldName: (field: keyof FormModel) => keyof FormModel = validateName;
  private getState = (field: keyof FormModel) => getState(field, this.bag);

  private bag: ValidationBag<FormModel> = {
    data: { ...initialData },
    errors: getInitialErrors(initialData),
    schema: object({
      category: string().required('What kind of request do you have?'),
      subject: string().required('Let us know what your inquiry is about'),
      message: string().required(
        'Describe your request in a few sentences. This will help us to find a suitable contact person for you'
      ),
      salutation: string().required('Please select a form of salutation'),
      title: string().defined(),
      firstName: string().required('Please enter your name'),
      lastName: string().required('Please enter your last name'),
      email: string().email('Email address seems invalid').required('Please enter your email address'),
      phone: string().defined(),
      vin: string().required('We can’t find the vehicle. Please check your entry'),
      gear: string().required('Please tell us the type of your vehicles transmission'),
      date: date()
        .required('Please enter the date of first registration')
        .typeError('Please enter the date of first registration'),
      mileage: number().required('What is the mileage of your Porsche?').typeError('Please enter the current mileage'),
      dealer: string().required('Please choose a Porsche Dealer of your choice'),
      privacy: boolean()
        .required('Please accept our privacy policy so that we can process your request')
        .oneOf([true], 'Please accept our privacy policy so that we can process your request'),
    }),
  };

  onFieldBlur({ target }: FocusEvent & { target: HTMLInputElement }): void {
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

  onReset = (): void => {
    this.bag.data = { ...initialData };
    this.bag.errors = getInitialErrors(initialData);
  };
}
</script>
