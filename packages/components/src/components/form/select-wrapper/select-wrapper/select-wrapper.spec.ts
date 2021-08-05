import * as domUtils from '../../../../utils/dom';
import { SelectWrapper } from './select-wrapper';

describe('select-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new SelectWrapper();
      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'select');
    });

    it('should call observeSelect()', () => {
      const component = new SelectWrapper();
      component['select'] = document.createElement('select');
      jest.spyOn(component, 'setSelect' as any).mockImplementation();
      const spy = jest.spyOn(component, 'observeSelect' as any);
      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('componentWillLoad', () => {
    describe('for native dropdown', () => {
      const initComponent = (): SelectWrapper => {
        const component = new SelectWrapper();
        component.native = true;

        return component;
      };

      it.each(['setOptionMaps', 'observeOptions'])('should not call %s()', (fn) => {
        const component = initComponent();
        const spy = jest.spyOn(component, fn as any);
        component.componentWillLoad();

        expect(spy).toBeCalledTimes(0);
      });
    });

    describe('for custom dropdown', () => {
      const initComponent = (): SelectWrapper => {
        const component = new SelectWrapper();
        component.host = document.createElement('p-select-wrapper');
        component.host.attachShadow({ mode: 'open' });
        component['select'] = document.createElement('select');

        return component;
      };

      it.each(['setOptionMaps', 'observeOptions'])('should call %s()', (fn) => {
        const component = initComponent();
        const spy = jest.spyOn(component, fn as any);
        component.componentWillLoad();

        expect(spy).toBeCalledTimes(1);
      });
    });
  });
});
