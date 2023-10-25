# Initialization

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

In the example from above we didn't render any component, yet, so let's add a single component `p-button` tag to the
DOM.

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

Initialization means an instance of the `Button` class is created in the JavaScript space.

<Notification heading="Important" state="warning">
  It is important to understand, that for each component tag in the DOM, there is a class instance in the JavaScript space. 
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
layout calculations and many other things. But most importantly to render the actual component itself.

Once this process is complete, the `hyrated` CSS class gets added to the component tag.

```html
<p-button class="hydrated">Hello</p-button>
```

Which makes the button appear like you are used to.

<p-button>Hello</p-button>

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
components) the web component rerenders and updates its Shadow DOM.

## Disconnect Lifecycle

If the `p-button` is removed from the DOM, only one lifecycle method of the class instance is invoked.

- `disconnectedCallback()`

This is typically used to remove previously added event listeners or destroy watchers.

## Reconnect Lifecycle

In case the same `p-button` is added to the DOM again, just one lifecycle method is called.

- `connectedCallback()`

## Optimization

Now that it is clear what is happening under the hood when a simple `p-button` is added to the DOM, let's have see how
this looks from the perspective of network requests and how to improve it if necessary.
