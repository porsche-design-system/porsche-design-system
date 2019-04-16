# Design Workflow with Abstract

## General information upfront
We foster an open and clear design workflow over all digital Porsche products with shared tools and workflows. Using the tool Abstract enables an automated file management and version control - without the risk of losing data. The general accessibility of all files also brings the different roles and teams closer and enables a fast design collaboration.

[Read more about Abstract](https://www.goabstract.com/how-it-works/) or watch some [Videos from Abstract](https://vimeo.com/goabstract).

### Project and file structure
The Porsche UI prganisation is structured by context within different sections. Product specific files are stored in different team projects. Team projects are visible for all organisation members by standard. Confidential work is stored in perivate projects, which are only accessible for members on invitation.

For a better discoverability files and libraries within a project are recommended to be split and named by their features and named hyphenated and with lower cases. All libraries created within the Porsche UI organisation should be named in the format of `porsche-ui-kit-[projectname].sketch`.

![/assets/storefront/design/abstract-filestructure.png](/assets/storefront/design/abstract-filestructure.png)

### User roles and rights
User roles define weather a user can just view or actually work with on the stored files. Contributor seats for designers have to be paid and therefore [requested here](http://eepurl.com/gnOIXD).
- **Contributors usually designers** have access to all features including creating, editing and updating files.
- **Viewers usually stakeholders and developers** are only able to view and comment on shared files.

Both roles can be granted with different rights. 
- **Members** of the organisation have access to all public projects and can be invited individually for private projects.
- **Guests** have to be invited for each project specifically to access.

### Add members to your private project or invite guests
1. Login at Abstract
2. Navigate to your Project and Click "Members" from the left-hand navigation of Abstract
3. Click on "..." on the right of a member to manage their role or remove them from the project
4. Select "Invite People" to add new team members or invite guests

## Design Workflow
Changes within files are made using the Abstract Desktop App and Sketch. Within a project the master is representing all approved work as latest version of the files. Tasks that are currently under development are nested in different branches and child branches. To release a finalised task the branch has to be merged into the master.

### 1. Start working on a change
We always open branches for every change on files to remove the dependency of frequently update the master. If you would like to pick up where someone else left off in their branch, you can open a child branch under it.

1. **Create a branch** either from the master or from an existing branch by clicking "New branch..." or by opening a file with "Edit in Sketch". Sketch files can also opened untracked to test something without saving.
2. **Name the branch** including the main topic, effort type or the issue number and your signature letters,  
e.g. `pagination accessibilty recoloring | mb | #44`. For more context you can also add a description and a status to the branch.
4. **Save changes in Sketch and sync them** regulary as commit to Abstract by clicking on "Commit changes" at the bottom. 
5. **Describe the committed changes** to make them visible for others, e.g. `Changed text color from to red`. Commit a lot and describe what you did. Adding detail of what you accomplished in each commit is useful for you and for your coworkers.

![/assets/storefront/design/abstract-branches.png](/assets/storefront/design/abstract-branches.png)

### 2. Review and Merge changes
When you think you’re done with your branch, you should always add stakeholders or coworkers as reviewers to get feedback for your work, before you merge it to master.

1. Select your branch that you would like to be reviewed
2. Click "Request Review" in the top right and type the team members you would like to review your changes

Updating from Master every few weeks is effective at keeping your branch up-to-date without having a huge workload at when you’re finally ready to merge. Once you’ve gotten approved in your review, you’re ready to merge.

1. Select the branch that you would like to merge into the master or a child branch you would like to merge into the parent branch.
2. Click "Merge branch" in the top right and document a short change log but descriptive into the notes.
3. Click the button "Merge and archive".
4. When your version of Master is out-of-date with the current version of Master (often a result of being offline) you get a diverged copy. Be sure to resolve this immediately.
5. Inform the team about the merging.

### 3. Engineering and Stakeholder "Handoff"
Collections are super useful in order to focus attention of your fellow designers and stakeholders on the screens you’re making changes to. You can order them according to the story you’re trying to tell and give additional context within them.
