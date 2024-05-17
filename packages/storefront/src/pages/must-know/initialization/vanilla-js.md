# Initialization

First we need to understand how a web component works, before we can look into how to optimize its bootstrapping
behavior.

<TableOfContents></TableOfContents>

## Setup

The most basic [integration](developing/vanilla-js/getting-started#integration) of
`@porsche-design-system/components-js` without any bundler after loading the npm package on any html page looks like
this.

```html
<script>
  porscheDesignSystem.load();
</script>
```

Executing the `load()` function loads the **core chunk** from the CDN. The core chunk can easily be identified in the
network tab of Chrome Developer Tools by its name containing the version number, e.g.
`porsche-design-system.v3.8.0.688f651c1314ab84fa7b.js`.

Once the **core chunk** is loaded and executed the following things happen:

- `customElements.define()` is called for every component to register the custom html element in the browser (this is
  how [prefixing](developing/vanilla-js/advanced) for micro frontend architectures is even possible)
- if any of the registered component tags is already in or is later added to the DOM, its corresponding **component
  chunk** is loaded from the CDN on demand
- a checklist is maintained that tracks which **component chunks** are loaded already

Now the Porsche Design System is active and ready to go.

## Preparation

In the example from above we didn't render any component, yet, so let's add a single `p-button` tag to the DOM.

```html
<p-button>Hello</p-button>
```

For now, this is just a "dead" html tag without any appearance or functionality. You can't see it because it is hidden
via CSS by the mandatory [getInitialStyles()](partials/initial-styles) partial which outputs something like

<!-- prettier-ignore -->
```html
p-button { visibility: hidden; }
.hydrated { visibility: inherit; }
```

The **core chunk** detects the newly added tag and knows from its checklist that this component was not used and loaded
before. So it loads the **component chunk**, e.g. `porsche-design-system.button.d471231621db4170e79a.js`.

Once the **component chunk** is loaded, the component gets initialized.

## Connect Lifecycle

Initialization of a component tag means that under the hood, an instance of the `Button` class is created in the
JavaScript space.

<Notification heading="Important" heading-tag="h3" state="warning">
  It is important to understand, that for each component tag in the DOM, there is a component class instance in the JavaScript space. 
  The component tag acts as an interface, similar to an API, where you set attributes/properties or children as inputs. 
  If these change, the class instance detects these and renders the result into the component tag's Shadow DOM as an output.
</Notification>

Once the class instance is constructed by executing its `constructor()` the following lifecycle methods are executed in
order:

- `connectedCallback()`
- `componentWillLoad()`
- `componentWillRender()`
- `render()`
- `componentDidRender()`
- `componentDidLoad()`

Different lifecycles can be used for validation, child or parent synchronisation, de-/registering event listeners,
layout calculations and many other things. But most importantly to render the actual component itself. Additional
information can be found in the official documentation for
[Stencil Component Lifecycle Methods](https://stenciljs.com/docs/component-lifecycle).

Once this process is complete, the `hyrated` CSS class gets added to the component tag.

```html
<p-button class="hydrated">Hello</p-button>
```

Which makes the button appear like you are used to.

<p-button :theme="this.$store.getters.storefrontTheme">Hello</p-button>

## Change Lifecycle

In case of an attribute or property change, the class instance goes through the following lifecycle methods in order.

- `@Watch('propName')`
- `componentShouldUpdate()`
- `componentWillUpdate()`
- `componentWillRender()`
- `render()`
- `componentDidRender()`
- `componentDidUpdate()`

This means that upon attribute or property change (sometimes also added/removed children for more interactive
components) the web component re-renders and updates its Shadow DOM.

## Disconnect Lifecycle

If the `p-button` is removed from the DOM, only one lifecycle method of the class instance is invoked.

- `disconnectedCallback()`

This is typically used to remove previously added event listeners, destroy watchers and other cleanup tasks.

## Reconnect Lifecycle

In case the same `p-button` element is added to the DOM again, just one lifecycle method is called.

- `connectedCallback()`

This typically doesn't happen in framework environments but is possible in theory or with straight DOM manipulation.

```js
const el = document.querySelector('p-button');
el.remove();

setTimeout(() => document.body.append(el), 1000);
```

---

## Optimization

Now that it is clear what is happening under the hood when a simple `p-button` is added to the DOM, let's see how this
looks from the perspective of network requests and how to improve them if necessary.

### Status Quo

By default, the network traffic looks something like this.

![Loading Behavior Vanilla Js 01](../../../assets/loading-behavior-vanilla-js-01.jpg)

A classic waterfall like loading behavior that

- starts with the `index.html`
- then continues with the `index.js` of `@porsche-design-system/components-js`
- which then loads the **core chunk**
- that injects both the **font-face.css** and the **component chunk**
- and last the **font file** after the styles within the component's Shadow DOM are applied

### Preloading font-face.css

By applying the [getFontFaceStylesheet()](partials/font-face-stylesheet) partial we can preload the **font-face.css**
asset.

![Loading Behavior Vanilla Js 02](../../../assets/loading-behavior-vanilla-js-02.jpg)

As we can see, this happens in parallel with the `index.js` file.

### Preloading font files

By applying the [getFontLinks()](partials/font-links) partial we can preload the font assets. As a default, both
`regular` and `semi-bold` weights are preloaded since they are most commonly used but this can be customized.

![Loading Behavior Vanilla Js 03](../../../assets/loading-behavior-vanilla-js-03.jpg)

As a result, both font files are additionally loaded in parallel, while earlier this happened not only in sequence but
even last and only when a style is present on the page that uses the `font-family` and that particular `font-weight`
which can lead to a phenomena called **Flash of Unstyled Text (FOUT)**.

### Preloading component chunks

The loading experience can be improved further by using the [getComponentChunkLinks()](partials/component-chunk-links)
partial. Without any configuration it simply preloads the **core chunk**.

![Loading Behavior Vanilla Js 04](../../../assets/loading-behavior-vanilla-js-04.jpg)

Again, with this improvement, the asset is now being loaded in parallel, too.

For the next step, we also want to preload the **component chunk** by using the partial like

```ts
getComponentChunkLinks({ components: ['button'] });
```

![Loading Behavior Vanilla Js 05](../../../assets/loading-behavior-vanilla-js-05.jpg)

Now, everything is preloaded in parallel.

<Notification heading="Hint" heading-tag="h4" state="warning">
  Just preloading all component chunks on the page or even every chunk available should be avoided.<br>
  Instead, the most performant but also more complicated approach would be to only preload the component chunks
  (and fonts) that are located <strong>above the fold</strong> which means visible on page load without scrolling.
</Notification>

### Early initialization

There is one more improvement we can do, and that is to skip loading the `index.js` file of
`@porsche-design-system/components-js`. That can be achieved by using the [getLoaderScript()](partials/loader-script)
partial which essentially produces a `script` with the code necessary to load the **core chunk** and it also takes care
of calling `porscheDesignSystem.load()` so that the manual part from the initial setup is superfluous.

![Loading Behavior Vanilla Js 06](../../../assets/loading-behavior-vanilla-js-06.jpg)

Therefore, the total amount of data transferred is basically the same but without the additional request and the
necessary http communication, like request and response headers. Also [componentsReady()](developing/components-ready)
isn't part of `getLoaderScript()`.

<Notification heading="Hint" heading-tag="h4" state="warning">
  This works and helps especially in a plain HTML and Vanilla Js setup since the <code>index.js</code> is otherwise 
  bundled by the JavaScript framework and you would end up shipping the same code twice, once bundled and once inlined
  in the <code>script</code> tag.
</Notification>
