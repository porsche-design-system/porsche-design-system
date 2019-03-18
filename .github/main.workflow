workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Build", "GitHub Action for Slack"]
}

action "Branch 1.x" {
  uses = "actions/bin/filter@master"
  args = "branch 1.x"
}

action "Install" {
  needs = ["Branch 1.x"]
  uses = "./images/node/"
  runs = ["run-yarn-with-credentials", "install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "Lint" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["yarn", "lint"]
}

action "VRT" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-visual-regression-tests"]
}

action "Build" {
  needs = ["Lint", "VRT"]
  uses = "./images/node/"
  runs = ["yarn", "build"]
}

action "GitHub Action for Slack" {
  needs = ["Build"]
  uses = "Ilshidur/action-slack@e820f544affdbb77c1dee6d3f752f7f2daf4a0b3"
  args = "test github actions: A new commit has been pushed and build was successful <3"
  secrets = ["SLACK_WEBHOOK"]
  env = {
    SLACK_OVERRIDE_MESSAGE = "true"
  }
}
