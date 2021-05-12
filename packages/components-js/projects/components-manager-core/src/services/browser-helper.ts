type ScriptElementClass = {
  prototype: HTMLScriptElement;
  new (): HTMLScriptElement;
};

export function getHTMLScriptElement(): ScriptElementClass {
  return HTMLScriptElement;
}
