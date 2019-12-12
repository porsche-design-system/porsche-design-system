# Versioning and Releasing

We value stability and transparency for the Porsche Design System. Thus we strive to ensure that our reusable components, Sketch Libraries and familiar practices dont't become obsolete often and unexpectedly.

## General information
The Porsche Design System components and Sketch Libraries are released seperately following [semantic versioning](http://semver.org/) whereby the numbers indicate the level of changes that are introduced. It should help you understand and plan the potential impact of updating.

MAJOR.MINOR.PATCH e.g. v1.0.1
* **Major** (X.y.z) (breaking) changes in code or design, removal or renaming of existing features that require updates or refactorings within the application
* **Minor** (x.Y.z) new feature (packages) in code or design
* **Patch** (x.y.Z) bug fixes or structure optimisation

## Release planning
We try to release with a regular schedule to enable the planning of updates. A major release every 6 months in summer and winter, and up to 3 minor releases for each major release.

## Deprecation and maintenance rules
We work hard to minimize the number of breaking changes and provide migration paths therefore. But of course sometimes major releases are neccessary.  

In general we will mark removed, renamed or changes interfaces and elements as deprecated in major releases for one release cycle before we will delete them. Updates must be scheduled and integrated within 6 months.  

Major releases are always fully backward-compatible. Thus we only provide bug fixes for the latest major release.  
In comparison to the component releases, the Sketch Libraries will only be provided as major versions to download without deprecated elements and bug fix support for outdated versions.