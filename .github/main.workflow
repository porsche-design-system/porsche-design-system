workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["GitHub Action for Slack"]
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

action "Lint 'TS'" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["yarn", "lint:ts"]
}

action "Lint 'SCSS'" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["yarn", "lint:scss"]
}

action "Build" {
  needs = ["Lint 'TS'", "Lint 'SCSS'"]
  uses = "./images/node/"
  runs = ["yarn", "build"]
}

action "GitHub Action for Slack" {
  uses = "Ilshidur/action-slack@e820f544affdbb77c1dee6d3f752f7f2daf4a0b3"
  args = "test github actions: A new commit has been pushed and build was successful <3"
  secrets = ["SLACK_WEBHOOK"]
  needs = ["Build"]
}
