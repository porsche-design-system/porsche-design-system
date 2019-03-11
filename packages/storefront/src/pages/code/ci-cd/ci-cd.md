# CI/CD Pipeline
Porsche UI Kit is using CircleCI as CI/CD build tool for v0.x/core and v0.x/react deployments. As of version v1.x GitHub Actions will be used.

## GitHub Issue
Whenever a team member of Porsche UI or a contributor wants to work on a GitHub Issue, e.g. issue: _#12_ for Porsche UI Kit in version **0.x**, a new Git branch has to be created first. The branch name must follow the format `issue/${GITHUB_ISSUE_NUMBER}/v0.x/${core | react}`, e.g. `issue/12/v0.x/core` or `issue/15/v0.x/react` depending if it’s a Porsche UI Kit Core or React change.  
_It's important that that the Git branch is created in the defined format otherwise CI/CD won't build anything._

As soon as changes are pushed inside the branch, the CI/CD will deploy that version to https://ui.porsche.com/${GIT_BRANCH}, e.g. https://ui.porsche.com/issue/12/v0.x/core or https://ui.porsche.com/issue/15/v0.x/react  


##  Release Management
As soon as a GitHub Pull Request including the corresponding Porsche UI Kit Sketch Library is merged to `0.x` Git branch, a developer creates a release commit with a Git tag in following format `v0.${MINOR_VERSION}.${PATCH_VERSION}/core`or `v0.${MINOR_VERSION}.${PATCH_VERSION}/react`, e.g. `v0.1.5/core` or `v0.2.1/react`. As soon as the release commit including its Git tag is pushed, CI/CD will detect that it should deploy a new versioned release to https://ui.porsche.com/${GIT_TAG}, e.g. https://ui.porsche.com/v0.1.5/core or https://ui.porsche.com/v0.2.1/react  
It will also update the entire Porsche UI front-page on https://ui.porsche.com as well as updating the Porsche UI Kit Sketch Library RSS feed on https://ui.porsche.com/porsche-ui-kit.sketch.xml  
_It's important that that the Git tag is created in the defined format otherwise CI/CD won't build anything._
