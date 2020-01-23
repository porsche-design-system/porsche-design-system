# FAQ

To answer the most frequently asked questions the following list is constantly updated. Please read through before using the support and communication channels for questions. **Still missing anything? [We are happy to hear from you!](#/web/help/support)**

## Who develops the Porsche Design System?
The Porsche Design System is developed and maintained centrally by a designated team from Porsche AG in Germany. In an open community, everyone is encouraged to participate and contribute to the Porsche Design System and give feedback at any time.

## How can I get in contact with the Porsche Design System team?
We want to enable continuous communication within the community. Therefore we offer different use-case-related communication channels to get in contact or ask for support or submit support requests. You can find all of them [in the support section](#/web/help/support).

## How can I access the Porsche Design System files?
**Developer**  
The scource code of the Porsche Design System is stored and developed within a private GitHub repository and distributed via a private NPM registry. Both managed by the Porsche Design System team. Access to the private NPM registry can be requested using our online subscription form.  

**Designer**  
The Porsche Design System Sketch library is created and maintained within a private Abstract project. Access can be also requested using our online subscription form.  

## What is the release strategy and how are the issues priorized?
All versioned releases of the Porsche Design System combine both design and code. All changes are based on the overall business goals and the actual needs of the teams. The upcoming release content is accessible in the [quarterly roadmap](#/web/news/roadmap). The roadmap is not a delivery commitment and may be changed based on upcoming needs, feedback and associated requirements.

## What happens with contents marked as deprecated?
Contents marked as deprecated in `v0` releases of the Porsche Design System won't be deleted and can still be used, but without any guarantee that those patterns still fulfil the latest design definitions or browser compatibility. If possible, we recommend replacing those patterns with new ones from release `v1` or copying the ones you still need over into your application and maintaining them yourself.

## How to handle older versions?
If you are still running older versions (e.g. `@porsche/ui-kit-core`–`v0` or `@porsche/ui-kit-react`–`v0`), we highly recommend updating to the latest Porsche Design System release if possible. If you have to stick to `v0` components because they do not exist in the new version, you can include both libraries in parallel.

If using both libraries in parallel, only use one component of the same type, e.g. do not use `button`-component of `v0` and `v1` in parallel, which could cause design inconsistencies and performance issues.

## How do I submit bug reports or feature requests and how are they handled?
Once you find a reproducible bug, you can either [open an issue](https://github.com/porscheui/porsche-ui-contribution/issues/new/choose) in the [public-contribution GitHub repository](https://github.com/porscheui/porsche-ui-contribution) or directly submit a fix as a pull request within the [private Porsche Design System](https://github.com/porscheui/porsche-design-system). We will address and respond to new bug reports as soon as possible, usually within a few days. Bugs should be fixed within one sprint depending on current capacity planning. The best approach for urgent bugs is to fix them locally within your project and submit the fix or create a PR afterwards.