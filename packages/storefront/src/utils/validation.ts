import type { SchemaOf } from 'yup';
import { ValidationError } from 'yup';

/* eslint-disable @typescript-eslint/ban-types */
export type ValidationBag<T extends object> = {
  data: T;
  errors: { [key in keyof T]: string };
  schema: SchemaOf<T>;
};

export const getInitialErrors = <T>(data: T): { [key in keyof T]: string } => {
  const errors: { [key in keyof T]: string } = {} as { [key in keyof T]: string };
  Object.keys(data).forEach((key) => (errors[key as keyof T] = ''));
  return errors;
};

export const validateName = <T>(key: keyof T): keyof T => key;

export const getState = <T extends object>(field: keyof T, bag: ValidationBag<T>): 'error' | 'none' =>
  bag.errors[field] ? 'error' : 'none';

export const validateField = async <T extends object>(field: keyof T, bag: ValidationBag<T>): Promise<boolean> => {
  bag.errors[field] = await bag.schema
    .validateAt(field as string, bag.data)
    .then(() => '')
    .catch((err: ValidationError) => err.message);
  return !bag.errors[field];
};

export const validateForm = async <T extends object>(bag: ValidationBag<T>): Promise<boolean> => {
  // reset all errors
  Object.keys(bag.errors).forEach((key) => (bag.errors[key as keyof T] = ''));

  return bag.schema
    .validate(bag.data, { abortEarly: false })
    .then(() => true)
    .catch((err: ValidationError) => {
      err.inner.forEach(({ path, message }) => (bag.errors[path as keyof T] = message));
      return false;
    });
};

export const getFirstErrorKey = <T extends object>(bag: ValidationBag<T>): keyof T | undefined =>
  (Object.keys(bag.errors) as Array<keyof T>).find((key) => bag.errors[key as keyof T] !== '');
