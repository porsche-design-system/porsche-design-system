# Loading Behaviour

**Unstyled content** when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various **partials** as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.

Read further on how to prevent **Flash of Unstyled Content** (FOUC) and **Flash of Unstyled Text** (FOUT) to
boost your application.

## Prevent Flash of Unstyled Content (FOUC)

- [Initialize Porsche Design System early](partials/loader-script)
- [Preload component chunks](partials/component-chunk-links)
- [Inject initial styles](partials/initial-styles)
- [Prefetch icon svg files](partials/icon-links)

## Prevent Flash of Unstyled Text (FOUT)

- [Inject Font Face Stylesheet](partials/font-face-stylesheet)
- [Preload specific font files](partials/font-links)
