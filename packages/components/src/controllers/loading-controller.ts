import type { ReactiveController, ReactiveControllerHost } from './host-controller';

export class LoadingController implements ReactiveController {
  public initialLoading: boolean = false;

  constructor(private controllerHost: ReactiveControllerHost<{ loading?: boolean }>) {
    this.controllerHost.addController(this);
  }

  hostConnected() {
    this.initialLoading = this.controllerHost.host.loading;
  }

  hostWillLoad() {
    this.initialLoading = this.controllerHost.host.loading;
  }

  hostWillUpdate() {
    if (this.controllerHost.host.loading) {
      this.initialLoading = true;
    }
  }
}
