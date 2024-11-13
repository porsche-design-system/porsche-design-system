import { expect } from '@jest/globals';
import type { ComponentInterface } from '@stencil/core';
import * as stencilCore from '@stencil/core';
import { ControllerHost, type ReactiveController } from './controller-host';

class SomeComponent implements ComponentInterface {
  // @ts-ignore
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: <explanation>
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
  expect(connectedCallbackSpy).toHaveBeenCalledTimes(1);

  someComponent.disconnectedCallback();
  expect(disconnectedCallbackSpy).toHaveBeenCalledTimes(1);

  someComponent.componentWillLoad();
  expect(componentWillLoadSpy).toHaveBeenCalledTimes(1);

  someComponent.componentDidLoad();
  expect(componentDidLoadSpy).toHaveBeenCalledTimes(1);

  someComponent.componentWillUpdate();
  expect(componentWillUpdateSpy).toHaveBeenCalledTimes(1);

  someComponent.componentDidUpdate();
  expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);
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
    expect(hostConnectedSpy).toHaveBeenCalledTimes(1);

    someComponent.disconnectedCallback();
    expect(hostDisconnectedSpy).toHaveBeenCalledTimes(1);

    someComponent.componentWillLoad();
    expect(hostWillLoadSpy).toHaveBeenCalledTimes(1);

    someComponent.componentDidLoad();
    expect(hostDidLoadSpy).toHaveBeenCalledTimes(1);

    someComponent.componentWillUpdate();
    expect(hostWillUpdateSpy).toHaveBeenCalledTimes(1);

    someComponent.componentDidUpdate();
    expect(hostDidUpdateSpy).toHaveBeenCalledTimes(1);
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
    expect(hostConnectedSpy).toHaveBeenCalledTimes(0);

    someComponent.disconnectedCallback();
    expect(hostDisconnectedSpy).toHaveBeenCalledTimes(0);

    someComponent.componentWillLoad();
    expect(hostWillLoadSpy).toHaveBeenCalledTimes(0);

    someComponent.componentDidLoad();
    expect(hostDidLoadSpy).toHaveBeenCalledTimes(0);

    someComponent.componentWillUpdate();
    expect(hostWillUpdateSpy).toHaveBeenCalledTimes(0);

    someComponent.componentDidUpdate();
    expect(hostDidUpdateSpy).toHaveBeenCalledTimes(0);
  });
});

describe('requestUpdate()', () => {
  it('should call forceUpdate() with correct parameter', () => {
    const someComponent = new SomeComponent();
    const controllerHost = new ControllerHost(someComponent);
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    controllerHost.requestUpdate();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(someComponent);
  });
});
