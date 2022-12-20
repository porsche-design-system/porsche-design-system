import { addScript } from './add-script';
import { getComponentsManagerData } from './data-handler';

export type RegisterCustomElementsCallback = (prefix: string) => void;

export type LibraryHandlerData = {
  isLoaded: boolean;
  prefixes: string[];
  registerCustomElements: RegisterCustomElementsCallback | null;
};

/**
 * @property script - the url of the entrypoint
 * @property stylesUrl - an URL to a stylesheet file
 * @property inlineStyles - a string with styles that get inserted inline synchronously
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
  const { isLoaded, prefixes, registerCustomElements } = data;
  if (!isLoaded) {
    addScript(script);
    data.isLoaded = true;
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
    const newLibraryHandlerData: LibraryHandlerData = {
      isLoaded: false,
      prefixes: [],
      registerCustomElements: null,
    };

    cmData[version] = newLibraryHandlerData;
  }

  return cmData[version];
}
