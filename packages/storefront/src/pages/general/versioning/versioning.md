# General information
For updating and releasing new versions of code or design changes the [SemanticVersioning](http://semver.org/)  format is used:  

MAJOR.MINOR.PATCH e.g. 1.0.1
* **Major** (X.y.z) contain breaking changes (defined below).
* **Minor** (x.Y.z) add new features or deprecate existing features without breaking changes.
* **Patch** (x.y.Z) fix defects or optimize existing features and file structure without breaking changes.

Teams should avoid mixing different versions of code and design library. Both parties should drive updating in collaboration with the related counterpart.

## Release rules
* **Once a versioned package has been released, the contents of that version must not be modified. Any modifications must be released as a new version.** 
* **We align design and code versioning in major and minor**
* **Version changes are part of every pull request following the SamVer rules**
* **We only allow one breaking change per major release.**
* **Every version change must be documented ins an understandable way in the changelog.** 
* **In design the version must be contained in the library file name.**

## Versioning examples
Some examples for SemVer within the Porsche UI Kit:

### MAJOR version when
* Change to style that triggers a layout change or different wrapping behaviour
* Markup change that are required to include or being updated
* Changing code constants
* Context relevant changes in style basics, i.e. primary color or icon assets with same meaning
* Changes that can affect layout outside of contents, i.e. display properties
* Upgrade dependencies
* Deleting or moving shared mixins or placeholders
* Changing hard-coded asset paths, i.e. background src
* Removing an accessibility relevant attribute or property, relevant for assistive functionality.

### MINOR version when
* Adding something new or a new variation of an existing content, i.e. new error states
* Adding attributes to markup that don’t affect the rendering of the markup, i.e. new aria attributes
* Updating values of constants that do not bring a breaking change
* Deprecating existing contents without deleting

### PATCH version when
* Update package dependencies
* Structural changes not affecting refs
* Fix defects and optimize existing code, like value of a markup or altering constant keys
* Changes to plugins or application releated improvements

### NO RELEASE when
* Update dev dependencies
* Add tests or examples
* Update examples and documentation
