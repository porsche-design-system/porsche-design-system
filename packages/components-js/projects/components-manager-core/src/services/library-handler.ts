import { addScript } from './add-script';
import { CM_KEY, getComponentsManagerData } from './data-handler';

export type RegisterCustomElementsCallback = (prefix: string) => void;

type ReadyResolve = () => void;
export type LibraryHandlerData = {
  isInjected: boolean;
  isReady: () => Promise<unknown>;
  readyResolve: ReadyResolve;
  prefixes: string[];
  registerCustomElements: RegisterCustomElementsCallback | null;
};

/**
 * @property script - the url of the entrypoint
 * @property version - the version of the library
 * @property prefix - the prefix used for the components
 */
export type LoadComponentLibraryOptions = {
  script: string;
  version: string;
  prefix: string;
};
/**
 * @param options - LoadComponentLibraryOptions
 */
export function loadComponentLibrary({ script, version, prefix }: LoadComponentLibraryOptions): void {
  const data = getLibraryHandlerData(version as `${number}.${number}.${number}`);
  const { isInjected, prefixes = [], registerCustomElements } = data;

  const [collidingVersion] = Object.entries(getComponentsManagerData()).filter(
    ([v, cmData]) => v !== version && typeof cmData === 'object' && cmData.prefixes.includes(prefix)
  );
  if (collidingVersion) {
    throw new Error(
      `[Porsche Design System v${version}] prefix '${prefix}' is already registered with version '${collidingVersion[0]}' of the Porsche Design System. Please use a different one.
Take a look at document.${CM_KEY} for more details.`
    );
  }

  if (!isInjected) {
    addScript(script);
    data.isInjected = true;
  }

  if (!prefixes.includes(prefix)) {
    prefixes.push(prefix);

    /**
     * if registerCustomElements is not yet available
     * the setRegisterComponentsCallback will loop over the
     * prefixes initially
     */
    registerCustomElements && registerCustomElements(prefix);
  }
}

/**
 * @param callback - the callback that has to be called as soon as a new prefix is requested
 * @param version - the version of the library
 */
export function setRegisterComponentsCallback(
  callback: RegisterCustomElementsCallback,
  version: `${number}.${number}.${number}`
): void {
  const data = getLibraryHandlerData(version);
  data.registerCustomElements = callback;
  data.prefixes.forEach((p) => callback(p));
}

function getLibraryHandlerData(version: `${number}.${number}.${number}`): LibraryHandlerData {
  const cmData = getComponentsManagerData();
  const { [version]: libraryHandlerData } = cmData;

  if (!libraryHandlerData) {
    let readyPromiseResolve: ReadyResolve = () => {};
    const readyPromise: Promise<void> = new Promise((resolve: ReadyResolve) => (readyPromiseResolve = resolve));

    cmData[version] = {
      isInjected: false,
      isReady: () => readyPromise,
      readyResolve: readyPromiseResolve,
      prefixes: [],
      registerCustomElements: null,
    };
  }

  return cmData[version];
}
