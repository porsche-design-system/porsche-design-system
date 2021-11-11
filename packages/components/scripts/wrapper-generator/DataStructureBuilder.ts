import type { TagName } from '@porsche-design-system/shared';
import { InputParser } from './InputParser';

export type ExtendedProp = {
  key: string;
  rawValueType: string;
  hasToBeMapped: boolean;
  canBeObject: boolean;
  canBeUndefined: boolean;
  isEvent: boolean;
  defaultValue: string;
};

export class DataStructureBuilder {
  private static _instance: DataStructureBuilder;
  private readonly inputParser: InputParser;

  constructor(inputParser: InputParser) {
    this.inputParser = inputParser;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this(InputParser.Instance));
  }

  private splitLiteralTypeToNonPrimitiveTypes(literalType: string): string[] {
    return literalType
      .split(/[<>,|&]/) // split complex generic types like union types or type literals => e.g. Extract<TextColor, "default" | "inherit">
      .map((x) => x.trim())
      .filter((x) => x.match(/[A-Z]\w*/)); // Check for non-primitive types
  }

  public extractNonPrimitiveTypes(input: string, isNonPrimitiveType: boolean = false): string[] {
    const whitelistedTypes = ['CustomEvent', 'InputEvent', 'Pick', 'Omit', 'Exclude', 'Extract', 'T', 'T[]'];
    const nonPrimitiveTypes: string[] = [];

    const handleCustomGenericTypes = (nonPrimitiveType: string) => {
      if (!whitelistedTypes.includes(nonPrimitiveType)) {
        // extract potential generic and array
        const [, genericType] = /<(.*)>/.exec(nonPrimitiveType) ?? [];
        const [, genericRootType] = /([A-Z]\w*)</.exec(nonPrimitiveType) ?? [];
        const [, arrayType] = /^([A-Z]\w+)\[]$/.exec(nonPrimitiveType) ?? [];

        if (genericType) {
          if (!whitelistedTypes.includes(genericRootType)) {
            nonPrimitiveTypes.push(genericRootType);
          }
          const genericTypes = this.splitLiteralTypeToNonPrimitiveTypes(genericType);
          genericTypes.forEach(handleCustomGenericTypes);
        } else if (arrayType && !whitelistedTypes.includes(arrayType)) {
          nonPrimitiveTypes.push(arrayType);
        } else {
          nonPrimitiveTypes.push(nonPrimitiveType);
        }
      }
    };

    if (isNonPrimitiveType) {
      handleCustomGenericTypes(input);
    } else {
      // extract non primitive types which we need to import
      const regex = /: ([A-Z].*?)(?:\)|;)/g;
      let typeMatch = regex.exec(input);

      while (typeMatch !== null) {
        const [, nonPrimitiveType] = typeMatch;
        handleCustomGenericTypes(nonPrimitiveType);
        typeMatch = regex.exec(input); // loop again in case of multiple matches
      }
    }

    // get rid of duplicates
    return nonPrimitiveTypes.filter((x, i, a) => a.indexOf(x) === i);
  }

  // Recursively check prop value for type of object
  private valueCanBeObject(propValue: string, sharedTypes: string): boolean {
    let result = false;

    // detect objects, arrays and generic T
    if (propValue.includes('{') || propValue.includes('[') || !!propValue.match(/T[^\w]/)) {
      result = true;
    } else {
      if (propValue.match(/[A-Z]/g)) {
        // Extract all types to check recursively e.g. "TextSize | BreakpointCustomizable<boolean> | CustomSize" etc.
        const nonPrimitiveTypes = this.splitLiteralTypeToNonPrimitiveTypes(propValue)
          .map((x) => this.extractNonPrimitiveTypes(x, true))
          .flat();

        for (const nonPrimitiveType of nonPrimitiveTypes) {
          // Extract typeDefinition of every nonPrimitiveType found before
          const [, typeDef] =
            new RegExp(`(?:type|interface) ${nonPrimitiveType}(?:<.*>)? = ((?:.|\\s)*?);`).exec(sharedTypes) ?? [];

          if (typeDef && this.valueCanBeObject(typeDef, sharedTypes)) {
            result = true;
          }
        }
      } else {
        result = false;
      }
    }
    return result;
  }

  private convertToExtendedProp(
    component: TagName,
    propKey: string,
    propValueType: string,
    sharedTypes: string
  ): ExtendedProp {
    const isEvent = !!propKey.match(/^on[A-Z]/);
    const isCallback = !isEvent && !!propValueType.match(/=>/);
    const canBeObject = !isEvent && this.valueCanBeObject(propValueType, sharedTypes);
    const extendedProp: ExtendedProp = {
      key: propKey,
      rawValueType: propValueType,
      hasToBeMapped: (!isEvent && !!propKey.match(/[A-Z]/g)) || canBeObject,
      canBeObject: canBeObject && !isCallback,
      canBeUndefined: !!propValueType.match(/undefined/),
      isEvent: isEvent,
      defaultValue: !isEvent ? this.inputParser.getDefaultValueForProp(component, propKey) : '',
    };
    return extendedProp;
  }

  // Enrich parsedInterface with meta information for further processing
  public convertToExtendedProps(component: TagName): ExtendedProp[] {
    const parsedInterface = this.inputParser.getComponentInterface(component);
    const sharedTypes = this.inputParser.getSharedTypes();

    return Object.entries(parsedInterface).map(([propKey, propValueType]) =>
      this.convertToExtendedProp(component, propKey, propValueType, sharedTypes)
    );
  }
}
