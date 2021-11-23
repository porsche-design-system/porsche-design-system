# Changelog

## Porsche Design System -  Sketch Library "Web"
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [2.3.0] - 2021-11-23

#### Added

Type | Web Library |
|---|---|
Component | Popover |
Component | Toast |
Component | Inline-Notification |

#### Changed

Type | Web Library |
|---|---|
Radio Button | Adjust Wrapper |
Checkbox | Adjust Wrapper |
Pure Link | Adjust Wrapper |
Banner | Changed Naming |

### [2.2.1] - 2021-08-03

Type | Web Library |
|---|---|
Component | Accordion bug fixes |

#### Added

Type | Web Library |
|---|---|
Component | Table |
Component | Accordion |

### [2.1.0] - 2021-06-08

#### Added

Type | Web Library |
|---|---|
Component | Switch |

#### Changed

Type | Web Library |
|---|---|
Colors | Update Layer Styles with color variables |

### [2.0.3] - 2021-04-16

#### Fixed

Type | Web Library |
|---|---|
Component | Improve Modal |

### [2.0.2] - 2021-03-18

#### Fixed

Type | Web Library |
|---|---|
Component |  Various bug fixes |

### [2.0.1] - 2021-01-29

# v1 to v2

## Introduction

We recommend upgrading to v2.
This guide includes everything you need to migrate your offering.

## Why you should migrate?

**Adjustments**

- Porsche Next Font with new metrics
- Surface color for dark theme regarding accessibility criteria
- Hover/Active color for dark theme regarding accessibility criteria
- Focus state for light and dark theme
- Neutral color low for light theme
- Validation Forms

**New**

- Select Combobox
- Select for dark theme
- Banner Notification
- Modal
- Notification soft colors for dark theme
- Tabs and Tabs Bar

## Download Sketch Libraries

Head over to [Start Designing](https://designsystem.porsche.com/v2/start-designing/introduction) to set up the new Sketch libraries.

## Design migration strategy

The transition cause a major break in the UI.

Ask yourself during the entire visual review and iteration process

- Are you using the new Porsche Next?
- Are you using the color styles correctly?
- Is the spacing between components correct?
- Does the general layout still work?

### Please note

Upgrading to the v2 Library will not automatically change any component created in previous version of the Library. For some Components with Text (like Buttons) you have to “Shrink the element to fit the content” in Overrides and if you have
line-breaks you can set the “auto-size” Alignment.

We don’t recommend a piece-by-piece migration of your product in production. Teams should perform the migration first in a separate branch (or branches). This allows the creation of new design specs for any possible rough spots in alignment or sizing that may appear in the UI after upgrading.

Meet with stakeholders from design, OM, and engineering to kick off the migration process.

The font for Porsche remains Porsche Next. The font metrics was redesigned for better clarity and legibility. Work with your development team to discuss how this new metrics might affect your team’s workflow. [Download the modified Porsche Next](https://cdn.ui.porsche.com/porsche-design-system/font/v2/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip)

## Get help

If you run into trouble and need support, the Porsche Design System Team is here to help.
Simply go to our contribution board and [open an issue](https://github.com/porscheui/porsche-design-system-contribution) to get in touch with us.
We'll always do our best to answer your questions and connect you with the right people quickly.

#### Added

Type | Web Library |
|---|---|
Component | Select Combobox |
Component | Select for dark theme |
Component | Banner Notification |
Component | Modal |
Component | Tabs and Tabs Bar |

#### Fixed

Type | Web Library |
|---|---|
Component |  Validation Forms |

### [2.0.0] - 2020-08-21

#### Fixed

Type | Web Library |
|---|---|
Components |  Update all components regarding font with new metrics |
Components |  Improved Button and Link for Viewport 320+ (XS) |

### [1.5.1] - 2020-07-29

#### Fixed
Type | Web Library | 
|---|---|
Components | Button, update scalability| 

### [1.5.0] - 2020-07-17

#### Added
Type | Web Library | 
|---|---|
Components | Select Flyout | 
Components | Button and Link Pure with Subline | 

### [1.4.1] - 2020-05-27

#### Fixed

Type | Web Library |
|---|---|
Components | Extended Description text components in Text Field, Textarea and Select |
Components |  Update icon size in components |

### [1.4.0] - 2020-05-14

#### Added

Type | Web Library |
|---|---|
Components | Text List |
Components | Text Field Search |
Components | Social Link |
Components | Description text component in Text Field, Textarea and Select |

#### Fixed

Type | Web Library |
|---|---|
Components | Change icon size in Link & Button in 24 x 24 px  |
Components | Background color for Text Field, Textarea and Select  |

### [1.3.0] - 2020-04-08

### [1.2.0] - 2020-03-25

#### Added

Type | Web Library |
|---|---|
Components | Password (focus) |
Components | Divider |
Components | Hover state at form elements |
Components | Focus symbol in Textarea, Text Field, Select and Password |

#### Fixed

Type | Web Library |
|---|---|
Components | Icon pinned in password Text Field  |

### [1.1.1] - 2020-03-17

#### Changed

Type | Web Library |
|---|---|
Components | Update text style for error and success |

### [1.1.0] - 2020-03-11

#### Added

Type | Web Library |
|---|---|
Components | `Checkbox` `Radio Button` `Select` `Text Field` `Textarea` |
Layer Styles | Layer styles for form components |

### [1.0.3] - 2020-02-28

#### Fixed
- Various structural bugfixes 

### [1.0.2] - 2020-02-19

#### Fixed
- Various structural bugfixes 

### [1.0.1] - 2020-02-07

#### Fixed
- Various structural bugfixes 

### [1.0.0] - 2020-01-28

#### Added
- Text style for neutral color in Light and Dark Theme
- Line-height is calculated automatically based on Porsche type scaling formula for Text, Link Pure and Button Pure

#### Changed
- Stylistic adjustment of the Icons
- Renaming and optimization of neutral colors for Icon and Text

### [1.0.0-rc.1] - 2019-12-13

#### Added

Type | Web Library |
|---|---|
Components | `Headline`  `Icon` `Marque` `Text` |
