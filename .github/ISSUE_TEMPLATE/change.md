---
name: Component
about: Changes or adding of components resulting in a major, minor or patch release
title: ''
labels: 'component'
assignees: ''

---

**Scope**  
Describe clearly the scope of the change. If possible use the format of a user story.

**Out of Scope**  
- List topics that are not part of this issue to be worked on.

**Notes**  
- Abstract Link LIGHT:
- Abstract Link DARK:
- Design Docu Ticket: #
- Share any further information that is relevant for processing

**Props** (if relevant)  
- Name: e.g. Button Square
- States: e.g. default, hover, focus, active, disabled, loading
- Variants: e.g. filled, ghost
- Themes: e.g. light + dark
- Cases/Templates: e.g. row

**Subtasks**  
// DESIGN
- [ ] Create UI decision proposal based on research and testing
- [ ] Define naming and hierarchy structure and naming of all related states and variants
- [ ] Approve UI definition
- [ ] Create branch in Abstract according to issue number, update sketch library and add collection link issue
- [ ] Remove elements from prep library (optional)

// DEV
- [ ] Setup of hierarchy structure and naming of all related states and variants
- [ ] Create/update related code CSS / JS
- [ ] Create samples of all possible states and variants
- [ ] Create code docs (implementation guidelines)
- [ ] Create VRT
- [ ] Create unit test (optional)
- [ ] Test code visual and functional for optimized viewports (only one browser): 320px, 375px, 480px, 768px, 1024px, 1366px, 1920px
- [ ] Test code visual and functional for all supported browsers in viewports: 320px, 480px, 760px, 1000px, 1300px, 1760px, 1920px

// QA
- [ ] 3rd party design sketch review
- [ ] 3rd party code review
- [ ] 3rd party code docu review
- [ ] Code docu review by design 
- [ ] Merge corresponding Abstract branch to master and export sketch lib file for deployment
