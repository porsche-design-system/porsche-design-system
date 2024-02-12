import { type ComponentInterface, forceUpdate } from '@stencil/core';

// inspired by lit
// https://github.com/lit/lit/blob/59d5ba7649f2957d01996e3115d0d79bdfbf34ac/packages/reactive-element/src/reactive-controller.ts#L11

/**
 * An object that can host Reactive Controllers and call their lifecycle
 * callbacks.
 */
type ReactiveControllerHost = {
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
  readonly updateComplete: Promise<boolean>;
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
type ReactiveController = {
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
};

export class ControllerHost implements ReactiveControllerHost {
  constructor(
    private host: ComponentInterface,
    private controllers: Set<ReactiveController> = new Set<ReactiveController>()
  ) {
    const { connectedCallback, disconnectedCallback, componentWillLoad, componentWillUpdate, componentDidUpdate } =
      host;
    console.log('ControllerHost constructor', host);

    host.connectedCallback = () => {
      this.controllers.forEach((ctrl) => ctrl.hostConnected?.());
      connectedCallback?.apply(host);
    };
    host.disconnectedCallback = () => {
      this.controllers.forEach((ctrl) => ctrl.hostDisconnected?.());
      disconnectedCallback?.apply(host);
    };
    host.componentWillLoad = () => {
      this.controllers.forEach((ctrl) => ctrl.hostWillLoad?.());
      componentWillLoad?.apply(host);
    };
    host.componentWillUpdate = () => {
      this.controllers.forEach((ctrl) => ctrl.hostWillUpdate?.());
      componentWillUpdate?.apply(host);
    };
    host.componentDidUpdate = () => {
      this.controllers.forEach((ctrl) => ctrl.hostDidUpdate?.());
      componentDidUpdate?.apply(host);
    };
  }

  public addController(ctrl: ReactiveController) {
    this.controllers.add(ctrl);
  }

  public removeController(ctrl: ReactiveController) {
    this.controllers.delete(ctrl);
  }

  public requestUpdate() {
    forceUpdate(this.host);
  }

  updateComplete = Promise.resolve(true);
}

// see lit docs:
// - https://lit.dev/docs/composition/overview/
// - https://lit.dev/docs/composition/mixins/
// - https://lit.dev/docs/composition/controllers/
export class LoadingController implements ReactiveController {
  public initialLoading: boolean = false;

  constructor(
    private host: ReactiveControllerHost,
    private cmp: ComponentInterface & { loading?: boolean }
  ) {
    this.host.addController(this);
  }

  hostConnected() {
    console.log('hostConnected', this.cmp.loading);
    this.initialLoading = this.cmp.loading;
  }

  hostWillLoad() {
    console.log('hostWillLoad', this.cmp.loading);
    this.initialLoading = this.cmp.loading;
  }

  hostWillUpdate() {
    console.log('hostWillUpdate', this.cmp.loading);
    if (this.cmp.loading) {
      this.initialLoading = true;
    }
  }
}

// NOTE: maybe useful for closing popovers, select dropdowns, etc.
export class DismissController implements ReactiveController {
  // host: ReactiveControllerHost;

  constructor(
    host: ReactiveControllerHost,
    private onClose: () => void
  ) {
    // this.host = host;
    host.addController(this);
  }

  hostConnected() {
    window.addEventListener('click', this.onClose);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  hostDisconnected() {
    window.removeEventListener('click', this.onClose);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.onClose();
    }
  };
}
