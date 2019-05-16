# FAQ

To answer the most frequently asked questions, Porsche UI is constantly adding FAQs to the following list. Please read through before using the support and communication channels for questions.

## Who develops the Porsche UI Kit?
The Porsche UI Kit is a design system approach with different levels of organisation and content. At the 1st tier "Core Level", the most essential contents with the highest quality requirements are developed and maintained centrally by a designated team from Porsche AG in Germany - The Porsche UI Team. Within the 2nd tier at "Group Level", the different adopting teams are developing and sharing individual contents on their own responsibility. In an open community approach, everyone is encouraged to contribute to the Porsche UI Kit Core contents and give feedback to the Porsche UI Team at any time.

## How can I get in contact with the Porsche UI team?
We want to enable continuous communication within the community. Therefore, the Porsche UI team offers different use-case-related communication channels and methods to contact support or submit support requests. You can find all of them in the Support Section.

## How can I access the Porsche UI Kit files?
**Developer**  
Following the tiered development levels, the cource code of the Porsche UI Kit "Core Fundamentals" is stored and developed within a private GitHub repository and distributed via a private NPM registry. Both are managed by the Porsche UI Team. For directly contributing pull requests to the private repository, the required permissions can be assigned to users after first creating a relevant issue within the public contribution repository. Access to the private NPM registry can be requested using our online subscription form. 

**Designer**  
The Porsche UI Kit Design Library Sketch files are developed and maintained within a private Abstract project. Access can be also requested using our online subscription form.   

## What is the update strategy for the Porsche UI Kit?
Changes in code or design are released using the SemanticVersioning as Major, Minor or Patch, and documented in the corresponding change log. The Porsche UI Kit release combines both design and code to ensure identical content at any time. Future tasks and changes in the Porsche UI Kit are published as a roadmap for the next quarter. The roadmap is not a delivery commitment and may be changed based on upcoming user needs, feedback and associated requirements.

## What happens with contents marked as Deprecated?
Contents marked as deprecated in `v0` releases of Porsche UI Kit won't be deleted and can still be used, but without any guarantee that those patterns still fulfil the latest design definitions or browser compatibility. If possible, we recommend replacing those patterns with new ones from release `v1` or copying the ones you still need over into your application and maintaining them yourself.

## How to handle older versions of Porsche UI Kit?
If you are still running older versions of Porsche UI Kit (e.g. `@porsche/ui-kit-core`–`v0` or `@porsche/ui-kit-react`–`v0`), we highly recommend updating to the latest Porsche UI Kit release if possible. If you have to stick to `v0` components because they do not exist in the new version, you can include both libraries in parallel.

If using both libraries in parallel, only use one component of the same type, e.g. do not use `button` component of `v0` and `v1` in parallel, which could cause design inconsistencies and performance issues.

While Porsche UI Kit `v0` is still maintained with bugfixes and patches provided for a certain period, new features or components won't be added anymore and will exclusively be available in `v1`.

## How do I report bugs and how are they handled?
Once you find a reproducible bug, you can either open an issue in the public-contribution GitHub repository or directly submit a fix as a pull request within the private Porsche UI Kit repository. We will address and respond to new bug reports as soon as possible, usually within a few days. Bugs should be fixed within one sprint depending on current capacity planning. The best approach for urgent bugs is to fix them locally within your project and submit the fix or create a PR afterwards.
