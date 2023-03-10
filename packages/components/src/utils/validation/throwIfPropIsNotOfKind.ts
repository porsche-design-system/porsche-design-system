import { throwIfPropIsUndefined } from './throwIfPropIsUndefined';

export const throwIfPropIsNotOfKind = <T>(element: HTMLElement, propName: string, expectedValue: T): void => {
  const propValue = element[propName];
  throwIfPropIsUndefined(element, propName, propValue);

  if (propValue !== expectedValue) {
    throw new Error(
      `The required property '${propName}' of ${element} should have '${expectedValue}' as value but instead got '${propValue}' `
    );
  }
};
