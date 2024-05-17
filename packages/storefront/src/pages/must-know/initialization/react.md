# Initialization

<TableOfContents></TableOfContents>

## Setup

The most basic [integration](developing/react/getting-started#integration) of `@porsche-design-system/components-react`
looks like this.

<!-- prettier-ignore -->
```tsx
<PorscheDesignSystemProvider>
  ...
</PorscheDesignSystemProvider>
```

Internally `PorscheDesignSystemProvider` is calling `load()` of `@porsche-design-system/components-js` since the web
components are exactly the same.  
In fact, the framework specific packages like `@porsche-design-system/components-react` only provide thin wrapper
components for typing, prop binding and good developer experience just like with any other React component.

For more details what happens when `load()` is invoked, please take a look at the
[Vanilla Js Setup](must-know/initialization/vanilla-js#setup).

## Mounting

In the example from above we didn't render any component, yet, so let's render a single `PButton`.

```tsx
<PButton>Hello</PButton>
```

Once rendered, this produces a `p-button` tag in the DOM.  
From here on the exact same things happen as described at
[Vanilla Js Preparation](must-know/initialization/vanilla-js#preparation) and
[Vanilla Js Connect Lifecycle](must-know/initialization/vanilla-js#connect-lifecycle).

<Notification heading="Important" heading-tag="h3" state="warning">
  In any JavaScript framework, the available wrapper components' purpose is typing, rendering a web component into the DOM and 
  syncing framework props to the rendered component. Once rendered, the web component has its own lifecycle and is not aware of any framework. 
</Notification>

## Prop Changes

In case of a prop change the `PButton` renders again and synchronizes its properties to the rendered `p-button` element.
What follows is, again, exactly as documented at
[Vanilla Js Change Lifecycle](must-know/initialization/vanilla-js#change-lifecycle).

## Unmounting

Once the `PButton` is not needed anymore, e.g. when conditionally rendered or navigating away, the `p-button` element is
removed from the DOM. What happens additionally can be found at
[Vanilla Js Disconnect Lifecycle](must-know/initialization/vanilla-js#disconnect-lifecycle).

---

## Optimization

Now that it is clear what is happening under the hood when a simple `PButton` is rendered, let's see how this looks from
the perspective of network requests and how to improve them if necessary.

### Status Quo

By default, the network traffic looks something like this.

![Loading Behavior React 01](../../../assets/loading-behavior-react-01.jpg)

- starts with the `index.html`
- then continues with the `main.js` bundle of the React app
- which then loads the **core chunk**
- that injects both the **font-face.css** and the **component chunk**
- and last the **font file** after the styles within the component's Shadow DOM are applied

### Preloading font-face.css

By applying the [getFontFaceStylesheet()](partials/font-face-stylesheet) partial we can preload the **font-face.css**
asset.

![Loading Behavior React 02](../../../assets/loading-behavior-react-02.jpg)

As we can see, this happens in parallel with the `main.js` bundle.

### Preloading font files

By applying the [getFontLinks()](partials/font-links) partial we can preload the font assets. As a default, both
`regular` and `semi-bold` weights are preloaded since they are most commonly used but this can be customized.

![Loading Behavior React 03](../../../assets/loading-behavior-react-03.jpg)

As a result, both font files are additionally loaded in parallel, while earlier this happened not only in sequence but
even last and only when a style is present on the page that uses the `font-family` and that particular `font-weight`
which can lead to a phenomena called **Flash of Unstyled Text (FOUT)**.

### Preloading component chunks

The loading experience can be improved further by using the [getComponentChunkLinks()](partials/component-chunk-links)
partial. Without any configuration it simply preloads the **core chunk**.

![Loading Behavior React 04](../../../assets/loading-behavior-react-04.jpg)

Again, with this improvement, the asset is now being loaded in parallel, too.

For the next step, we also want to preload the **component chunk** by using the partial like

```ts
getComponentChunkLinks({ components: ['button'] });
```

![Loading Behavior React 05](../../../assets/loading-behavior-react-05.jpg)

Now, everything is preloaded in parallel while the React app's chunk takes the longest and is executed last.

<Notification heading="Hint" heading-tag="h4" state="warning">
  Just preloading all component chunks on the page or even every chunk available should be avoided.<br>
  Instead, the most performant but also more complicated approach would be to only preload the component chunks
  (and fonts) that are located <strong>above the fold</strong> which means visible on page load without scrolling.
</Notification>

<Notification heading="Conclusion" heading-tag="h4" state="warning">
  Applying the <code>getLoaderScript()</code> partial is pointless since there is no benefit because 
  everything Porsche Design System related is loaded before the React app itself. Therefore, the DOM is empty 
  once the preloaded chunks are available.
</Notification>
