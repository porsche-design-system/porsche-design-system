# Culture

## Introduction
We foster an open and connected design culture for all digital Porsche products by using the right resources, standardised tools and workflows together. Abstract allows us to make the design process fully transparent and structured with an intelligent file management and automated version control. To work on your own, within the team or the whole Porsche Design Community together. Bringing the different roles and teams closer and enable a more efficient design workflow.

[Read more about Abstract](https://www.goabstract.com/how-it-works/) or watch some [Videos from Abstract](https://vimeo.com/goabstract).

## Getting Started
To use Abstract and access the Sketch files the most recent version of the Abstract [Browser App](https://app.goabstract.com/) or the [Desktop App](https://app.goabstract.com/) must be installed. Porsche owns and manages the organization Porsche UI and its members. To join the organization you have to request access by sending an email to [porsche-ui-kit@porsche.de](mailto:porsche-ui-kit@porsche.de) including your firstname, lastname, corporate email address and the project you are working for, i.e. Porsche Finder

### Project and File Structure
The Porsche UI Organization is structured by context within the sections General, Apps, Web and Vehicle.
All files and the workflow documentation lives in team specific Projects. **Team projects** are visible for all members by standard, whereas Guest have to be invited. Confidential work is currently placed in **Private Projects** which are only accessible to members who have been specifically invited.

The files within a Project are recommended to be split and named by features, starting with a number ordered according to an ideal flow. Library files are named after their topic, e.g. Activity Stream, Thumbnails, Icons, etc.

![/assets/storefront/design/abstract-filestructure.png](/assets/storefront/design/abstract-filestructure.png)

### Roles
**Who is allowed to get access?** All designers of digital Porsche products  as well as developers, business partners and other stakeholder can be invited for accessing or viewing project files using the following rules and roles.

In general the Porsche UI organization has Contributor or Viewer seats. 
- **Contributors** have access to all features including creating, editing and updating files, usually designers. Contributor seats are limited and priced per person.
- **Viewers** are only able to view and comment on work shared files, usually stakeholders or developers. Viewer seats are unlimited and for free. 

Three types of roles are available to assign to each Viewer or Contributor that is part of an organization.
- **Administrators** are responsible for managing the Abstract account for the organization. They manage seats, billing, integrations, organization details, etc.
- **Members** are typically company employees or people of contracted vendors who have access to all Team Projects of the organization. Like designers, developers, product owner or project manager.
- **Guests** are typically people outside the company invited for specific Team Projects. Like contracted partners for a specific project.

### Managing Seats and Contributor Roles
You have to be logged in at the Abstract [Porsche UI Organization](https://app.goabstract.com/organizations/bc37bb03-3469-4b15-99a2-60dbec187bce/) to be able to invite members and manage contributors within your project. 

1. Navigate to your Project and Click "Members" from the left-hand navigation of Abstract
2. Click on "..." on the right of a member to manage their role or remove them from the project
3. Select "Invite People" to add new team members

## Design Workflow
Changes within files should be done locally using the Abstract Desktop App. After login you have to navigate to the Team Project you want to work on. The projects Master is representing all the approved work as latest release of the files. The different nested branches and child branches are issues that are currently in work. To release a new version a complete branch has to be merged into the master.

### Start working on a change
To remove the dependency on frequent updates of the Master we use branches and subsequent child branches for every change on the files. You may choose to open a child branch from a parent branch if you’d like to pick up where someone else left off in their branch.

1. Create a branch either from the Master or from a existing Branch by clicking "New branch..." on the top right or by opening a sketch file.
2. Name the branch descriptive including the main item being worked on and use the effort type or the issue number if possible, i.e. `exploration / pagination accessibilty recoloring` or `142 / pagination restructuring`.
3. Give the branch a description that explains your intent with your branch. Onlookers will thank you.
3. After creating a branch you can open existing sketch files in the Tab "Files" by selecting them and click on the "Edit in Sketch" on the top right. Or you create/import new sketch Files by clicking on "Add File" → "Create/Import Sketch File..."
4. Make changes to the sketch file(s) and sync major milestones to Abstract by clicking on "Commit changes" at the bottom of the application and add a descriptive summary of the change actions, e.g. `Added new CI colors`.  

**How and when do I commit?** Commit a lot and describe what you did. To the best of your ability, adding detail of what you accomplished in each commit is useful for you and for your coworkers.
- Every time you get to a good stopping place and might go down a new path.
- Every time you update a bunch of symbols.
- Before you do something controversial or experimental that you may need to roll back.
- To stash changes so you can move to another branch.


### Review and Merge changes
When you think you’re done with your branch, you should always add stakeholders or coworkers as reviewers to get feedback for your work, before you merge it to master.

1. Select your branch that you would like to be reviewed
2. Click "Request Review" in the top right and type the team members you would like to review your changes

Updating from Master every few weeks is effective at keeping your branch up-to-date without having a huge workload at when you’re finally ready to merge. Once you’ve gotten approved in your review, you’re ready to merge.

1. Select the branch that you would like to merge into the master or a child branch you would like to merge into the parent branch.
2. Click "Merge branch" in the top right and document a short change log but descriptive into the notes.
3. Click the button "Merge and archive".
4. When your version of Master is out-of-date with the current version of Master (often a result of being offline) you get a diverged copy. Be sure to resolve this immediately.
5. Inform the team about the merging.

### Engineering and Stakeholder "Handoff"
Collections are super useful in order to focus attention of your fellow designers and stakeholders on the screens you’re making changes to. You can order them according to the story you’re trying to tell and give additional context within them.
