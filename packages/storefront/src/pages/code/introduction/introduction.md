# Introduction

## Start coding

Porsche UI Kit provides a collection of pre-built (React) components to developers for building clean and qualitative front-ends that innately come with the latest design definitions. Applications that use another frontend framework or none can include the (S)CSS styles and use the compiled HTML.

All releases of the Porsche UI Kit are available as versioned NPM packages at private npm registries ([https://porscheui.jfrog.io](https://porscheui.jfrog.io) and [https://porschedev.jfrog.io](https://porschedev.jfrog.io)). To use specific contents you have to integrate the NPM package as dependency in your application.

##### NPM packages of Porsche UI Kit are named as followed:
* Porsche UI Kit HTML/CSS v0 `@porsche/ui-kit-core`
* Porsche UI Kit React v0 `@porsche/ui-kit-react`
* Porsche UI Kit v1+ `@porscheui/ui-kit` (will be available soon)

NPM registry, – [request an account](http://eepurl.com/ghVSjH).  
Installation, – [get Porsche UI Kit Core/React v0 up & running](#/code/installation-v0).

## Porsche UI Kit
The first stable version `v1` of Porsche UI Kit will be released soon. The release is planned by the end of Q2/2019. Beta-releases might be available earlier. The new version will contain refactored, optimized and tested *React components* as well as pure *HTML/CSS patterns*.
While `v0` is still maintained by providing bugfixes and patches for a certain timeframe, new features or components won't be added anymore and will exclusively be available in `v1`. 

## Handling older versions of Porsche UI Kit
If you are still running on older versions of Porsche UI Kit (e.g. `@porsche/ui-kit-core - v0` or `@porsche/ui-kit-react - v0`) we highly recommend to update to the lates Porsche UI Kit release when possible. If you have to stuck on v0 components because they do not exist in the new version, you can include both libraries in parallel.

If using both libraries in parallel, be aware to only use **one** component of the same type, e.g. do not use `button` component of *v0* and *v1* in parallel which could cause design inconsistencies and performance issues.
