# Introduction

## Browser Notification Partials

We provide different browser notification partials to inform the user about supported browsers and/or not supported browser configuration like disabled cookies.
Partials are utility functions that return static code or markup that is very dynamic (e.g. contains hashed file names).

The partials are provided in the private `@porsche-design-system/browser-notification` npm package.
If you don't have access yet, please first [read more about getting started as developer](start-coding/introduction).

```
// install with npm:
npm install @porsche-design-system/browser-notification

// install with yarn:
yarn add @porsche-design-system/browser-notification
```

### Available partials

- [Browser Support Notification](browser-notifications/browser-support-notification)
- [Cookie Notification](browser-notifications/cookie-notification)
