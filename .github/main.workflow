workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Deploy", "GitHub Action for Slack"]
}

action "Branch 1.x" {
  uses = "actions/bin/filter@master"
  args = "branch 1.x"
}

action "Install" {
  needs = ["Branch 1.x"]
  uses = "./images/node/"
  runs = ["run-install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "Lint" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-lint"]
}

action "VRT" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-vrt"]
}

action "Build" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-build"]
}

action "Deploy" {
  needs = ["Build"]
  uses = "./images/node/"
  runs = ["run-deploy"]
  secrets = ["GIT_DEPLOY_KEY"]
}

action "GitHub Action for Slack" {
  needs = ["Deploy"]
  uses = "Ilshidur/action-slack@e820f544affdbb77c1dee6d3f752f7f2daf4a0b3"
  args = "test github actions: A new commit has been pushed and build was successful <3"
  secrets = ["SLACK_WEBHOOK"]
  env = {
    SLACK_OVERRIDE_MESSAGE = "true"
  }
}
