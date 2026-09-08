import { afterEach, describe, expect, it, vi } from 'vitest';
import { DataStructureBuilder } from '../../../../components/scripts/wrapper-generator/DataStructureBuilder';
import { InputParser } from '../../../../components/scripts/wrapper-generator/InputParser';
import { NextJsReactWrapperGenerator } from '../../../../components/scripts/wrapper-generator/NextJsReactWrapperGenerator';
import { ReactWrapperGenerator } from '../../../../components/scripts/wrapper-generator/ReactWrapperGenerator';

describe('ReactWrapperGenerator event typings', () => {
  const parser = InputParser.Instance;
  const generator = new ReactWrapperGenerator();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates DOM-safe hosts and custom events without changing the shared parser output', () => {
    const rawProps = parser.getRawComponentInterface('p-input-number');
    const props = generator.generateProps('p-input-number', rawProps);

    expect(rawProps).toContain('onInput?: (event: CustomEvent<InputNumberInputEventDetail>) => void;');
    expect(props).toContain('onInput?: (event: PInputNumberInputEvent) => void;');
    expect(props).toContain('export interface PInputNumberInputEvent extends CustomEvent<InputNumberInputEventDetail>');
    expect(props).toContain(
      'export interface PInputNumberChangeEvent extends CustomEvent<InputNumberChangeEventDetail>'
    );
    expect(props).toContain('export interface PInputNumberBlurEvent extends CustomEvent<InputNumberBlurEventDetail>');
    expect(props).not.toContain('PInputNumberCustomEvent');
    expect(props).not.toMatch(/\b(?:type|interface) InputNumberInputEvent\b/);
    expect(props).toContain(
      'export type PInputNumberProps = Omit<BaseProps, keyof InputNumberEventHandlers> & InputNumberProperties & InputNumberEventHandlers;'
    );
    expect(props).toContain('export interface PInputNumberElement extends HTMLElement, InputNumberProperties {');
    expect(props).not.toContain('Omit<HTMLElement');
    expect(props).toContain('target: PInputNumberElement;');
    expect(parser.getRawComponentInterface('p-input-number')).toBe(rawProps);
  });

  it('generates identical CSR and SSR props', () => {
    const rawProps = parser.getRawComponentInterface('p-input-number');
    expect(new NextJsReactWrapperGenerator().generateProps('p-input-number', rawProps)).toBe(
      generator.generateProps('p-input-number', rawProps)
    );
  });

  it('preserves components without custom events', () => {
    const rawProps = parser.getRawComponentInterface('p-button');
    expect(generator.generateProps('p-button', rawProps)).toBe(`export type PButtonProps = BaseProps & ${rawProps};`);
  });

  it('preserves generic component and nested event detail parameters', () => {
    vi.spyOn(parser, 'hasGeneric').mockReturnValue(true);
    const props = generator.generateProps(
      'p-table',
      '{ rows?: T[]; onUpdate?: (event: CustomEvent<Array<T>>) => void; }'
    );

    expect(props).toContain('interface TableProperties<T>');
    expect(props).toContain('interface TableEventHandlers<T>');
    expect(props).toContain('interface TableEventMap<T>');
    expect(props).toContain("'update': PTableUpdateEvent<T>;");
    expect(props).toContain(
      'addEventListener<K extends keyof TableEventMap<T>>(type: K, listener: (this: PTableElement<T>, event: TableEventMap<T>[K]) => void'
    );
    expect(props).toContain('export type PTableProps<T>');
    expect(props).toContain('export interface PTableElement<T> extends HTMLElement, TableProperties<T>');
    expect(props).toContain('onUpdate?: (event: PTableUpdateEvent<T>) => void;');
    expect(props).toContain('export interface PTableUpdateEvent<T> extends CustomEvent<Array<T>>');
    expect(props).toContain('target: PTableElement<T>;');
  });

  it('generates separate concrete types for multiple handlers on one line', () => {
    const props = generator.generateProps(
      'p-input-number',
      '{ onInput?: (event: CustomEvent<InputEvent>) => void; onBlur?: (event: CustomEvent<Event>) => void; }'
    );

    expect(props).toContain('onInput?: (event: PInputNumberInputEvent) => void;');
    expect(props).toContain('onBlur?: (event: PInputNumberBlurEvent) => void;');
    expect(props).toContain('export interface PInputNumberInputEvent extends CustomEvent<InputEvent>');
    expect(props).toContain('export interface PInputNumberBlurEvent extends CustomEvent<Event>');
  });

  it('separates properties and callbacks while preserving comments, optionality, and nested members', () => {
    const props = generator.generateProps(
      'p-input-number',
      `{
  /** Required name. */
  name: string;
  /** Optional options. */
  options?: {
    value: number;
    onInput: string;
  };
  /** Input notification. */
  onInput?: (
    event: CustomEvent<{
      value: number;
    }>
  ) => void;
}`
    );
    const properties = props.slice(0, props.indexOf('interface InputNumberEventHandlers'));
    const eventHandlers = props.slice(
      props.indexOf('interface InputNumberEventHandlers'),
      props.indexOf('export type PInputNumberProps')
    );

    expect(properties).toContain('/** Required name. */\n  name: string;');
    expect(properties).toContain('/** Optional options. */\n  options?: {');
    expect(properties).toContain('onInput: string;');
    expect(properties).not.toContain('Input notification');
    expect(eventHandlers).toContain('/** Input notification. */\n  onInput?: (');
    expect(eventHandlers).toContain('event: PInputNumberInputEvent');
    expect(eventHandlers).not.toContain('options');
    expect(props).toContain('extends CustomEvent<{\n      value: number;\n    }>');
  });

  it('rejects unsupported callback types instead of generating an untyped event', () => {
    expect(() => generator.generateProps('p-input-number', '{ onInput?: (event: Event) => void; }')).toThrow(
      'Expected a CustomEvent callback for p-input-number.onInput'
    );
  });

  it('generates custom, native and fallback listener overloads in that order for both methods', () => {
    const props = generator.generateProps('p-input-number', parser.getRawComponentInterface('p-input-number'));

    expect(props).toContain("interface InputNumberEventMap {\n  'blur': PInputNumberBlurEvent;");
    expect(props).toContain("'input': PInputNumberInputEvent;");
    expect(props).not.toContain('export interface InputNumberEventMap');
    for (const method of ['addEventListener', 'removeEventListener']) {
      const optionsType = method === 'addEventListener' ? 'AddEventListenerOptions' : 'EventListenerOptions';
      const custom = `${method}<K extends keyof InputNumberEventMap>(type: K, listener: (this: PInputNumberElement, event: InputNumberEventMap[K]) => void, options?: boolean | ${optionsType}): void;`;
      const native = `${method}<K extends keyof HTMLElementEventMap>`;
      const fallback = `${method}(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | ${optionsType}): void;`;

      expect(props).toContain(custom);
      expect(props).toContain(native);
      expect(props).toContain(fallback);
      expect(props.indexOf(custom)).toBeLessThan(props.indexOf(native));
      expect(props.indexOf(native)).toBeLessThan(props.indexOf(fallback));
    }
  });

  it('uses the same camel-cased DOM event names as the runtime listeners', () => {
    const props = generator.generateProps('p-modal', parser.getRawComponentInterface('p-modal'));

    expect(props).toContain("'motionHiddenEnd': PModalMotionHiddenEndEvent;");
    expect(props).toContain("'motionVisibleEnd': PModalMotionVisibleEndEvent;");
    expect(props).not.toContain("'onMotionHiddenEnd'");
  });

  it.each([ReactWrapperGenerator, NextJsReactWrapperGenerator])(
    'uses the generated host type for forwarded and internal refs in %s',
    (Generator) => {
      const wrapper = new Generator().generateComponent(
        'p-input-number',
        DataStructureBuilder.Instance.convertToExtendedProps('p-input-number')
      );

      expect(wrapper).toContain('ref: ForwardedRef<PInputNumberElement>');
      expect(wrapper).toContain('useRef<PInputNumberElement | undefined>(undefined)');
    }
  );

  it('preserves HTMLElement refs for components without custom events', () => {
    const wrapper = generator.generateComponent(
      'p-button',
      DataStructureBuilder.Instance.convertToExtendedProps('p-button')
    );

    expect(wrapper).toContain('ref: ForwardedRef<HTMLElement>');
    expect(wrapper).toContain('useRef<HTMLElement | undefined>(undefined)');
  });

  it('preserves generic parameters in element refs', () => {
    vi.spyOn(parser, 'hasGeneric').mockReturnValue(true);
    const wrapper = generator.generateComponent(
      'p-table',
      DataStructureBuilder.Instance.convertToExtendedProps('p-table')
    );

    expect(wrapper).toContain('ref: ForwardedRef<PTableElement<T>>');
    expect(wrapper).toContain('useRef<PTableElement<T> | undefined>(undefined)');
  });
});
