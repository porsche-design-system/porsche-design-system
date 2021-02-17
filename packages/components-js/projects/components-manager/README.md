# Porsche Web Components Manager

The Porsche Web Components Manager provides a generic interface to handle global web component loading and communication.  
It should also be a place to discuss issues, define standards and demonstrate best practices on how to create web components that are highly reusable, self contained, conflict free and easy to use.

Even if this project was started as a MyServices side project, everyone is welcome to participate. That's the only way standards can work. So everyone is welcome to participate and contribute. Checkout the [Contribution Section](#contribution).

## Common Problems with Web Components

- Polyfilling
  - not every web component should bring their own polyfills, or they should also provide a version without
  - whats the best solution for the applications to deliver polyfills (https://www.webcomponents.org/polyfills) that it works for stencil, angular elements, polymer, native, or react based web components.
- Lazy loading
  - Should we lazy load by default... would it make sense to alternatively provide a way to make the bundler take care of the loading (he usually knows when what is needed and that solution should be better for UX).
  - What lazy loading strategies are possible... maybe best practices for angular elements, polymer, native, or react based web components (stencil has a solution).
  - How to test with lazy loaded web components (we don't know when they are ready). One solution would be to define custom events (should be the same for all web component libs we create) that can be listened to. Then someone could write a helper script to wait until all or a specific element is loaded.
  - What to take care of for server side rendering
- OAuth
- Which language to use
- Tracking
- Delivery via CDN/bundled
- Versioning
  - forcing everyone to the latest and same version VS not accidently breaking apps with new releases
  - prefixes to use multiple versions in parallel

## Contribution

All kinds of contribution are welcome. Not only from Devs, but also from architects, POs, Designers, QAs, BAs etc.  
The web component journey will not only affect how the apps are developed technologically, but also the UX, how it can be tested, efforts and possibilities.  
For now the best ways to contribute are:

- Read the documentation and code
- Discuss the concepts in your team
- Start discussions with us or other teams (there will be official team independent meetings soon)
- Tell us what pain points or unknown risks you see with web components
- Make concrete suggestions on how to improve the concept or code
- Create pull-requests or issues

## FAQ

- Wy don't we use native custom events for the component-component and component-application communication?  
  For native events timing matters. If the event is fired before the listener is listening, then we might miss the start of the conversation.

### Setup prettier

1. Go to Webstorm `Preferences`
1. Click on the Plugins tab and search for `prettier`
1. Install prettier
1. In `Preferences` go to `Languages and Frameworks` -> `Javascript` -> `Prettier`
1. Set `Prettier Package` to `{PATH_TO_YOUR_DIRECTORY}/node_modules/prettier`
1. Change `Run for files` to `{**/*,*}.{js,ts,jsx,tsx,vue,scss,json,css,html}`
1. Click checkbox `on save` and apply
1. You should be good to go.
