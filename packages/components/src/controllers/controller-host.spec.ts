import { ControllerHost, type ReactiveController } from './controller-host';
import type { ComponentInterface } from '@stencil/core';
import * as stencilCore from '@stencil/core';
import { expect } from '@jest/globals';

class SomeComponent implements ComponentInterface {
  // @ts-ignore
  private controllerHost = new ControllerHost(this);

  connectedCallback(): void {}
  disconnectedCallback(): void {}
  componentWillLoad(): void {}
  componentDidLoad(): void {}
  componentWillUpdate(): void {}
  componentDidUpdate(): void {}
}

class TestController implements ReactiveController {
  public hostConnected(): void {}
  public hostDisconnected(): void {}
  public hostWillUpdate(): void {}
  public hostDidUpdate(): void {}
  public hostWillLoad(): void {}
  public hostDidLoad(): void {}
}

it('should call regular lifecycle hooks of component', () => {
  const someComponent = new SomeComponent();

  const connectedCallbackSpy = jest.spyOn(someComponent, 'connectedCallback');
  const disconnectedCallbackSpy = jest.spyOn(someComponent, 'disconnectedCallback');
  const componentWillLoadSpy = jest.spyOn(someComponent, 'componentWillLoad');
  const componentDidLoadSpy = jest.spyOn(someComponent, 'componentDidLoad');
  const componentWillUpdateSpy = jest.spyOn(someComponent, 'componentWillUpdate');
  const componentDidUpdateSpy = jest.spyOn(someComponent, 'componentDidUpdate');

  someComponent.connectedCallback();
  expect(connectedCallbackSpy).toBeCalledTimes(1);

  someComponent.disconnectedCallback();
  expect(disconnectedCallbackSpy).toBeCalledTimes(1);

  someComponent.componentWillLoad();
  expect(componentWillLoadSpy).toBeCalledTimes(1);

  someComponent.componentDidLoad();
  expect(componentDidLoadSpy).toBeCalledTimes(1);

  someComponent.componentWillUpdate();
  expect(componentWillUpdateSpy).toBeCalledTimes(1);

  someComponent.componentDidUpdate();
  expect(componentDidUpdateSpy).toBeCalledTimes(1);
});

describe('addController()', () => {
  it('should add ReactiveController to controllers', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    expect(controllerHost['controllers'].size).toBe(0);

    const testCtrl = new TestController();
    controllerHost.addController(testCtrl);
    expect(controllerHost['controllers'].size).toBe(1);
    expect(Array.from(controllerHost['controllers'].values())[0]).toBe(testCtrl);
  });

  it('should call lifecycle hooks of added ReactiveController', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    const testCtrl = new TestController();
    controllerHost.addController(testCtrl);

    const hostConnectedSpy = jest.spyOn(testCtrl, 'hostConnected');
    const hostDisconnectedSpy = jest.spyOn(testCtrl, 'hostDisconnected');
    const hostWillUpdateSpy = jest.spyOn(testCtrl, 'hostWillUpdate');
    const hostDidUpdateSpy = jest.spyOn(testCtrl, 'hostDidUpdate');
    const hostWillLoadSpy = jest.spyOn(testCtrl, 'hostWillLoad');
    const hostDidLoadSpy = jest.spyOn(testCtrl, 'hostDidLoad');

    someComponent.connectedCallback();
    expect(hostConnectedSpy).toBeCalledTimes(1);

    someComponent.disconnectedCallback();
    expect(hostDisconnectedSpy).toBeCalledTimes(1);

    someComponent.componentWillLoad();
    expect(hostWillLoadSpy).toBeCalledTimes(1);

    someComponent.componentDidLoad();
    expect(hostDidLoadSpy).toBeCalledTimes(1);

    someComponent.componentWillUpdate();
    expect(hostWillUpdateSpy).toBeCalledTimes(1);

    someComponent.componentDidUpdate();
    expect(hostDidUpdateSpy).toBeCalledTimes(1);
  });
});

describe('removeController()', () => {
  it('should remove ReactiveController from controllers', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    const testCtrl = new TestController();

    controllerHost.addController(testCtrl);
    expect(controllerHost['controllers'].size).toBe(1);

    controllerHost.removeController(testCtrl);
    expect(controllerHost['controllers'].size).toBe(0);
  });

  it('should not call lifecycle hooks of removed ReactiveController', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    const testCtrl = new TestController();
    controllerHost.addController(testCtrl);
    controllerHost.removeController(testCtrl);

    const hostConnectedSpy = jest.spyOn(testCtrl, 'hostConnected');
    const hostDisconnectedSpy = jest.spyOn(testCtrl, 'hostDisconnected');
    const hostWillUpdateSpy = jest.spyOn(testCtrl, 'hostWillUpdate');
    const hostDidUpdateSpy = jest.spyOn(testCtrl, 'hostDidUpdate');
    const hostWillLoadSpy = jest.spyOn(testCtrl, 'hostWillLoad');
    const hostDidLoadSpy = jest.spyOn(testCtrl, 'hostDidLoad');

    someComponent.connectedCallback();
    expect(hostConnectedSpy).toBeCalledTimes(0);

    someComponent.disconnectedCallback();
    expect(hostDisconnectedSpy).toBeCalledTimes(0);

    someComponent.componentWillLoad();
    expect(hostWillLoadSpy).toBeCalledTimes(0);

    someComponent.componentDidLoad();
    expect(hostDidLoadSpy).toBeCalledTimes(0);

    someComponent.componentWillUpdate();
    expect(hostWillUpdateSpy).toBeCalledTimes(0);

    someComponent.componentDidUpdate();
    expect(hostDidUpdateSpy).toBeCalledTimes(0);
  });
});

describe('requestUpdate()', () => {
  it('should call forceUpdate() with correct parameter', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    controllerHost.requestUpdate();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(someComponent);
  });
});
