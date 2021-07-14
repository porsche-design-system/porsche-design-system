# Loading Behaviour

**Unstyled content** when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various **partials** as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent **Flash of Unstyled Content** (FOUC) and **Flash of Unstyled Text** (FOUT) to
boost your application.

## Flash of Unstyled Content (FOUC)

- (Initial Styles)[/partials/get-initial-styles]
- (Preload component chunks)[/partials/get-component-chunks]
- (Initialize Porsche Design System early)[/partials/get-loader-script]
- (Prefetch icons)[/partials/get-icon-links]

## Flash of Unstyled Text (FOUT)

- (Inject Porsche Design System Font Face Stylesheet)[/partials/get-font-face-stylesheet]
- (Preload specific font files)[/partials/get-font-links]
