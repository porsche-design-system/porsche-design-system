import type { ReactiveController, ReactiveControllerHost } from './host-controller';

export class LoadingController implements ReactiveController {
  public initialLoading: boolean = false;

  public constructor(private controllerHost: ReactiveControllerHost<{ loading?: boolean }>) {
    this.controllerHost.addController(this);
  }

  public hostConnected(): void {
    this.initialLoading = this.controllerHost.host.loading;
  }

  public hostWillLoad(): void {
    this.initialLoading = this.controllerHost.host.loading;
  }

  public hostWillUpdate(): void {
    if (this.controllerHost.host.loading) {
      this.initialLoading = true;
    }
  }
}
