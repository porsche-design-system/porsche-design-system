let CACHED_MAP: Map<string, string>;

export function getIconMap(): Map<string, string> {
  if (!CACHED_MAP) {
    const win = window as any;
    win.Ionicons = win.Ionicons || {};
    CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
  }
  return CACHED_MAP;
}

export function addIcons(icons: { [name: string]: string }) {
  const map = getIconMap();
  Object.keys(icons).forEach((name) => {
    map.set(name, icons[name]);
  });
}

export function getName(name: string | undefined) {
  if (name) {
    name = name.toLowerCase();
  }

  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }

  // only allow alpha characters and dash
  const invalidChars = name.replace(/[a-z]|-|\d/gi, "");
  if (invalidChars !== "") {
    return null;
  }

  return name;
}

export function getSrc(src: string | undefined) {
  if (typeof src === "string") {
    src = src.trim();
    if (isSrc(src)) {
      return src;
    }
  }
  return null;
}

export function isSrc(str: string) {
  return str.length > 0 && /(\/|\.)/.test(str);
}

export function isValid(elm: HTMLElement) {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === "script") {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const val = elm.attributes[i].value;
      if (typeof val === "string" && val.toLowerCase().indexOf("on") === 0) {
        return false;
      }
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
}
