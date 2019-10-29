---
name: Component
about: Changes or adding of components resulting in a major, minor or patch release
title: ''
labels: component, to be refined
assignees: ''

---

**Scope**
[Describe clearly the scope of the change. If possible use the format of a user story.]

**Out of scope**  
[List related topics that are not part of this issue to be worked on.]

**Notes**  
[Share any further information that is relevant for processing.]

**Link to resources**
- Abstract: [Insert link to Abstract collection]
- Notion: [Insert link to component research in notion]
- Preview Link: [Insert link: https://ui.porsche.com/issue/123]

**Props** 
- Name: e.g. Button Square
- States: e.g. default, hover, focus, active, disabled, loading
- Variants: e.g. filled, ghost
- Themings: e.g. Light Theme / Dark Theme
- Cases/Templates: e.g. row

Subtasks
---

**SETUP**

- [ ] Create branch in GitHub according to issue number 
- [ ] Create branch in Abstract according to issue number 

**DESIGN**

**– Preparation**
- [ ] Component research and documentation in [notion](https://www.notion.so/porscheui/Component-Research-e698a613cb554a618a1b01402f45df14)(based on [template](https://www.notion.so/porscheui/Template-component-name-06f8685182c34decbc1e3c5bb4e9b64e))

**– Component setup in Sketch according to [checklist](https://www.notion.so/porscheui/Sketch-Component-setup-210aa34e558641d69d1b2976e8f6a3ec)**
- [ ] Initial definitions (component states/variants)
- [ ] Design setup (library template, namings) 
- [ ] Create first component draft incl. states/variants and provide it in Abstract collection (insert link above)
- [ ] Discuss draft with team (at least with one designer and developer), optional: iterative optimization
- [ ] _Testing (optional)_
- [ ] Design final Sketch symbols (incl. smart nesting and functionality)
- [ ] Structural clean-up 
- [ ] Sketch symbol QA (self-check of native symbols and instance functionality from a consumer’s perspective)
- [ ] _Remove components from prep library (optional)_

**– Merge & export**
- [ ] Merge Abstract branch to Master
- [ ] Export Sketch library file from Abstract to GitHub branch according to [guideline](https://www.notion.so/porscheui/Sketch-Library-release-fa76c54eda524c9db99295e1c938c2cf), incl. changelog update and adjustment of library version number.

**– Design guideline**
- [ ] Create must-have design guideline (based on [template](https://www.notion.so/porscheui/UI-UX-docu-Draft-29bd4e8ec2524b7d840ea0f87cc9a026))
- [ ] Create, upload and integrate assets (if needed)

**DEV**

- [ ] Setup of hierarchy structure and naming of all related states and variants
- [ ] Create/update related code CSS/JS
- [ ] Create samples of all possible states and variants
- [ ] Create code docs (implementation guidelines)
- [ ] Include compiled angular and react component in test page
- [ ] Create VRT tests
- [ ] _Create unit test (optional)_
- [ ] _Create E2E test (optional)_
- [ ] Test code visual and functional for optimized viewports (only one browser): 320 px, 375 px, 480 px, 768 px, 1024 px, 1366 px, 1920 px
- [ ] Test code visual and functional for all supported browsers in viewports: 320 px, 480 px, 760 px, 1000 px, 1300 px, 1760 px, 1920 px

**QA**

- [ ] _Open a pull request (optional)_
- [ ] Design: 3rd party Sketch review
- [ ] Design: 3rd party guideline review
- [ ] Design: Code review (implementation / docu)
- [ ] Dev: 3rd party code review
- [ ] Dev: 3rd party code docu review

**RELEASE**

- [ ] Merge GitHub branch to Master
- [ ] Inform community about changes
