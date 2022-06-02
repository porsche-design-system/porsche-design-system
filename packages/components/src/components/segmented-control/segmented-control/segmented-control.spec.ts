import { SegmentedControl } from './segmented-control';
import * as childrenObserverUtils from '../../../utils/children-observer';
import * as segmentedControlUtils from './segmented-control-utils';

describe('connectedCallback', () => {
  it('should call observeChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');

    component.connectedCallback();
    expect(spy).toBeCalledWith(component.host, expect.any(Function));
  });
});

describe('componentWillRender', () => {
  it('should call syncItemsProps() with correct parameters', () => {
    const spy = jest.spyOn(segmentedControlUtils, 'syncItemsProps');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host, component.value, component.backgroundColor, component.theme);
  });
});

describe('componentDidLoad', () => {
  it('should add click event listener', () => {
    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');
    const spy = jest.spyOn(component.host, 'addEventListener');

    component.componentDidLoad();
    expect(spy).toBeCalledWith('click', expect.any(Function));
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    const component = new SegmentedControl();
    component.host = document.createElement('p-segmented-control');

    component.disconnectedCallback();
    expect(spy).toBeCalledWith(component.host);
  });
});
