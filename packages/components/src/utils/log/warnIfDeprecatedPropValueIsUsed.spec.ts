import * as loggerUtils from './logger';
import * as helperUtils from './helper';
import { warnIfDeprecatedPropValueIsUsed } from './warnIfDeprecatedPropValueIsUsed';

const warningMessage1 =
  "prop='deprecatedValue' is deprecated for component span and will be removed with next major release.";
const warningMessage2 = "Please use prop='value' instead.";

class SomeInstance {
  host = document.createElement('span');
  prop: string | boolean | number = undefined;
}

const SOME_INSTANCE_PROP_DEPRECATED = ['deprecatedValue'] as const;
type SomeInstancePropDeprecated = (typeof SOME_INSTANCE_PROP_DEPRECATED)[number];
const SOME_INSTANCE_PROP = ['value', ...SOME_INSTANCE_PROP_DEPRECATED] as const;
type SomeInstanceProp = (typeof SOME_INSTANCE_PROP)[number];

it('should call getDeprecatedPropOrSlotWarningMessage() with correct parameters when prop value is key of deprecationMap and set deprecatedPropWarningMessage', () => {
  const instance = new SomeInstance();
  instance.prop = 'deprecatedValue';
  const getDeprecatedPropOrSlotWarningMessageSpy = jest.spyOn(helperUtils, 'getDeprecatedPropOrSlotWarningMessage');
  const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn').mockImplementation();

  warnIfDeprecatedPropValueIsUsed<typeof SomeInstance, SomeInstancePropDeprecated, SomeInstanceProp>(instance, 'prop', {
    deprecatedValue: 'value',
  });

  expect(getDeprecatedPropOrSlotWarningMessageSpy).toHaveBeenCalledWith(instance.host, "prop='deprecatedValue'");
  expect(consoleWarnSpy).toHaveBeenCalledWith(warningMessage1, warningMessage2, instance.host);
});

it('should not call getDeprecatedPropOrSlotWarningMessage() when prop value is not a key of deprecationMap', () => {
  const instance = new SomeInstance();
  const spy = jest.spyOn(helperUtils, 'getDeprecatedPropOrSlotWarningMessage');

  warnIfDeprecatedPropValueIsUsed<typeof SomeInstance, SomeInstancePropDeprecated, SomeInstanceProp>(instance, 'prop', {
    deprecatedValue: 'value',
  });

  expect(spy).not.toHaveBeenCalled();
});

it('should call consoleWarn() with correct parameters when prop value is key of deprecationMap', () => {
  const instance = new SomeInstance();
  instance.prop = 'deprecatedValue';
  const spy = jest.spyOn(loggerUtils, 'consoleWarn').mockImplementation();

  warnIfDeprecatedPropValueIsUsed<typeof SomeInstance, SomeInstancePropDeprecated, SomeInstanceProp>(instance, 'prop', {
    deprecatedValue: 'value',
  });

  expect(spy).toHaveBeenCalledWith(warningMessage1, warningMessage2, instance.host);
});

it('should not call consoleWarn() when prop value is not a key of deprecationMap', () => {
  const instance = new SomeInstance();
  const spy = jest.spyOn(loggerUtils, 'consoleWarn').mockImplementation();

  warnIfDeprecatedPropValueIsUsed<typeof SomeInstance, SomeInstancePropDeprecated, SomeInstanceProp>(instance, 'prop', {
    deprecatedValue: 'value',
  });

  expect(spy).not.toHaveBeenCalled();
});
