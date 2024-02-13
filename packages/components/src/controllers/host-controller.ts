import { type ComponentInterface, forceUpdate } from '@stencil/core';

// inspired by lit
// https://github.com/lit/lit/blob/59d5ba7649f2957d01996e3115d0d79bdfbf34ac/packages/reactive-element/src/reactive-controller.ts#L11

/**
 * An object that can host Reactive Controllers and call their lifecycle
 * callbacks.
 */
export type ReactiveControllerHost<T extends object> = {
  host: ComponentInterface & T;

  /**
   * Adds a controller to the host, which sets up the controller's lifecycle
   * methods to be called with the host's lifecycle.
   */
  addController(controller: ReactiveController): void;

  /**
   * Removes a controller from the host.
   */
  removeController(controller: ReactiveController): void;

  /**
   * Requests a host update which is processed asynchronously. The update can
   * be waited on via the `updateComplete` property.
   */
  requestUpdate(): void;

  /**
   * Returns a Promise that resolves when the host has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * @return A promise of a boolean that indicates if the update resolved
   *     without triggering another update.
   */
  // readonly updateComplete: Promise<boolean>;
};

/**
 * A Reactive Controller is an object that enables sub-component code
 * organization and reuse by aggregating the state, behavior, and lifecycle
 * hooks related to a single feature.
 *
 * Controllers are added to a host component, or other object that implements
 * the `ReactiveControllerHost` interface, via the `addController()` method.
 * They can hook their host components's lifecycle by implementing one or more
 * of the lifecycle callbacks, or initiate an update of the host component by
 * calling `requestUpdate()` on the host.
 */
export type ReactiveController = {
  /**
   * Called when the host is connected to the component tree. For custom
   * element hosts, this corresponds to the `connectedCallback()` lifecycle,
   * which is only called when the component is connected to the document.
   */
  hostConnected?(): void;

  /**
   * Called when the host is disconnected from the component tree. For custom
   * element hosts, this corresponds to the `disconnectedCallback()` lifecycle,
   * which is called the host or an ancestor component is disconnected from the
   * document.
   */
  hostDisconnected?(): void;

  /**
   * Called during the client-side host update, just before the host calls
   * its own update.
   *
   * Code in `update()` can depend on the DOM as it is not called in
   * server-side rendering.
   */
  hostWillUpdate?(): void;

  /**
   * Called after a host update, just before the host calls firstUpdated and
   * updated. It is not called in server-side rendering.
   */
  hostDidUpdate?(): void;

  hostWillLoad?(): void;
  hostDidLoad?(): void;
};

export class ControllerHost<T extends object> implements ReactiveControllerHost<T> {
  private controllers = new Set<ReactiveController>();

  public constructor(public host: ComponentInterface & T) {
    const {
      connectedCallback, // eslint-disable-line @typescript-eslint/unbound-method
      disconnectedCallback, // eslint-disable-line @typescript-eslint/unbound-method
      componentWillLoad, // eslint-disable-line @typescript-eslint/unbound-method
      componentDidLoad, // eslint-disable-line @typescript-eslint/unbound-method
      componentWillUpdate, // eslint-disable-line @typescript-eslint/unbound-method
      componentDidUpdate, // eslint-disable-line @typescript-eslint/unbound-method
    } = host;

    host.connectedCallback = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostConnected?.());
      connectedCallback?.apply(host);
    };
    host.disconnectedCallback = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostDisconnected?.());
      disconnectedCallback?.apply(host);
    };
    host.componentWillLoad = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostWillLoad?.());
      componentWillLoad?.apply(host);
    };
    host.componentDidLoad = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostDidLoad?.());
      componentDidLoad?.apply(host);
    };
    host.componentWillUpdate = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostWillUpdate?.());
      componentWillUpdate?.apply(host);
    };
    host.componentDidUpdate = (): void => {
      this.controllers.forEach((ctrl) => ctrl.hostDidUpdate?.());
      componentDidUpdate?.apply(host);
    };
  }

  public addController(ctrl: ReactiveController): void {
    this.controllers.add(ctrl);
  }

  public removeController(ctrl: ReactiveController): void {
    this.controllers.delete(ctrl);
  }

  public requestUpdate(): void {
    forceUpdate(this.host);
  }
}
