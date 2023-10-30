# Initialization

The Porsche Design System is based on [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
using [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) primarily for the
following reasons:

- to encapsulate markup and styles
- to prevent overriding styles or attributes
- to use the same components with plain html and any JavaScript framework, without having to maintain multiple libraries
  and keeping them in sync

<TableOfContents></TableOfContents>

## Introduction

While the NPM packages `@porsche-design-system/components-{js|angular|react|vue}` are primarily used for bootstrapping,
typing support and framework typical developer experience, the web components themselves and all their assets are served
from a CDN (`cdn.ui.porsche.com` and `cdn.ui.porsche.cn`).  
More information about this can be found under [Performance](must-know/performance/cdn).

## Architecture

![Porsche Design System Architecture](../../../assets/pds-architecture.png)

To understand what is happening when a component's html tag is rendered in the browser and what can be done to improve
the bootstrapping process, please read through the following pages carefully.

No matter if or which framework you use, please continue with [Vanilla Js](must-know/initialization/vanilla-js) since
its behavior is the foundation for all others.
