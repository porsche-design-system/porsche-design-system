# CI/CD
Porsche UI Kit is using CircleCI as CI/CD build tool for v0.x/core and v0.x/react deployments. As of version v1.x GitHub Actions is used.

## Issue Management
For every change within the Porsche UI Kit a new branch has to be created, named corresponding to the related issue as `issue/${GITHUB_ISSUE_NUMBER}/v0.x/${core | react}`, e.g. `issue/12/v0.x/core` or `issue/12/v0.x/react` depending if it’s a version **0.x** Core or React change.
_It's important that that the Git branch is created in the defined format otherwise CI/CD automatisation wont work._

As soon as changes are pushed inside the branch, the CI/CD will deploy the issue branch to https://ui.porsche.com/${GIT_BRANCH}, e.g. https://ui.porsche.com/issue/12/v0.x/core or https://ui.porsche.com/issue/15/v0.x/react  

## Release Management
Whenever a GitHub Pull Request including the corresponding Porsche UI Kit Sketch Library is merged to the `0.x` Git branch, a developer creates a release commit with a Git tag in following format `v0.${MINOR_VERSION}.${PATCH_VERSION}/core`or `v0.${MINOR_VERSION}.${PATCH_VERSION}/react`, e.g. `v0.1.5/core` or `v0.2.1/react`. 
_It's important that that the Git tag is created in the defined format otherwise CI/CD automatisation wont work._

As soon as the release commit including its Git tag is pushed, the CI/CD will deploy a new versioned release to https://ui.porsche.com/${GIT_TAG}, e.g. https://ui.porsche.com/v0.1.5/core or https://ui.porsche.com/v0.2.1/react  

It will also update the entire Porsche UI Website on https://ui.porsche.com and the Porsche UI Kit Sketch Library URL on https://ui.porsche.com/porsche-ui-kit.sketch.xml

