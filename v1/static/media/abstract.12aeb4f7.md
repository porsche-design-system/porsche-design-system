# General
To foster an open design environment over all digital Porsche products, we use the tool Abstract. It allows to share and simultaneous editing designs in sketch including an automated version control. Both for improving the team internal and the porsche-wide design collaboration. You can find a short introduction here: https://www.goabstract.com/how-it-works/

The Sketch files can either be accessed through the Abstract [Browser App](https://app.goabstract.com/) or the [Desktop App](https://app.goabstract.com/).

### Organization structure and roles
Porsche owns and manages the organization Porsche UI and its members. The files and workflow documentation of a specific team are organized within Projects. They’re essentially an organizational layer for what you’re working on.

**Team projects** are visible for all members by standard, whereas Guest have to be invited to specific Projects. For secret work it is recommended to create **Private Projects** which are only accessible to members who have been specifically invited.

### Roles
**Who is allowed to get access?** All designers of digital Porsche products  as well as developers, business partners and other stakeholder can be invited for accessing or viewing project files using the following rules and roles.

In general the Porsche UI organization has **Contributor or Viewer seats**. 
- **Contributors** have access to all features including creating, editing and updating files, usually designers. Contributor seats are limited and priced per person.
- **Viewers** are only able to view and comment on work shared files, usually stakeholders or developers. Viewer seats are unlimited and for free. 

Three types of roles are available to assign to each Viewer or Contributor that is part of an organization.
- **Administrators** are responsible for managing the Abstract account for the organization. They manage seats, billing, integrations, organization details, etc.
- **Members** are typically company employees or people of contracted vendors who have access to all Team Projects of the organization. Like designers, developers, product owner or project manager.
- **Guests** are typically people outside the company invited for specific Team Projects. Like contracted partners for a specific project.

### Managing Seats and Contributor Roles
You have to be logged in at the Abstract [Porsche UI Organization](https://app.goabstract.com/organizations/bc37bb03-3469-4b15-99a2-60dbec187bce/) as administrator to be able to invite new members and manage contributors. 

1. Click "People" from the left-hand navigation of Abstract
2. Select "Invite People" to add new members or "Manage People" to change the role of already invited members
3. Chose the option "Contributor" and select "Invite via Mail" to send an invitation. You should only invite company contracted people as Contributors, that are permitted to see and edit public Projects within the organization.

# Design Workflow
Changes within files should be done locally using the Abstract Desktop App. After login you have to navigate to the Team Project you want to work on. The projects Master is representing all the approved work as latest release of the files. The different nested branches and child branches are issues that are currently in work. To release a new version a complete branch has to be merged into the master.

### Start working on a change
To remove the dependency on frequent updates of the Master we use branches and subsequent child branches for every change on the files. You may choose to open a child branch from a parent branch if you’d like to pick up where someone else left off in their branch.

1. Create a single branch either from the Master or from a existing Branch by clicking "New branch..." on the top right
2. Name the branch in the format of `<issue-number>/<title>` e.g. `123/pagination`.
We replace `<issue-number>` with the GitHub Project issue number and `<title>` by a one or two word descriptor of the main item being worked on for reference.
3. After creating a branch you can open existing sketch files in the Tab "Files" by selecting them and click on the "Edit in Sketch" on the top right. Or you create/import new sketch Files by clicking on "Add File" > "Create/Import Sketch File..."
4. Make changes to the sketch file(s) and sync major milestones to Abstract by clicking on "Commit changes" at the bottom of the application and add a descriptive summary of the change actions, e.g. `Added new CI colors`.

### Review and Merge changes
After committing some changes within a branch you must have at least one design review from another team member before merging the branch into the master.

1. Select your branch that you would like to be reviewed
2. Click "Request Review" in the top right and type the team members you would like to review your changes

Once you received an approval for you design review you can start the merging process.

1. Select the branch that you would like to merge into the master or a child branch you would like to merge into the parent branch.
2. Click "Merge branch" in the top right and document a short change log but descriptive into the notes.
3. Click the button "Merge and archive".
4. Inform the team about the merging.

### Publish changes as new release (UI Kit Libraries)
tbd
