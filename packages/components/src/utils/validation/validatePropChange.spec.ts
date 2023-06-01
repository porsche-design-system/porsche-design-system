import { validatePropChange } from './validatePropChange';

describe('validatePropChange()', () => {
  const data: {
    newVal: Record<string, any>;
    oldVal: Record<string, any>;
    propertyName: string;
    arrayOfRelevantPropNames: string[];
    result: boolean;
  }[] = [
    {
      newVal: { foo: 'bar', bar: 'foo' },
      oldVal: { foo: 'foo', bar: 'foo' },
      propertyName: 'fullscreen',

      arrayOfRelevantPropNames: ['size'],
      result: true,
    },
    {
      newVal: { foo: 'bar', bar: 'foo' },
      oldVal: { foo: 'foo', bar: 'foo' },
      propertyName: 'fullscreen',
      arrayOfRelevantPropNames: ['size', 'fullscreen'],
      result: true,
    },
    {
      newVal: { foo: 'bar', bar: 'foo' },
      oldVal: { foo: 'bar', bar: 'foo' },
      propertyName: 'fullscreen',
      arrayOfRelevantPropNames: ['size', 'fullscreen'],
      result: false,
    },
  ];
  it.each(
    data.map(({ newVal, oldVal, propertyName, arrayOfRelevantPropNames, result }) => [
      newVal,
      oldVal,
      propertyName,
      arrayOfRelevantPropNames,
      result,
    ])
  )(
    `should be called with newVal: '%s' oldVal: '%s', propertyName: '%s' and arrayOfRelevantPropNames: %s and return '%s'`,
    (newVal, oldVal, propertyName, arrayOfRelevantPropNames, result) => {
      expect(validatePropChange(newVal, oldVal, propertyName, arrayOfRelevantPropNames)).toEqual(result);
    }
  );
});
