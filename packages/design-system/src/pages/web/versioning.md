# Versioning

## General information
For updating and releasing new versions of code or design libraries, the [SemanticVersioning](http://semver.org/) format is used:  

MAJOR.MINOR.PATCH e.g. 1.0.1
* **Major** (X.y.z) contain breaking changes (defined below).
* **Minor** (x.Y.z) add new features or deprecate existing features without breaking changes.
* **Patch** (x.y.Z) fix defects or optimise existing features and file structure without breaking changes.

Teams should avoid mixing different versions of code and design libraries. Both parties should update in collaboration with the related counterpart.

## Release rules
* Once a versioned package has been released, the contents of that version must not be modified. Any modifications must be released as a new version.
* We align design and code versioning in major and minor.
* Version changes are part of every pull request following the SamVer rules.
* We only allow one breaking change per major release.
* Every version change must be documented clearly in the change log.
* In design, the version must be contained in the library file name.

## Versioning examples
Some examples for SemVer within the Porsche UI Kit:

### MAJOR version change when
* Change to style that triggers a layout change or different wrapping behaviour
* Markup change that must be included or is being updated
* Change to code constants
* Context-relevant changes in style basics, i.e. primary color or icon assets with same meaning
* Changes that can affect layout outside of content, i.e. display properties
* Update of dependencies
* Deletion or move of shared mixins or placeholders
* Changes to hard-coded asset paths, i.e. background-src
* Removal of an accessibility-relevant attribute or property, relevant for assistive functionality

### MINOR version change when
* Addition of something new or a new variation of existing content, i.e. new error states
* Addition of attributes to markup that don’t affect the rendering of the markup, i.e. new aria-attributes
* Updates to constants that do not result in a breaking change
* Deprecation of existing contents without deletion

### PATCH version when
* Updating package dependencies
* Structural changes that are not affecting refs
* Fixing of defects and optimisation of existing code, e.g. a markup value or modification to constant keys
* Changes to plugins or application-related improvements

### NO RELEASE when
* Updating dev dependencies
* Addition of tests or examples
* Updating examples and documentation
