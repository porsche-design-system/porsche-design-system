export function getName(name: string | undefined) {
  if (typeof name !== 'string' || name.trim() === '') {
    return null;
  }

  if (name) {
    name = name
      .toLowerCase()
      .substring(0, name.lastIndexOf('.'))
      .substring(name.lastIndexOf('/') + 1)
      .replace(/\.|\_/g, '-');
  }

  // only allow alpha characters and dash
  const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }

  return name;
}

export function isUrl(str: string) {
  return str.length > 0 && /(\.)/.test(str);
}

export function isValid(elm: HTMLElement) {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const val = elm.attributes[i].value;
      if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
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
