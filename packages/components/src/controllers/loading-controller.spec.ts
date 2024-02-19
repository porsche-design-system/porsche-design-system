import { LoadingController } from './loading-controller';
import { ControllerHost } from './controller-host';

jest.mock('./controller-host');

describe('constructor', () => {
  it('should call controllerHost.addController() with correct parameter', () => {
    const mockControllerHost = new ControllerHost({});
    const spy = jest.spyOn(mockControllerHost, 'addController');
    const loadingCtrl = new LoadingController(mockControllerHost);

    expect(spy).toBeCalledWith(loadingCtrl);
  });
});

describe('hostConnected()', () => {
  it('should assign this.initialLoading to value of controllerHost.host.loading', () => {
    const host = { loading: true };
    const mockControllerHost = new ControllerHost(host);
    mockControllerHost.host = host;
    const loadingCtrl = new LoadingController(mockControllerHost);

    expect(loadingCtrl.initialLoading).toBe(false);

    loadingCtrl.hostConnected();
    expect(loadingCtrl.initialLoading).toBe(true);

    mockControllerHost.host.loading = false;
    loadingCtrl.hostConnected();
    expect(loadingCtrl.initialLoading).toBe(false);
  });
});

describe('hostWillLoad()', () => {
  it('should assign this.initialLoading to value of controllerHost.host.loading', () => {
    const host = { loading: true };
    const mockControllerHost = new ControllerHost(host);
    mockControllerHost.host = host;
    const loadingCtrl = new LoadingController(mockControllerHost);

    expect(loadingCtrl.initialLoading).toBe(false);

    loadingCtrl.hostWillLoad();
    expect(loadingCtrl.initialLoading).toBe(true);

    mockControllerHost.host.loading = false;
    loadingCtrl.hostWillLoad();
    expect(loadingCtrl.initialLoading).toBe(false);
  });
});

describe('hostWillUpdate()', () => {
  it('should assign this.initialLoading to true for controllerHost.host.loading = true', () => {
    const host = { loading: true };
    const mockControllerHost = new ControllerHost(host);
    mockControllerHost.host = host;
    const loadingCtrl = new LoadingController(mockControllerHost);

    expect(loadingCtrl.initialLoading).toBe(false);

    loadingCtrl.hostWillUpdate();
    expect(loadingCtrl.initialLoading).toBe(true);
  });

  it('should not assign this.initialLoading for controllerHost.host.loading = false', () => {
    const host = { loading: false };
    const mockControllerHost = new ControllerHost(host);
    mockControllerHost.host = host;
    const loadingCtrl = new LoadingController(mockControllerHost);

    expect(loadingCtrl.initialLoading).toBe(false);

    loadingCtrl.hostWillUpdate();
    expect(loadingCtrl.initialLoading).toBe(false);
  });
});
