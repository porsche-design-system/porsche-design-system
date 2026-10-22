type ScriptProps = {
  /** The behaviour, as plain browser JavaScript – no TypeScript, since it is emitted as it is written. */
  children: string;
};

/**
 * Behaviour of an example, written in the component whose markup it wires up.
 *
 * Renders a `<script type="module">` with the code as it is: Preact escapes the text of every element, a script
 * included, so `&&` would reach the browser as `&amp;&amp;`. The dev server serves the script where it stands, and
 * `scripts/build.ts` moves every one of them into the `main.js` of the page – see `extractScripts()` in
 * `lib/entries.ts`. Either way it is a module: deferred, with a scope of its own in dev, and sharing one with the
 * other scripts of the page once built, which is why the build rejects two top level declarations of the same name.
 *
 * The code is a template literal, so a backtick or a `${` meant for the browser has to be escaped. Prefix it with
 * `/* language=JavaScript *\/` so that JetBrains IDEs highlight it as JavaScript.
 */
export const Script = ({ children }: ScriptProps) => {
  if (/<\/script/i.test(children)) {
    throw new Error('[examples] a script must not contain "</script", it would end the element early');
  }

  return <script type="module" dangerouslySetInnerHTML={{ __html: children }} />;
};
