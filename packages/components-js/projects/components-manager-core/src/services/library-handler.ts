import { addScript } from './add-script';
import { getComponentsManagerData } from './data-handler';

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
  const data = getLibraryHandlerData(version) || {};
  const { isInjected, prefixes, registerCustomElements } = data;

  if (Object.entries(getComponentsManagerData()).some(([v, data]) => v !== version && data.prefixes.includes(prefix))) {
    throw new Error(
      `Prefix '${prefix}' is already registered by a different version of the Porsche Design System. Please use a different one.`
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
export function setRegisterComponentsCallback(callback: RegisterCustomElementsCallback, version: string): void {
  const data = getLibraryHandlerData(version);
  data.registerCustomElements = callback;
  for (const prefix of data.prefixes) {
    callback(prefix);
  }
}

function getLibraryHandlerData(version: string): LibraryHandlerData {
  const cmData = getComponentsManagerData();
  const { [version]: libraryHandlerData = null } = cmData;

  if (libraryHandlerData === null) {
    let readyPromiseResolve: ReadyResolve = () => {};
    const readyPromise: Promise<void> = new Promise((resolve: ReadyResolve) => (readyPromiseResolve = resolve));
    const newLibraryHandlerData: LibraryHandlerData = {
      isInjected: false,
      isReady: () => readyPromise,
      readyResolve: readyPromiseResolve,
      prefixes: [],
      registerCustomElements: null,
    };

    cmData[version] = newLibraryHandlerData;
  }

  return cmData[version];
}
